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
            const delState = sessionStorage.getItem('userState');
            fetch('https://toomuchstonestodo.onrender.com/userToken', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({state: delState}),
                keepalive: true
            });
        });
        return ()=>{ window.addEventListener('beforeunload', removeUser) }
    });
}

export default useCheckWindow;