import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Layout from './components/MainArea/Layout';
import Home from './components/MainArea/Home';
import Setting from './components/Setting/Setting';
import LogInOut from './components/LogInOut/LogInOut';
import Authority from './components/LogInOut/Authority';

function App() {
    // 遊戲核心狀態 (加入讀檔邏輯)
    const [xp, setXp] = useState(() => {
        const saved = localStorage.getItem('game_xp');
        return saved ? Number(saved) : 0;
    });

    const [level, setLevel] = useState(() => {
        const saved = localStorage.getItem('game_lv');
        return saved ? Number(saved) : 1;
    });

    // 個人化設定狀態 (字體與背景色)
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
        return saved ? saved : '#f4f7f6';
    });

    // 存檔：當所有狀態改變時執行
    useEffect(() => {
        localStorage.setItem('game_xp', xp);
        localStorage.setItem('game_lv', level);
    }, [xp, level]);

    const handleSave = () => {
        localStorage.setItem('game_user_name', name);
        localStorage.setItem('app_fontSize', fontSize);
        localStorage.setItem('app_themeColor', themeColor);
        alert('設定已儲存！');
    };

    // 遊戲動作：處理獲得經驗與升級
    const handleTaskComplete = (xpGain, taskTitle) => {
        alert(`任務:「${taskTitle}」已完成！獲得經驗值！`);
        setXp(prev => Number(prev) + Number(xpGain));
    };

    useEffect(() => {
        if (xp >= 100) {
            const levelUps = Math.floor(xp / 100);
            const leftovers = xp % 100;

            // 先把 XP 歸位到剩下的餘數
            setXp(leftovers);
            // 再增加等級
            setLevel(prev => prev + levelUps);

            // 確保前面的 alert 關掉後才跳出這個
            setTimeout(() => {
                alert(`恭喜升級！目前的等級是 Lv.${Number(level) + levelUps}`);
            }, 300);
        }
    }, [xp, level]); // 只有 xp 變動時才會跑檢查

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
                        {/* 確保這一行存在，路徑要跟網址對應 */}
                        <Route path="/authority" element={<Authority />} />

                        <Route path="/" element={
                            <Home 
                                xp={xp} 
                                level={level} 
                                onTaskComplete={handleTaskComplete} 
                                themeColor={themeColor} 
                            />
                        } />
                        
                        {/* 將設定狀態傳入 Setting 組件 */}
                        <Route path="/setting" element={
                            <Setting
                                name={name}
                                setName={setName}
                                fontSize={fontSize} 
                                setFontSize={setFontSize}
                                themeColor={themeColor} 
                                setThemeColor={setThemeColor}
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