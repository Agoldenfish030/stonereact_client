const useUpdateBoards = async(userState)=>{
    const response = await fetch(`https://toomuchstonestodo.onrender.com/userToken/getBoards?userState=${userState}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });
    const boardDatas = await response.json();
    return boardDatas;
}
//return content:
//{
//    mainBoard: {
//        id, //String
//        name //String
//    },
//    boardList: [{
//          id,  //String
//          name  //String
//    }],
//    allCards: [{
//          id,  //String
//          name,  //String
//          due,  //String
//          dueComplete  //Boolean
//     }]
//};
//

export default useUpdateBoards;