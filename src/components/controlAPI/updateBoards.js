const useUpdateBoards = async(userState)=>{
    const response = await fetch(`https://toomuchstonestodo.onrender.com/getBoards?userState=${userState}`);
    const boardList = await response.json();
    return boardList;
}

export default useUpdateBoards;