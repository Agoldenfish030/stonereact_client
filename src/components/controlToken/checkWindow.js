const Load = window.addEventListener('load', ()=>{
    const path = window.location.pathname;
    if(!sessionStorage.length && (path != '/LogInOut' || path != '/LogInOut/')){
        window.location.replace('https://stonereact-client.vercel.app/LogInOut');
    }
});

const DeleteToken = window.addEventListener('beforeunload', async()=>{
    if(sessionStorage.length){
        const state = sessionStorage.getItem('userState');
        const response = await fetch('https://toomuchstonestodo.onrender.com/userToken', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({state})
        });
    }
});

export default {Load, DeleteToken};