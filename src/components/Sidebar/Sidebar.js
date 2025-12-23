import React from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';
import { Stone, Award, Settings, Wrench, LogOut } from 'lucide-react';

const menuItems = [
  { id: 1, icon: <Stone color='lightgrey'/>, label: '主頁', link: '/' },
  { id: 2, icon: <Award color='lightgrey'/>, label: '成就＆紀錄', link: '/award' },
  { id: 3, icon: <Settings color='lightgrey'/>, label: '個人化設定', link: '/setting' },
  { id: 4, icon: <Wrench color='lightgrey'/>, label: '專案說明', link: 'https://drive.google.com/file/d/1H_T5NR3sEFAU6CZr0x_vSM9GIR4vgmIs/view?usp=sharing', isExternal: true },
  { id: 5, icon: <LogOut color='lightgrey'/>, label: '登出', link: '/loginout' },
];

const Sidebar = ({ isCollapsed }) => {
  return (
    <nav id="sidebar" className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
       <div className="sidebar-content">
            <div className="sidebar-header">
                <h3>功能選單</h3>
            </div>
            <ul className="menu-list">
                {menuItems.map(item => (
                <li key={item.id}>
                    {item.isExternal ? (
                        <a href={item.link} target="_blank" rel="noopener noreferrer">
                            {item.icon}
                            {item.label}
                        </a>
                    ) : (
                        <Link to={item.link}>
                            {item.icon}
                            {item.label}
                        </Link>
                    )}
                </li>
                ))}
            </ul>
       </div>
    </nav>
  );
};

export default Sidebar;