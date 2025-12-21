// src/components/LogInOuts.js
import React, { useState } from 'react';
import './LogInOut.css'

//to backend
import logInLink from '../controlToken/getLogInLink';

const LogInOuts = () => {

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="login-glass">

                    <div className="login-header">
                        <h2>{'加入遊戲'}</h2>
                        <p>{'登入帳號以開始你的遊戲化任務'}</p>
                    </div>

                    <form className="login-form" >
                        <button type="submit" className="login-submit-btn" onClick={logInLink}>
                            {'連結Trello'}
                        </button>
                    </form>

                </div>
            </div>
        </div>
    )
};

export default LogInOuts;

/*
const [isSignUp, setIsSignUp] = useState(false); // 切換登入或註冊

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="login-glass">
                    <div className="login-header">
                        <h2>{isSignUp ? '加入遊戲' : '歡迎回來'}</h2>
                        <p>{isSignUp ? '建立帳號以開始你的遊戲化任務' : '請登入以繼續你的任務'}</p>
                    </div>

                    <form className="login-form" >
                        <div className="input-group">
                            <input type="email" placeholder="Trello電子郵件" required />
                        </div>
                        <div className="input-group">
                            <input type="password" placeholder="密碼" required />
                        </div>
                        
                        <button type="submit" className="login-submit-btn">
                            {isSignUp ? '連結Trello註冊' : '登入'}
                        </button>
                    </form>

                    <div className="login-footer">
                        <button onClick={() => setIsSignUp(!isSignUp)}>
                            {isSignUp ? '已經有帳號了？ 登入' : '還沒有帳號？ 註冊'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
*/