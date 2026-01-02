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
//newCardsList: [{
//          id,  //String
//          name,  //String
//          due,  //String
//          dueComplete  //Boolean
//     }]

export default useChangeBoard;