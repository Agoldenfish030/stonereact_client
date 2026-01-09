const useRequestTrello = async(state, type, id, name, due, dueComplete)=>{
    await fetch('https://toomuchstonestodo.onrender.com/userToken/requestTrello', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({state, type, id, name, due, dueComplete})
    });
}

export default useRequestTrello;