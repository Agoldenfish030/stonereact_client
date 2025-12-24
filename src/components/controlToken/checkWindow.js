import { useEffect } from "react";

const useCheckWindow = ()=>{
    useEffect(()=>{
        const token = sessionStorage.getItem('userState');
        if(!token
            && window.location.href != 'https://stonereact-client.vercel.app/LogInOut'
            && !window.location.hash.includes('token=')){
            window.alert("您尚未登入！");
            window.location.href = 'https://stonereact-client.vercel.app/LogInOut';
        }
    });

    useEffect(()=>{
        const removeUser = window.addEventListener('beforeunload', ()=>{
            navigator.sendBeacon(
                'https://toomuchstonestodo.onrender.com/userToken',
                JSON.stringify({ method: 'DELETE', headers: { 'Content-Type': 'application/json' }})
            );
        });
        return ()=>{ window.addEventListener('beforeunload', removeUser) }
    });
}

export default useCheckWindow;