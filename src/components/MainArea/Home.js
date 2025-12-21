import React, { useState } from 'react';
import TodoCard from '../TodoCard/TodoCard';
import mockTrelloTasks from '../TodoCard/MockData';
import './Home.css'; // 確保這就是你上面那份 CSS 的檔名

const HomeContent = ({ name, xp, level, onTaskComplete }) => {
    const [tasks, setTasks] = useState(mockTrelloTasks);
    // 在 HomeContent 內部新增：
    const [inputValue, setInputValue] = useState('');     // 任務名稱
    const [inputTag, setInputTag] = useState('');         // 標籤
    const [inputDate, setInputDate] = useState('');       // 截止日期
    const [inputXP, setInputXP] = useState(20);           // 自訂 XP，預設 20

    const taskComplete = (taskId) => {
        const targetTask = tasks.find(t => t.id === taskId);
        if (!targetTask) return;

        if (onTaskComplete) {
            const xpToSubmit = parseInt(targetTask.xpValue, 10) || 20;
            const titleToSubmit = targetTask.title || "未命名任務";

            onTaskComplete(xpToSubmit, titleToSubmit);
        }

        setTasks(prevTasks => 
            prevTasks.map(task =>
                task.id === taskId ? { ...task, isCompleted: true } : task
            )
        );
        
    };

    const addTask = () => {
        if (!inputValue.trim()) return;

        // ✨ 處理 XP 上限邏輯
        let xpVal = parseInt(inputXP, 10);
        if (isNaN(xpVal)) xpVal = 20; // 如果沒填或填錯，預設 20
        if (xpVal > 150) xpVal = 150; // 強制上限 150
        if (xpVal < 0) xpVal = 0;

        const newTask = {
            id: Date.now(),
            title: inputValue,
            tag: inputTag || "一般",        // 沒填標籤就給預設值
            dueDate: inputDate || "未定",   // 沒填日期就給預設值
            xpValue: xpVal,
            isCompleted: false
        };

        setTasks([...tasks, newTask]);
        
        // ✨ 重設所有輸入框
        setInputValue('');
        setInputTag('');
        setInputDate('');
        setInputXP(20);
    };

    return (
        /* 外層對應 .main-content，實現左右分割 */
        <div className="main-content">
            
            {/* 左側：遊戲養成區域 */}
            <section className="game-area">
                <h2>🎮 遊戲進度</h2>
                
                {/* 經驗值條面板 (我們沿用之前的結構，但放在 game-area 內) */}
                <div className="stat-panel" style={{ background: '#ced5deff', color: 'white', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                        <span>Lv. {level}</span>
                        <span>{xp} / 100 XP</span>
                    </div>
                    <div style={{ width: '100%', height: '10px', background: '#7a797986', borderRadius: '5px', marginTop: '8px', overflow: 'hidden' }}>
                        <div style={{ width: `${xp}%`, height: '100%', background: '#50728fff', transition: 'width 0.3s' }}></div>
                    </div>
                </div>

                <div className="placeholder" style={{ border: '2px dashed #ccc', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999' }}>
                    角色/進度條佔位圖
                </div>
            </section>

            {/* 右側：代辦清單區域 */}
            <section className="todo-list-area">
                <h2>📋 待辦清單</h2>
    
                <div className="add-task-section" style={{ marginBottom: '20px', padding: '15px', background: '#f9f9f9', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    
                    {/* 第一行：任務名稱 */}
                    <input 
                        value={inputValue} 
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="新增任務名稱..."
                        style={{ flex: 1, padding: '8px' }}
                    />

                    {/* 第二行：標籤、日期、XP、發佈按鈕 */}
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                        <input 
                            value={inputTag} 
                            onChange={(e) => setInputTag(e.target.value)}
                            placeholder="標籤 (如：運動)"
                            style={{ flex: 1, padding: '5px' }}
                        />
                        <input 
                            type="date"
                            value={inputDate} 
                            onChange={(e) => setInputDate(e.target.value)}
                            style={{ flex: 1, padding: '5px' }}
                        />
                        <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                            <span style={{ fontSize: '12px', color: '#666' }}>XP:</span>
                            <input 
                                type="number"
                                value={inputXP} 
                                onChange={(e) => setInputXP(e.target.value)}
                                max="150"
                                placeholder="20"
                                style={{ width: '60px', padding: '5px' }}
                            />
                        </div>
                        <button onClick={addTask} className="pixel-btn">發佈</button>
                    </div>
                </div>

                <div className="card-list">
                    {/* 只顯示未完成任務 */}
                    {tasks.filter(t => !t.isCompleted).map(task => (
                        <TodoCard 
                            key={task.id} 
                            task={task} 
                            onComplete={taskComplete} 
                        />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default HomeContent;