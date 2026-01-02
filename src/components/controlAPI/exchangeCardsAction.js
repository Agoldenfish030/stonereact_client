import { useEffect } from "react";
import io from "socket.io-client";

const socket = io('https://toomuchstonestodo.onrender.com');
const useExchangeCardsAction = ()=>{
    useEffect(() => {
        socket.on('cardChange');

        return () => socket.off('cardChange');
    }, []);
}

export default useExchangeCardsAction;