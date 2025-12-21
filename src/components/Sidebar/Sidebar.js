// Sidebar.js
import React from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';
import {Stone, Award, Settings, Wrench, LogOut} from 'lucide-react';
// CSS 在 Layout.js 中引入，Sidebar 只負責樣式套用

const menuItems = [
  { id: 1, icon: <Stone color = 'lightgrey'/>, label: '主頁', link: '/' },
  { id: 2, icon: <Award color = 'lightgrey'/>, label: '成就＆活躍紀錄', link: '#', active: true },
  { id: 3, icon: <Settings color = 'lightgrey'/>, label: '個人化設定', link: '/setting' },
  { id: 4, icon: <Wrench color = 'lightgrey'/>, label: '操作說明', link: '#' },
  { id: 5, icon: <LogOut color = 'lightgrey'/>, label: '登出', link: '/loginout' },
];

const Sidebar = ({ isCollapsed }) => {
  return (
    // 根據傳入的 isCollapsed 狀態決定套用的 className
    <nav 
      id = "sidebar" 
      className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}
    >
       <div className="sidebar-content">
            <div className="sidebar-header">
                <h3>功能選單</h3>
            </div>
            <ul className="menu-list">
                {/* 使用 map 渲染選單，讓程式碼更簡潔工整 */}
                {menuItems.map(item => (
                <li key={item.id} className={item.active ? 'active' : ''}>
                    <Link to = {item.link}>
                        {/* 注意：i 標籤在 React 中仍使用 className */}
                        {item.icon}
                        {item.label}
                    </Link>
                </li>
                ))}
            </ul>
       </div>
    </nav>
  );
};

export default Sidebar;
