const useAddTask = async (userState, boardID, taskData) => {
    const response = await fetch('https://toomuchstonestodo.onrender.com/userToken/addTask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            userState, 
            boardID, 
            task: {
                name: taskData.title,
                due: taskData.dueDate,  
                xpValue: taskData.xpValue,
                priority: taskData.priority,
                tag: taskData.tag
            }
        })
    });
    return await response.json();
}

export default useAddTask;