window.addEventListener('beforeunload', async()=>{
    const state = sessionStorage.getItem('userState');
    const response = await fetch('https://toomuchstonestodo.onrender.com/userToken', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({state})
    });
});