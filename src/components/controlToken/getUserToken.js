import { useEffect } from "react";
import { useNavigate as UseNavigate } from 'react-router-dom';

const UserToken = ()=>{
    const navigate = UseNavigate();

    useEffect(async() => {
    // 從網址 hash 中抓取 token (#token=xxxx)
        const hash = window.location.hash;
        const token = new URLSearchParams(hash.replace('#', '?')).get('token');

        if (token){
            // 傳送到 Express 後端
            const response = await fetch('https://toomuchstonestodo.onrender.com/userToken', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token })
            });
            const state = await response.json();
            sessionStorage.setItem('userState', state);

            //登入成功後跳轉回主畫面
            navigate('https://agoldenfish030.github.io/#/');
        }
    }, [navigate]);
}

export default UserToken;