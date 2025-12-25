const useUpdateBoards = async(userState)=>{
    const response = await fetch(`https://toomuchstonestodo.onrender.com/userToken/getBoards?userState=${userState}`);
    const boardDatas = await response.json();
    return boardDatas;
}

export default useUpdateBoards;