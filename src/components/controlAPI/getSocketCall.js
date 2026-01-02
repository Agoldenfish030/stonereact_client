import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io('https://toomuchstonestodo.onrender.com');
const useGetSocketCall = ()=>{
    const [resCard, setResCard] = useState(null);

    useEffect(() => {
        socket.on('cardChange', (data)=>{
            setResCard(data);
        });

        return () => socket.off('cardChange');
    }, []);

    return resCard;
}

// cardData = {
//      type: '',
//      cardID: action.data.card.id, //String
//      cardName: action.data.card.name, //String
//      cardDue: action.data.card.due,
//      cardComplete: action.data.card.dueComplete //Boolean
// };

export default useGetSocketCall;