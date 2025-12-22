window.addEventListener('load', ()=>{
    const location = useLocation();
    const pathname = location.pathname;
    if(!sessionStorage.length && pathname != '/LogInOut') window.location.replace('https://stonereact-client.vercel.app/LogInOut');
});

window.addEventListener('beforeunload', async()=>{
    const state = sessionStorage.getItem('userState');
    const response = await fetch('https://toomuchstonestodo.onrender.com/userToken', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({state})
    });
});