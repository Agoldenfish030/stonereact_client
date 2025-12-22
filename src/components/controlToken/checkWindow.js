window.addEventListener('load', ()=>{});

window.addEventListener('beforeunload', async()=>{
    const stateObj = sessionStorage.getItem('userState');
    const state = stateObj.json();
    const response = await fetch('https://toomuchstonestodo.onrender.com/userToken', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({state})
    });
});