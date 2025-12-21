// src/components/Layout.js
import React, { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import './AppStyles.css';

const Layout = ({ children }) => {
    // 管理側邊欄收合狀態
    const [isCollapsed, setIsCollapsed] = useState(true);

    const handleToggleSidebar = () => {
        setIsCollapsed(prev => !prev);
    };

    return (
        <div className="app-container">
        {/* 側邊欄收合按鈕 */}
        <button 
            id="sidebarToggle" 
            className="toggle-btn"
            onClick={handleToggleSidebar}
        >
            ☰ 
        </button>

        {/* 側邊欄元件 */}
        <Sidebar isCollapsed = {isCollapsed} />

        {/* 主要內容區塊 */}
        <main 
            id="mainContent" 
            className={`main-content ${isCollapsed ? 'sidebar-collapsed-padding' : 'expanded-padding'}`}
        >
            {/* ✨ 關鍵點：這裏會根據路由自動顯示 Home 或 Settings */}
            {children}
        </main>
        </div>
    );
};

export default Layout;
