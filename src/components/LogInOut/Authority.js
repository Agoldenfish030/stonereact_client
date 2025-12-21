import React from 'react';
import './Authority.css';
import userToken from '../controlToken/getUserToken';
//to backend

const Log = () => {
    userToken();

    return (
        <div className="auth-loading-page">
            <div className="auth-glass-card">
                <div className="pixel-spinner">
                    <div className="spinner-block"></div>
                </div>
                <h2 className="auth-text">授權中</h2>
                <p className="auth-subtext">正在與 Trello 進行安全連線...</p>
            </div>
        </div>
    )
}

export default Log;

/* 加上「點點點」的閃爍動畫
const Log = () => {
    return (
        <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '100vh', // 讓它在整個螢幕垂直置中
            flexDirection: 'column'
        }}>
            <h2 style={{ 
                textAlign: 'center', 
                fontSize: '60px', 
                color: '#4a90e2', // 換成你專案的藍色系
                fontWeight: 'bold'
            }}>
                授權中...
            </h2>
            <p style={{ color: '#888' }}>請稍候，正在連接遊戲伺服器</p>
        </div>
    )
}
*/

/* 加入 Lucide 圖示的旋轉效果
import React from 'react';
import { Loader2 } from 'lucide-react'; // 引入載入圖示
import './Log.css'; // 需要寫一小段 CSS 來讓它轉

const Log = () => {
    return (
        <div style={{ 
            textAlign: 'center', 
            marginTop: '100px' 
        }}>
            <Loader2 
                size={80} 
                className="spinner" // 在 CSS 裡設定 animation
                style={{ color: '#4facfe', marginBottom: '20px' }} 
            />
            <h2 style={{ fontSize: '40px' }}>授權中...</h2>
        </div>
    );
}

.spinner {
    animation: spin 1s linear infinite;
}

@keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}
*/