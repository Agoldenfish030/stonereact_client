import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io('https://toomuchstonestodo.onrender.com');
const useExchangeCardsAction = ()=>{
    const [resCard, setResCard] = useState(null);

    useEffect(() => {
        socket.on('cardChange', (data)=>{
            setResCard(data);
        });

        return () => socket.off('cardChange');
    }, []);

    return resCard;
}

export default useExchangeCardsAction;