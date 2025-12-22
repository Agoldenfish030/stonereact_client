import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Layout from './components/MainArea/Layout';
import Home from './components/MainArea/Home';
import Award from './components/Award/Award';
import Setting from './components/Setting/Setting';
import LogInOut from './components/LogInOut/LogInOut';
import Authority from './components/LogInOut/Authority';

function App() {
    // 遊戲核心狀態
    const [xp, setXp] = useState(() => {
        const saved = localStorage.getItem('game_xp');
        return saved ? Number(saved) : 0;
    });

    const [level, setLevel] = useState(() => {
        const saved = localStorage.getItem('game_lv');
        return saved ? Number(saved) : 1;
    });

    // 個人化設定狀態
     const [name, setName] = useState(() => {
        const saved = localStorage.getItem('game_user_name');
        return saved ? saved : '俗頭';
     });

    const [fontSize, setFontSize] = useState(() => {
        const saved = localStorage.getItem('app_fontSize');
        return saved ? Number(saved) : 16;
    });

    const [themeColor, setThemeColor] = useState(() => {
        const saved = localStorage.getItem('app_themeColor');
        return saved ? saved : '#dadadfff';
    });

    const [notification, setNotification] = useState(() => {
        const saved = localStorage.getItem('deadline_notification');
        if (saved === null) return true; // 沒存過時的預設值
        return saved === 'true';
    })

    const [finished, setFinished] = useState(() => {
        const saved = localStorage.getItem('show_finished');
        if (saved === null) return true; // 沒存過時的預設值
        return saved === 'true';
    })

    // 存檔：當所有狀態改變時執行
    useEffect(() => {
        localStorage.setItem('game_xp', xp);
        localStorage.setItem('game_lv', level);
    }, [xp, level]);

    const handleSave = () => {
        localStorage.setItem('game_user_name', name);
        localStorage.setItem('app_fontSize', fontSize);
        localStorage.setItem('app_themeColor', themeColor);
        localStorage.setItem('deadline_notification', notification);
        localStorage.setItem('show_finished', finished);
        alert('設定已儲存！');
    };

    const checkAchievementUnlocks = (count) => {
        const unlocked = JSON.parse(localStorage.getItem('unlocked_achievements') || '[]');
        
        // 定義成就門檻
        const milestones = [
            { id: 1, count: 1, title: '初出茅廬' },
            { id: 4, count: 30, title: '小有成就' },
        ];

        milestones.forEach(m => {
            if (count >= m.count && !unlocked.includes(m.id)) {
                unlocked.push(m.id);
                // 儲存新的成就清單
                localStorage.setItem('unlocked_achievements', JSON.stringify(unlocked));
                
                alert(`🏆 獲得成就：${m.title}`); 
            }
        });
    };

    // 處理獲得經驗與升級
    const handleTaskComplete = (xpGain, taskTitle) => {
        alert(`任務:「${taskTitle}」已完成！獲得經驗值！`);
        setXp(prev => Number(prev) + Number(xpGain));

        const currentCount = Number(localStorage.getItem('total_completed_tasks') || 0);
        const newCount = currentCount + 1;
        localStorage.setItem('total_completed_tasks', newCount);
        checkAchievementUnlocks(newCount);
    };

    useEffect(() => {
        if (xp >= 100) {
            const levelUps = Math.floor(xp / 100);
            const leftovers = xp % 100;

            // 先把 XP 歸位到剩下的餘數
            setXp(leftovers);
            setLevel(prev => prev + levelUps);

            setTimeout(() => {
                alert(`恭喜升級！目前的等級是 Lv.${Number(level) + levelUps}`);
            }, 300);
        }
    }, [xp, level]);

    return (
        <div 
            className="app-root" 
            style={{ 
                fontSize: `${fontSize}px`, 
                backgroundColor: themeColor,
                minHeight: '100vh',
                transition: 'all 0.3s ease' 
            }}
        >
            <Router>
                <Layout>
                    <Routes>
                        <Route path="/authority" element={<Authority />} />

                        <Route path="/" element={
                            <Home 
                                xp={xp} 
                                level={level} 
                                onTaskComplete={handleTaskComplete} 
                                themeColor={themeColor} 
                            />
                        } />

                        <Route path = "/award" element = {<Award />} />
                        
                        <Route path="/setting" element={
                            <Setting
                                name={name}
                                setName={setName}
                                fontSize={fontSize} 
                                setFontSize={setFontSize}
                                themeColor={themeColor} 
                                setThemeColor={setThemeColor}
                                notification={notification}
                                setNotification={setNotification}
                                finished={finished}
                                setFinished={setFinished}
                                onSave={handleSave}
                            />
                        } />
                        
                        <Route path="/loginout" element={<LogInOut />} />
                    </Routes>
                </Layout>
            </Router>
        </div>
    );
}

export default App;