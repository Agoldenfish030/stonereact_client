import { useEffect } from "react";

const checkWindow = async()=>{
    useEffect(()=>{
        const token = sessionStorage.getItem('userState');
        if(!token){
            window.alert("您尚未登入！");
            window.location.href = 'https://stonereact-client.vercel.app/LogInOut';
        }
    });

    useEffect(async()=>{
        window.addEventListener('beforeunload', async()=>{
            await fetch('https://toomuchstonestodo.onrender.com/userToken', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            });
        });
    });
}

export default checkWindow;