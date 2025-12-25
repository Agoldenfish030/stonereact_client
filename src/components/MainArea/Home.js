import React, { useState, useEffect } from 'react';
import TodoCard from '../TodoCard/TodoCard';
import Stone from '../Stone/Stone';
import './Home.css';
import { Gamepad2, ClipboardList } from 'lucide-react';

const HomeContent = ({ xp, level, onTaskComplete }) => {

    const todayString = new Date().toISOString().split('T')[0];

    // 載入任務
    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem('local_tasks');
        if (savedTasks) {
            return JSON.parse(savedTasks);
        } else {
            return [{
                id: 'example-1',
                title: '範例卡片',
                tag: '指南',
                dueDate: todayString,
                xpValue: 10,
                isCompleted: false,
                priority: 'medium'
            }];
        }
    });

    const [inputValue, setInputValue] = useState(''); 
    const [inputTag, setInputTag] = useState('');
    const [inputDate, setInputDate] = useState('');
    const [inputXP, setInputXP] = useState(20);
    const [inputPriority, setInputPriority] = useState('medium'); 

    useEffect(() => {
        localStorage.setItem('local_tasks', JSON.stringify(tasks));
    }, [tasks]);

    const taskComplete = (taskId) => {
        const targetTask = tasks.find(t => t.id === taskId);
        if (!targetTask) return;

        const todayString = new Date().toISOString().split('T')[0];
        const updatedTasks = tasks.map(task =>
            task.id === taskId 
                ? { ...task, isCompleted: true, completedDate: todayString } 
                : task
        );

        setTasks(updatedTasks);
        localStorage.setItem('local_tasks', JSON.stringify(updatedTasks));

        if (onTaskComplete) {
            const xpToSubmit = parseInt(targetTask.xpValue, 10) || 20;
            const titleToSubmit = targetTask.title || "未命名任務";
            onTaskComplete(xpToSubmit, titleToSubmit);
        }

    };

    const deleteTask = (taskId) => {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    };

    const addTask = (e) => {
        e.preventDefault(); // 阻止頁面刷新保持 React 狀態

        let xpVal = parseInt(inputXP, 10);
        if (isNaN(xpVal)) xpVal = 20;

        const newTask = {
            id: Date.now(),
            title: inputValue,
            tag: inputTag || "一般",
            dueDate: inputDate,
            xpValue: xpVal,
            isCompleted: false,
            priority: inputPriority 
        };

        setTasks([...tasks, newTask]);
        
        // 清空輸入欄位
        setInputValue('');
        setInputTag('');
        setInputDate('');
        setInputXP(20);
        setInputPriority('medium');
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
                <div className="stone-container">
                    <Stone />
                </div>
            </section>

            {/* 待辦清單區塊 */}
            <section className="todo-list-area">
                <h2><ClipboardList className='list-header-icon'/> 待辦清單</h2>
    
                <form className="add-task-form" onSubmit={addTask}>
                    <div className="form-row">
                        <input 
                            className="input-name"
                            value={inputValue} 
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="新增任務名稱..."
                            required 
                        />
                        <input 
                            className="input-tag"
                            value={inputTag} 
                            onChange={(e) => setInputTag(e.target.value)}
                            placeholder="標籤 (如：運動)"
                        />
                    </div>

                    <div className="form-row">
                        <input 
                            type="date" 
                            required 
                            min={todayString} // 限制日期不可選今天之前
                            className="input-date"
                            value={inputDate}
                            onChange={(e) => setInputDate(e.target.value)}
                        />
                        
                        <select 
                            className={`input-priority ${inputPriority}`}
                            value={inputPriority} 
                            onChange={(e) => setInputPriority(e.target.value)}
                        >
                            <option value="low">優先度低</option>
                            <option value="medium">優先度中</option>
                            <option value="high">優先度高</option>
                        </select>

                        <div className="xp-input-group">
                            <span>XP:</span>
                            <input 
                                type="number"
                                value={inputXP} 
                                onChange={(e) => setInputXP(e.target.value)}
                                max="150"
                            />
                        </div>
                        <button type="submit" className="pixel-btn">發佈</button>
                    </div>
                </form>

                <div className="card-list">
                    {tasks.filter(t => !t.isCompleted).length === 0 && (
                        <div className="empty-tasks-hint">
                            <p>目前沒有任務，請新增卡片開始冒險！</p>
                        </div>
                    )}

                    {tasks.filter(t => !t.isCompleted).map(task => (
                        <TodoCard 
                            key={task.id} 
                            task={task} 
                            onComplete={taskComplete}
                            onDelete={deleteTask} 
                        />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default HomeContent;