import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Layout from './components/MainArea/Layout';
import Home from './components/MainArea/Home';
import Award from './components/Achievement/Award';
import Setting from './components/Setting/Setting';
import LogInOut from './components/LogInOut/LogInOut';
import Authority from './components/LogInOut/Authority';

// for fish
import useCheckWindow from './components/controlToken/checkWindow';

function App() {
    //for fish
    useCheckWindow();

    const [userState, setUserState] = useState(() => {
        return localStorage.getItem('user_state') || ''; // 從登入紀錄抓取 userState
    });

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
        if (saved === null) return true;
        return saved === 'true';
    })

    const [finished, setFinished] = useState(() => {
        const saved = localStorage.getItem('show_finished');
        if (saved === null) return true;
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

    const checkAchievementUnlocks = (totalCount) => {
        // 取得目前已解鎖的 ID 清單
        const unlocked = JSON.parse(localStorage.getItem('unlocked_achievements') || '[]');
        
        // 2. 為了判定「效率達人」，從 localStorage 抓取今天的任務完成狀況
        const localTasks = JSON.parse(localStorage.getItem('local_tasks') || '[]');
        const today = new Date().toISOString().split('T')[0];
        const completedToday = localTasks.filter(t => t.isCompleted && t.completedDate === today).length;

        // 3. 統一成就定義清單：將條件 (condition) 寫在這裡
        const milestones = [
            { id: 1, title: '初出茅廬', condition: totalCount >= 1 },
            { id: 3, title: '效率達人', condition: completedToday >= 10 },
            { id: 4, title: '小有成就', condition: totalCount >= 30 }
        ];

        let hasNewUnlock = false;

        // 使用單一迴圈檢查所有成就
        milestones.forEach(m => {
            // 如果滿足條件且尚未解鎖
            if (m.condition && !unlocked.includes(m.id)) {
                unlocked.push(m.id);
                hasNewUnlock = true;
                
                // 延遲彈窗，增加獲得成就的驚喜感
                setTimeout(() => {
                    alert(`獲得成就：${m.title}`);
                }, 800);
            }
        });

        // 如果有新解鎖，一次性存入 localStorage
        if (hasNewUnlock) {
            localStorage.setItem('unlocked_achievements', JSON.stringify(unlocked));
        }
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
                                userState={userState}
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
                                onTaskComplete={handleTaskComplete}
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