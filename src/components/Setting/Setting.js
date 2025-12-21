import React, { useState } from 'react';
import './Setting.css';
import { Settings } from 'lucide-react';

const SettingsStyle = ({ name, setName, fontSize, setFontSize, themeColor, setThemeColor, onSave }) => {

    return (
        <div className="settings-page-wrapper">
            <div className="settings-card">
                <h2><Settings className="header-icon"/> 個人化設定</h2>
                
                {/* 1. 角色資訊 (你原本的功能) */}
                <div className="settings-section">
                    <h3>角色資訊</h3>
                    <div className="input-group">
                        <label>更改角色暱稱：</label>
                        <input 
                            type="text"
                            value={name} 
                            style={{ border: '2px solid lightgrey', display: 'inline-block', outline: 'none', }}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="請輸入新暱稱..."
                        />
                    </div>
                </div>

                {/* 2. 顯示設定 (新加入的全域功能) */}
                <div className="settings-section">
                    <h3>顯示設定</h3>
                    <div className="setting-item">
                        <label>文字大小 ({fontSize}px)</label>
                        <input 
                            type="range" 
                            min="14" 
                            max="24" 
                            step="1"
                            value={fontSize} 
                            onChange={(e) => setFontSize(Number(e.target.value))} 
                        />
                    </div>
                </div>

                {/* 3. 視覺主題 (新加入的全域功能) */}
                <div className="settings-section">
                    <h3>視覺主題</h3>
                    <div className="setting-item">
                        <label>切換背景色</label>
                        <div className="color-picker-group">
                            {['#f4f7f6', '#fff5f5', '#e7f5ff', '#fef9e7'].map(color => (
                                <button 
                                    key={color}
                                    className={`color-dot ${themeColor === color ? 'active' : ''}`}
                                    style={{ backgroundColor: color }}
                                    onClick={() => setThemeColor(color)}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* 4. 遊戲偏好 (你原本的功能) */}
                <div className="settings-section">
                    <h3>遊戲偏好</h3>
                    <div className="checkbox-group">
                        <input type="checkbox" id="notifications" defaultChecked />
                        <label htmlFor="notifications"> 任務截止提醒</label>
                    </div>
                    <div className="checkbox-group">
                        <input type="checkbox" id="sound" />
                        <label htmlFor="sound"> 顯示已完成任務</label>
                    </div>
                </div>

                {/* 5. 操作按鈕 */}
                <div className="button-group">
                    <button className="save-btn" onClick={onSave}>
                        儲存變更
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SettingsStyle;