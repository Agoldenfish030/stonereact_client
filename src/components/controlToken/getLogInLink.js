const logInLink = async()=>{
    try{
        const response = await fetch("https://toomuchstonestodo.onrender.com/logInLink", {
            method: 'GET', 
            headers: { 'Content-Type': 'application/json' },
        });
        const link = await response.json();
        window.location.href = link.reLink;
    }catch(err){
        console.error({ message: err.message });
    }
}

export default logInLink;