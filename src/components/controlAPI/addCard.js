const useAddTask = async (userState, boardID, taskData) => {
    const response = await fetch('https://toomuchstonestodo.onrender.com/userToken/addTask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            userState, 
            boardID, 
            task: taskData 
        })
    });
    const result = await response.json();
    return result;
}

export default useAddTask;