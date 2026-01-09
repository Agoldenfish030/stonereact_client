import React, { useState, useEffect } from 'react';
import TodoCard from '../TodoCard/TodoCard';
import Stone from '../Stone/Stone';
import './Home.css';
import { Gamepad2, ClipboardList } from 'lucide-react';

import fetchUpdateBoards from '../controlAPI/updateBoards'; 
import fetchChangeBoard from '../controlAPI/changeBoard';
import useRequestTrello from '../controlAPI/requestTrello'; // 新增到 Trello 的工具
import useGetSocketCall from '../controlAPI/getSocketCall'; // 即時監聽工具

const Home = ({ xp, level, onTaskComplete, userState }) => {
    const todayString = new Date().toISOString().split('T')[0];

    const [tasks, setTasks] = useState([]); 
    const [boards, setBoards] = useState([]); 
    const [currentBoard, setCurrentBoard] = useState({ id: '', name: '載入中...' });
    const [showInitSelect, setShowInitSelect] = useState(false);

    // 表單輸入狀態
    const [inputValue, setInputValue] = useState(''); 
    const [inputTag, setInputTag] = useState('');
    const [inputDate, setInputDate] = useState('');
    const [inputXP, setInputXP] = useState(20);
    const [inputPriority, setInputPriority] = useState('medium'); 

    // 啟動 Socket 監聽
    const socketData = useGetSocketCall();

    // --- 統一格式轉化函式 (對齊你的 cardData 格式) ---
    const formatTask = (data) => ({
        id: data.cardID || data.id,
        title: data.cardName || data.name || "未命名任務",
        dueDate: (data.cardDue || data.due) ? (data.cardDue || data.due).split('T')[0] : "",
        isCompleted: data.cardComplete || data.dueComplete || false,
        tag: data.tag || "Trello",
        xpValue: parseInt(data.xpValue, 10) || 20,
        priority: data.priority || 'medium'
    });

    // --- 監聽 Trello 的即時更新 (ADD, DELETE, UPDATE) ---
    useEffect(() => {
        if (!socketData) return;

        console.log("收到 Socket 更新:", socketData);
        const { type, cardID } = socketData;
        const formatted = formatTask(socketData);

        setTasks(prevTasks => {
            switch (type) {
                case 'ADD':
                    // 防止重複：若已存在則不動作
                    if (prevTasks.find(t => t.id === cardID)) return prevTasks;
                    return [...prevTasks, formatted];

                case 'UPDATE':
                    return prevTasks.map(t => t.id === cardID ? { ...t, ...formatted } : t);

                case 'DELETE':
                    return prevTasks.filter(t => t.id !== cardID);

                default:
                    return prevTasks;
            }
        });
    }, [socketData]);

    // 初始獲取資料 (GET)
    useEffect(() => {
        const fetchInitialData = async () => {
            if (!userState) return;
            try {
                const data = await fetchUpdateBoards(userState);
                setBoards(data.boardList || []); 
                if (data.mainBoard?.id) {
                    setCurrentBoard(data.mainBoard);
                    setTasks((data.allCards || []).map(formatTask));
                    setShowInitSelect(false);
                } else {
                    setShowInitSelect(true);
                }
            } catch (err) {
                console.error("初始載入失敗:", err);
            }
        };
        fetchInitialData();
    }, [userState]);

    // 切換看板 (PUT)
    const handleBoardChange = async (e) => {
        const newBoardID = e.target.value;
        if (!newBoardID) return;
        const selected = boards.find(b => b.id === newBoardID);
        if (selected) {
            setCurrentBoard(selected);
            setShowInitSelect(false);
            setTasks([]); 
            try {
                const response = await fetchChangeBoard(userState, newBoardID);
                setTasks((Array.isArray(response) ? response : (response.allCards || [])).map(formatTask));
            } catch (err) {
                console.error("切換看板失敗:", err);
            }
        }
    };

    // 新增任務 (同步至 Trello)
    const addTask = async (e) => {
        e.preventDefault();
        
        // 依照你要求的格式發送：state, type, id, name, due, dueComplete
        // 新增時 ID 通常由 Trello 生成，這裡先傳空或當前看板 ID（視後端邏輯而定）
        const type = "ADD";
        const id = currentBoard.id; // 或是讓後端決定
        const name = inputValue;
        const due = inputDate;
        const dueComplete = false;

        try {
            // 呼叫 requestTrello.js
            await useRequestTrello(userState, type, id, name, due, dueComplete);
            
            // 提醒：不需要在這裡手動 setTasks，因為 Socket 會傳回 ADD 事件自動更新畫面
            setInputValue(''); setInputTag(''); setInputDate('');
            alert('請求已發送至 Trello');
        } catch (err) {
            console.error("新增失敗:", err);
            alert("同步失敗");
        }
    };

    // 完成任務 (也會發送 UPDATE 到 Trello)
    const taskComplete = async (taskId) => {
        const targetTask = tasks.find(t => t.id === taskId);
        if (!targetTask) return;

        try {
            // 同步狀態到 Trello
            await useRequestTrello(userState, "UPDATE", taskId, targetTask.title, targetTask.dueDate, true);
            
            // 經驗值處理
            if (onTaskComplete) {
                onTaskComplete(targetTask.xpValue, targetTask.title);
            }
        } catch (err) {
            console.error("更新失敗:", err);
        }
    };

    const deleteTask = async (taskId) => {
        try {
            await useRequestTrello(userState, "DELETE", taskId, "", "", false);
        } catch (err) {
            console.error("刪除失敗:", err);
        }
    };

    return (
        <div className="main-content">
            {showInitSelect && (
                <div className="init-overlay">
                    <div className="init-modal">
                        <h2>選擇一個主要看板來同步你的任務</h2>
                        <select value={currentBoard.id} onChange={handleBoardChange} className="pixel-select-large">
                            <option value="" disabled>--- 點擊選擇看板 ---</option>
                            {boards.map(board => (
                                <option key={board.id} value={board.id}>{board.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
            )}

            <section className="game-area">
                <h2><Gamepad2 className='game-header-icon'/> 遊戲進度</h2>
                <div className="stat-panel">
                    <div className="stat-info"><span>Lv. {level}</span><span>{xp} / 100 XP</span></div>
                    <div className="progress-bar"><div className="progress-fill" style={{ width: `${xp}%` }}></div></div>
                </div>
                <div className="stone-container"><Stone /></div>
            </section>

            <section className="todo-list-area">
                <div className="todo-header-group">
                    <h2><ClipboardList className='list-header-icon'/> 待辦清單</h2>
                    <div className="board-selector">
                        <select value={currentBoard.id} onChange={handleBoardChange} className="pixel-select">
                            <option value="" disabled>更換主要看板</option>
                            {boards.map(board => (<option key={board.id} value={board.id}>{board.name}</option>))}
                        </select>
                    </div>
                </div>
    
                <form className="add-task-form" onSubmit={addTask}>
                    <div className="form-row">
                        <input className="input-name" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="新增任務名稱..." required />
                        <input className="input-tag" value={inputTag} onChange={(e) => setInputTag(e.target.value)} placeholder="標籤" />
                    </div>
                    <div className="form-row">
                        <input type="date" required min={todayString} className="input-date" value={inputDate} onChange={(e) => setInputDate(e.target.value)} />
                        <select className={`input-priority ${inputPriority}`} value={inputPriority} onChange={(e) => setInputPriority(e.target.value)}>
                            <option value="low">優先度低</option><option value="medium">優先度中</option><option value="high">優先度高</option>
                        </select>
                        <div className="xp-input-group"><span>XP:</span><input type="number" value={inputXP} onChange={(e) => setInputXP(e.target.value)} /></div>
                        <button type="submit" className="pixel-btn">發佈</button>
                    </div>
                </form>

                <div className="card-list">
                    {tasks.filter(t => !t.isCompleted).map(task => (
                        <TodoCard key={task.id} task={task} onComplete={taskComplete} onDelete={deleteTask} />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Home;