// Award.js
import React from 'react';
import './Award.css';
import { Award, Trophy, Star, Target, Zap } from 'lucide-react';

const Achievement = () => {
    // 讀取目前已解鎖的 ID 陣列 (這裡要對應 App.js 存入的格式)
    const unlockedList = JSON.parse(localStorage.getItem('unlocked_achievements') || '[]');

    const achievements = [
        // 使用 includes 檢查此 ID 是否存在於儲存的陣列中
        { id: 1, title: "初出茅廬", desc: "完成第一個任務", icon: <Star />, unlocked: unlockedList.includes(1) },
        { id: 2, title: "石頭建築師", desc: "幫石頭換過 3 次外觀", icon: <Zap />, unlocked: unlockedList.includes(2) },
        { id: 3, title: "效率達人", desc: "單日完成 5 個任務", icon: <Target />, unlocked: unlockedList.includes(3) },
        { id: 4, title: "小有成就", desc: "已完成 30 個任務", icon: <Trophy />, unlocked: unlockedList.includes(4) },
        { id: 5, title: "傳奇玩家", desc: "等級達到 10000 級", icon: <Trophy />, unlocked: unlockedList.includes(5) },
    ];

    return (
        <div className="achievement-wrapper">
            <div className="achievement-card">
                <h2><Award className = 'award-header-icon'/> 榮譽成就</h2>
                <div className="achievement-grid">
                    {achievements.map(achievement => (
                        <div key={achievement.id} className={`badge-item ${achievement.unlocked ? 'unlocked' : 'locked'}`}>
                            <div className="badge-icon">
                                {achievement.icon}
                            </div>
                            <div className="badge-info">
                                <h3>{achievement.title}</h3>
                                <p>{achievement.desc}</p>
                            </div>
                            {/* 只有當 unlocked 為 false 時才顯示鎖頭 */}
                            {!achievement.unlocked && <div className="lock-overlay">🔒</div>}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Achievement;

/*
import React from 'react';
import './Award.css';
import { Award, Trophy, Star, Target, Zap } from 'lucide-react';

const Achievement = () => {
    const achievements = [
        { id: 1, title: "初出茅廬", desc: "完成第一個任務", icon: <Star />, unlocked: false },
        { id: 2, title: "石頭建築師", desc: "幫石頭換過 3 次外觀", icon: <Zap />, unlocked: false },
        { id: 3, title: "效率達人", desc: "單日完成 5 個任務", icon: <Target />, unlocked: false },
        { id: 4, title: "小有成就", desc: "已完成 30 個任務", icon: <Trophy />, unlocked: false },
        { id: 5, title: "傳奇玩家", desc: "等級達到 10000 級", icon: <Trophy />, unlocked: false },
    ];

    return (
        <div className="achievement-wrapper">
            <div className="achievement-card">
                <h2><Award className = 'award-header-icon'/> 榮譽成就</h2>
                <div className="achievement-grid">
                    {achievements.map(achievement => (
                        <div key={achievement.id} className={`badge-item ${achievement.unlocked ? 'unlocked' : 'locked'}`}>
                            <div className="badge-icon">
                                {achievement.icon}
                            </div>
                            <div className="badge-info">
                                <h3>{achievement.title}</h3>
                                <p>{achievement.desc}</p>
                            </div>
                            {!achievement.unlocked && <div className="lock-overlay">🔒</div>}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Achievement;
//*/