import React from 'react';
import './Award.css';
import { Award, Trophy, Star, Target, Zap } from 'lucide-react';

const Achievement = () => {
    const achievements = [
        { id: 1, title: "初出茅廬", desc: "完成第一個 Trello 任務", icon: <Star />, unlocked: true },
        { id: 2, title: "石頭建築師", desc: "幫石頭換過 3 次外觀", icon: <Zap />, unlocked: true },
        { id: 3, title: "效率達人", desc: "單日完成 5 個任務", icon: <Target />, unlocked: false },
        { id: 4, title: "傳奇玩家", desc: "石頭等級達到 50 級", icon: <Trophy />, unlocked: false },
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