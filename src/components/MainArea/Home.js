import React, { useState, useEffect } from 'react';
import TodoCard from '../TodoCard/TodoCard';
import Stone from '../Stone/Stone';
import './Home.css';
import { Gamepad2, ClipboardList } from 'lucide-react';
import { default as fetchUpdateBoards } from '../controlAPI/updateBoards'; 
import { default as fetchChangeBoard } from '../controlAPI/changeBoard';

const Home = ({ xp, level, onTaskComplete, userState }) => {
    const todayString = new Date().toISOString().split('T')[0];

    const [tasks, setTasks] = useState([]); 
    const [boards, setBoards] = useState([]); 
    const [currentBoard, setCurrentBoard] = useState({ id: '', name: '載入中...' });
    const [showInitSelect, setShowInitSelect] = useState(false);

    const [inputValue, setInputValue] = useState(''); 
    const [inputTag, setInputTag] = useState('');
    const [inputDate, setInputDate] = useState('');
    const [inputXP, setInputXP] = useState(20);
    const [inputPriority, setInputPriority] = useState('medium'); 

    // --- 核心轉化函式：將 Trello 資料轉為本地格式 ---
    const transformTrelloTasks = (trelloCards) => {
        if (!Array.isArray(trelloCards)) return [];
        return trelloCards.map(card => ({
            id: card.id,                       // Trello ID
            title: card.name || "未命名任務",    // 解決空白問題：Trello 標題叫 name
            tag: card.tag || "Trello",
            dueDate: card.due ? card.due.split('T')[0] : "", // 處理 Trello 時間格式
            xpValue: parseInt(card.xpValue, 10) || 20,
            isCompleted: card.state === 'complete' || false,
            priority: card.priority || 'medium'
        }));
    };

    // 1. 初始獲取資料
    useEffect(() => {
        const fetchInitialData = async () => {
            if (!userState) return;
            try {
                const data = await fetchUpdateBoards(userState);
                setBoards(data.boardList || []); 

                if (data.mainBoard && data.mainBoard.id) {
                    setCurrentBoard(data.mainBoard);
                    // 這裡進行轉化
                    const formattedTasks = transformTrelloTasks(data.allCards);
                    setTasks(formattedTasks); 
                    setShowInitSelect(false);
                } else {
                    setCurrentBoard({ id: '', name: '尚未選擇看板' });
                    setShowInitSelect(true);
                }
            } catch (err) {
                console.error("API 連線失敗:", err);
            }
        };
        fetchInitialData();
    }, [userState]);

    // 2. 處理看板切換
    const handleBoardChange = async (e) => {
        const newBoardID = e.target.value;
        if (!newBoardID) return;

        const selected = boards.find(b => b.id === newBoardID);
        if (selected) {
            setCurrentBoard(selected);
            setShowInitSelect(false); 
            // 切換時先清空舊任務，避免出現「一長串空白」的視覺殘留
            setTasks([]); 
            
            try {
                const newCardsList = await fetchChangeBoard(userState, newBoardID);
                // 這裡進行轉化
                const formattedTasks = transformTrelloTasks(newCardsList);
                setTasks(formattedTasks); 
            } catch (err) {
                console.error("切換看板失敗:", err);
            }
        }
    };

    const taskComplete = (taskId) => {
        const targetTask = tasks.find(t => t.id === taskId);
        if (!targetTask) return;
        const updatedTasks = tasks.map(task =>
            task.id === taskId ? { ...task, isCompleted: true, completedDate: todayString } : task
        );
        setTasks(updatedTasks);
        localStorage.setItem('local_tasks', JSON.stringify(updatedTasks));
        if (onTaskComplete) {
            onTaskComplete(targetTask.xpValue, targetTask.title);
        }
    };

    const deleteTask = (taskId) => {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    };

    const addTask = (e) => {
        e.preventDefault();
        const newTask = {
            id: Date.now().toString(), // 統一轉為字串
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
            {showInitSelect && (
                <div className="init-overlay">
                    <div className="init-modal">
                        <h2>選擇一個主要看板來同步你的任務</h2>
                        <select 
                            value={currentBoard.id} 
                            onChange={handleBoardChange}
                            className="pixel-select-large"
                        >
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
                        <select value={currentBoard.id} onChange={handleBoardChange} className="pixel-select">
                            <option value="" disabled>更換主要看板</option>
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
                    {/* 這裡加入判斷，若沒有任務則顯示提示，不渲染空白卡片 */}
                    {tasks.length > 0 ? (
                        tasks.filter(t => !t.isCompleted).map(task => (
                            <TodoCard 
                                key={task.id} 
                                task={task} 
                                onComplete={taskComplete} 
                                onDelete={deleteTask} 
                            />
                        ))
                    ) : (
                        <div className="empty-state">目前看板沒有任何待辦任務</div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Home;