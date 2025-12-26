const useUpdateBoards = async(userState)=>{
    const response = await fetch(`https://toomuchstonestodo.onrender.com/userToken/getBoards?userState=${userState}`);
    const boardDatas = await response.json();
    return boardDatas;
}
//return content:
//{
//    mainBoard: {
//        id: mainBoardID,
//        name: mainBoardName
//    },
//    boardList: boardList,
//    allCards: allCards
//};
//

export default useUpdateBoards;