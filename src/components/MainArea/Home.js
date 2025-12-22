import React, { useState } from 'react';
import TodoCard from '../TodoCard/TodoCard';
import mockTrelloTasks from '../TodoCard/MockData';
import Stone from '../Stone/Stone';
import './Home.css';
import { Gamepad2, ClipboardList } from 'lucide-react';

const HomeContent = ({ name, xp, level, onTaskComplete }) => {
    const [tasks, setTasks] = useState(mockTrelloTasks);
    const [inputValue, setInputValue] = useState(''); 
    const [inputTag, setInputTag] = useState('');
    const [inputDate, setInputDate] = useState('');
    const [inputXP, setInputXP] = useState(20);

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

        let xpVal = parseInt(inputXP, 10);
        if (isNaN(xpVal)) xpVal = 20;
        if (xpVal > 150) xpVal = 150;
        if (xpVal < 0) xpVal = 0;

        const newTask = {
            id: Date.now(),
            title: inputValue,
            tag: inputTag || "一般",
            dueDate: inputDate || "未定",
            xpValue: xpVal,
            isCompleted: false
        };

        setTasks([...tasks, newTask]);
        
        // 重設所有輸入框
        setInputValue('');
        setInputTag('');
        setInputDate('');
        setInputXP(20);
    };

    return (
        <div className="main-content">
            
            <section className="game-area">
                <h2><Gamepad2 className = 'game-header-icon'/> 遊戲進度</h2>
                
                <div className="stat-panel">
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                        <span>Lv. {level}</span>
                        <span>{xp} / 100 XP</span>
                    </div>
                    <div style={{ width: '100%', height: '10px', background: '#7a797986', borderRadius: '5px', marginTop: '8px', overflow: 'hidden' }}>
                        <div style={{ width: `${xp}%`, height: '100%', background: '#50728fff', transition: 'width 0.3s' }}></div>
                    </div>
                </div>

                {/* 確保容器是 relative，石頭的 absolute 才會生效 */}
                <div style={{ position: 'relative', height: '100%', width: '100%', overflow: 'hidden' }}>
                    <Stone />
                </div>
            </section>

            <section className="todo-list-area">
                <h2><ClipboardList className = 'list-header-icon'/> 待辦清單</h2>
    
                <div className="add-task-section" style={{ marginBottom: '20px', padding: '15px', background: '#f9f9f9', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    
                    <input 
                        value={inputValue} 
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="新增任務名稱..."
                        style={{ flex: 1, padding: '8px' }}
                    />

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