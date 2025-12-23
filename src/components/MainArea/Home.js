import React, { useState, useEffect } from 'react';
import TodoCard from '../TodoCard/TodoCard';
import mockTrelloTasks from '../TodoCard/MockData';
import Stone from '../Stone/Stone';
import './Home.css';
import { Gamepad2, ClipboardList } from 'lucide-react';

const HomeContent = ({ xp, level, onTaskComplete }) => {

    const today = new Date().toISOString().split('T')[0];

    // 從 localStorage 讀取已存任務
    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem('local_tasks');
        
        if (savedTasks) {
            return JSON.parse(savedTasks);
        } else {
            return [{
                id: 'example-1',
                title: '範例卡片！',
                tag: '指南',
                dueDate: new Date().toISOString().split('T')[0], // 預設今日
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

    // 每當 tasks 改變時自動同步
    useEffect(() => {
        localStorage.setItem('local_tasks', JSON.stringify(tasks));
    }, [tasks]);

    const taskComplete = (taskId) => {
        const targetTask = tasks.find(t => t.id === taskId);
        if (!targetTask) return;

        const today = new Date().toISOString().split('T')[0];
        const updatedTasks = tasks.map(task =>
            task.id === taskId 
                ? { ...task, isCompleted: true, completedDate: today } 
                : task
        );

        if (onTaskComplete) {
            const xpToSubmit = parseInt(targetTask.xpValue, 10) || 20;
            const titleToSubmit = targetTask.title || "未命名任務";
            onTaskComplete(xpToSubmit, titleToSubmit);
        }

        setTasks(updatedTasks);

        // 過濾出今天完成的所有任務
        const completedTodayCount = updatedTasks.filter(task => 
            task.isCompleted && task.completedDate === today
        ).length;

        if (completedTodayCount === 5) {
            setTimeout(() => {
                alert(`獲得成就：效率達人`);
            }, 1000);
        }
    };

    const deleteTask = (taskId) => {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    };

    const addTask = (e) => {
        e.preventDefault(); // 啟用 HTML5 驗證

        let xpVal = parseInt(inputXP, 10);
        if (isNaN(xpVal)) xpVal = 20;
        if (xpVal > 150) xpVal = 150;
        if (xpVal < 0) xpVal = 0;

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

            <section className="todo-list-area">
                <h2><ClipboardList className='list-header-icon'/> 待辦清單</h2>
    
                <form className="add-task-form" onSubmit={addTask}>
                    {/* 第一行：名稱與標籤 */}
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

                    {/* 第二行：日期、優先級、XP 與按鈕 */}
                    <div className="form-row">
                        <input 
                            type="date" 
                            required 
                            min={today}
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
                    {tasks.length === 0 || (
                        <div className="empty-tasks-hint">
                            <p>目前沒有任務，請新增卡片！</p>
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