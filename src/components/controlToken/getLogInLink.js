const logInLink = async()=>{
    try{
        const response = await fetch("https://toomuchstonestodo.onrender.com/logInLink");
        const link = await response.json();
        window.location.href = link.reLink;
    }catch(err){
        console.error({ message: err.message });
    }
}

export default logInLink;