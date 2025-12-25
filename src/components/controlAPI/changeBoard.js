const useChangeBoard = async(userState, mainBoardID)=>{
    await fetch('https://toomuchstonestodo.onrender.com/userToken/changeMainBoard', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: {userState, mainBoardID}
    });
}

export default useChangeBoard;