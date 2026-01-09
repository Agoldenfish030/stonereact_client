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
        return sessionStorage.getItem('userState') || ''; // 從登入紀錄抓取 userState
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
        const unlocked = JSON.parse(localStorage.getItem('unlocked_achievements') || '[]');
        
        // 1. 從 localStorage 抓取今天完成過的卡片 ID 清單
        const today = new Date().toISOString().split('T')[0];
        const dailyRecord = JSON.parse(localStorage.getItem('daily_completed_record') || '{}');
        
        // 如果日期不是今天，就重置（歸零）
        if (dailyRecord.date !== today) {
            dailyRecord.date = today;
            dailyRecord.ids = [];
        }
        const completedTodayCount = dailyRecord.ids.length;

        // 2. 成就定義
        const milestones = [
            { id: 1, title: '初出茅廬', condition: totalCount >= 1 },
            { id: 3, title: '效率達人', condition: completedTodayCount >= 10 },
            { id: 4, title: '小有成就', condition: totalCount >= 30 }
        ];

        let hasNewUnlock = false;
        milestones.forEach(m => {
            if (m.condition && !unlocked.includes(m.id)) {
                unlocked.push(m.id);
                hasNewUnlock = true;
                setTimeout(() => alert(`🏆 獲得成就：${m.title}`), 800);
            }
        });

        if (hasNewUnlock) {
            localStorage.setItem('unlocked_achievements', JSON.stringify(unlocked));
        }
        
        // 儲存更新後的每日紀錄（確保日期正確）
        localStorage.setItem('daily_completed_record', JSON.stringify(dailyRecord));
    };

    // 處理獲得經驗與升級
    // 修改參數，多接收一個 taskId
    const handleTaskComplete = (xpGain, taskTitle, taskId) => {
        alert(`任務:「${taskTitle}」已完成！獲得經驗值！`);
        setXp(prev => Number(prev) + Number(xpGain));

        // 更新總次數
        const currentCount = Number(localStorage.getItem('total_completed_tasks') || 0);
        const newCount = currentCount + 1;
        localStorage.setItem('total_completed_tasks', newCount);

        // 更新「今日完成 ID」紀錄
        const today = new Date().toISOString().split('T')[0];
        let dailyRecord = JSON.parse(localStorage.getItem('daily_completed_record') || '{"date":"","ids":[]}');
        
        if (dailyRecord.date !== today) {
            dailyRecord = { date: today, ids: [] };
        }
        
        // 如果這個 ID 還沒被記錄過，就加進去
        if (taskId && !dailyRecord.ids.includes(taskId)) {
            dailyRecord.ids.push(taskId);
            localStorage.setItem('daily_completed_record', JSON.stringify(dailyRecord));
        }

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

    console.log("源頭 App.js 的 userState:", userState);

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