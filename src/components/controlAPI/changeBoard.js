const useChangeBoard = async(userState, mainBoardID)=>{
    const response = await fetch('https://toomuchstonestodo.onrender.com/userToken/changeMainBoard', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userState, mainBoardID })
    });
    const newCardsList = await response.json();
    return newCardsList;
}
//return content:
//newCardsList: object array

export default useChangeBoard;