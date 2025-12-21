const logInLink = async(e)=>{
    if (e && e.preventDefault) e.preventDefault();
    try{
        const response = await fetch("https://toomuchstonestodo.onrender.com/logInLink");
        const link = await response.json();
        if(link.reLink){
            window.location.href = link.reLink;
        }
    }catch(err){
        console.error({ message: err.message });
    }
}

export default logInLink;