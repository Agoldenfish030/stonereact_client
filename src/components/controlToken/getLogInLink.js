const logInLink = async()=>{
    try{
        const response = await fetch("https://toomuchstonestodo.onrender.com/logInLink");
        console.log(response);
        const link = await response.json();
        window.location.href = link.reLink;
    }catch(err){
        console.error({ message: err.message });
    }
}

export default logInLink;