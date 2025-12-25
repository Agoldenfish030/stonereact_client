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
}

export default useCheckWindow;