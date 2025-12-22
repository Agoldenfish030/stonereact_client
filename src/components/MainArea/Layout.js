import React, { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import './AppStyles.css';

const Layout = ({ children }) => {
    // 側邊欄收合狀態
    const [isCollapsed, setIsCollapsed] = useState(true);

    const handleToggleSidebar = () => {
        setIsCollapsed(prev => !prev);
    };

    return (
        <div className="app-container">
        <button 
            id="sidebarToggle" 
            className="toggle-btn"
            onClick={handleToggleSidebar}
        >
            ☰ 
        </button>

        <Sidebar isCollapsed = {isCollapsed} />

        <main 
            id="mainContent" 
            className={`main-content ${isCollapsed ? 'sidebar-collapsed-padding' : 'expanded-padding'}`}
        >
            {/* 根據路由自動顯示 Home, Award, Setting... */}
            {children}
        </main>
        </div>
    );
};

export default Layout;
