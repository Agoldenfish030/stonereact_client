const useChangeBoard = async(userState, mainBoardID)=>{
    const response = await fetch('https://toomuchstonestodo.onrender.com/userToken/changeMainBoard', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: {userState, mainBoardID}
    });
    const newCardsList = response.newCardsList;
    return newCardsList;
}

export default useChangeBoard;