import React, { useState, useEffect } from 'react';
import TodoCard from '../TodoCard/TodoCard';
import Stone from '../Stone/Stone';
import './Home.css';
import { Gamepad2, ClipboardList } from 'lucide-react';

// 引用 API 服務
import { default as fetchUpdateBoards } from '../controlAPI/updateBoards'; 
import { default as fetchChangeBoard } from '../controlAPI/changeBoard';

// 確保組件名稱為 Home，並接收傳入的 props
const Home = ({ xp, level, onTaskComplete, userState }) => {

    const todayString = new Date().toISOString().split('T')[0];

    // --- 任務與看板狀態 ---
    const [tasks, setTasks] = useState([]); 
    const [boards, setBoards] = useState([]); // 儲存 Trello 看板清單
    const [currentBoard, setCurrentBoard] = useState({ id: '', name: '載入中...' });

    // 表單狀態
    const [inputValue, setInputValue] = useState(''); 
    const [inputTag, setInputTag] = useState('');
    const [inputDate, setInputDate] = useState('');
    const [inputXP, setInputXP] = useState(20);
    const [inputPriority, setInputPriority] = useState('medium'); 

    // 1. 初始化載入：對齊組員的大物件結構
    useEffect(() => {
        const fetchInitialData = async () => {
            // 如果此處跳出警示，代表 App.js 傳過來的 userState 是空字串
            if (!userState) {
                console.warn("尚未取得 userState，無法抓取看板資料");
                return;
            }

            try {
                // 使用 GET 請求 (req.query)
                const data = await fetchUpdateBoards(userState);
                
                // 設定看板清單陣列
                setBoards(data.boardList || []); 

                // 設定目前看板物件
                if (data.mainBoard && data.mainBoard.id) {
                    setCurrentBoard(data.mainBoard);
                    setTasks(data.allCards || []); 
                } else {
                    // 若尚未選擇則提示引導
                    setCurrentBoard({ id: '', name: '請選擇看板' });
                }
            } catch (err) {
                console.error("API 連線失敗:", err);
            }
        };
        fetchInitialData();
    }, [userState]); // 監聽通行證變化

    // 2. 處理看板切換
    const handleBoardChange = async (e) => {
        const newBoardID = e.target.value;
        const selected = boards.find(b => b.id === newBoardID);
        
        if (selected) {
            setCurrentBoard(selected);
            try {
                // 使用 PUT 請求 (req.body)
                const newCardsList = await fetchChangeBoard(userState, newBoardID);
                setTasks(newCardsList || []); 
            } catch (err) {
                console.error("切換看板失敗:", err);
            }
        }
    };

    // --- 任務操作邏輯 ---
    const taskComplete = (taskId) => {
        const targetTask = tasks.find(t => t.id === taskId);
        if (!targetTask) return;
        const updatedTasks = tasks.map(task =>
            task.id === taskId ? { ...task, isCompleted: true, completedDate: todayString } : task
        );
        setTasks(updatedTasks);
        localStorage.setItem('local_tasks', JSON.stringify(updatedTasks));
        if (onTaskComplete) {
            onTaskComplete(parseInt(targetTask.xpValue, 10) || 20, targetTask.title || "未命名任務");
        }
    };

    const deleteTask = (taskId) => {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    };

    const addTask = (e) => {
        e.preventDefault();
        const newTask = {
            id: Date.now(),
            title: inputValue,
            tag: inputTag || "一般",
            dueDate: inputDate,
            xpValue: parseInt(inputXP, 10) || 20,
            isCompleted: false,
            priority: inputPriority 
        };
        setTasks([...tasks, newTask]);
        setInputValue(''); setInputTag(''); setInputDate(''); setInputXP(20); setInputPriority('medium');
    };

    return (
        <div className="main-content">
            <section className="game-area">
                <h2><Gamepad2 className='game-header-icon'/> 遊戲進度</h2>
                <div className="stat-panel">
                    <div className="stat-info">
                        <span>Lv. {level}</span>
                        <span>{xp} / 100 XP</span>
                    </div>
                    <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${xp}%` }}></div>
                    </div>
                </div>
                <div className="stone-container"><Stone /></div>
            </section>

            <section className="todo-list-area">
                <div className="todo-header-group">
                    <h2><ClipboardList className='list-header-icon'/> 待辦清單</h2>
                    <div className="board-selector">
                        <select 
                            value={currentBoard.id} 
                            onChange={handleBoardChange}
                            className="pixel-select"
                        >
                            <option value="" disabled>請選擇看板</option>
                            {boards.map(board => (
                                <option key={board.id} value={board.id}>{board.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
    
                <form className="add-task-form" onSubmit={addTask}>
                    <div className="form-row">
                        <input className="input-name" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="新增任務名稱..." required />
                        <input className="input-tag" value={inputTag} onChange={(e) => setInputTag(e.target.value)} placeholder="標籤 (如：運動)" />
                    </div>
                    <div className="form-row">
                        <input type="date" required min={todayString} className="input-date" value={inputDate} onChange={(e) => setInputDate(e.target.value)} />
                        <select className={`input-priority ${inputPriority}`} value={inputPriority} onChange={(e) => setInputPriority(e.target.value)}>
                            <option value="low">優先度低</option>
                            <option value="medium">優先度中</option>
                            <option value="high">優先度高</option>
                        </select>
                        <div className="xp-input-group">
                            <span>XP:</span>
                            <input type="number" value={inputXP} onChange={(e) => setInputXP(e.target.value)} max="150" />
                        </div>
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