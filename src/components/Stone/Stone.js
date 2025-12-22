import React, { useState, useEffect, useRef } from 'react';
import stoneImg from './babystone.png';
import './Stone.css';

const Stone = () => {
    /* 動態邏輯
    const [position, setPosition] = useState({ x: 120, y: 70 });
    const containerRef = useRef(null);

    useEffect(() => {
        const moveInterval = setInterval(() => {
            setPosition((prev) => {
                const dx = (Math.floor(Math.random() * 3) - 1) * 30;
                const dy = (Math.floor(Math.random() * 3) - 1) * 30;
                const containerWidth = containerRef.current ? containerRef.current.offsetWidth : 400;
                const containerHeight = containerRef.current ? containerRef.current.offsetHeight : 400;
                const stoneSize = 88; 
                const maxWidth = containerWidth - stoneSize;
                const maxHeight = containerHeight - stoneSize;
                let nextX = prev.x + dx;
                let nextY = prev.y + dy;
                nextX = Math.max(0, Math.min(nextX, maxWidth)); 
                nextY = Math.max(0, Math.min(nextY, maxHeight));
                return { x: nextX, y: nextY };
            });
        }, 1000);
        return () => clearInterval(moveInterval);
    }, []);
    */

    return (
        <div className="stone-wrapper">
            <div className="pixel-stone">
                <img src={stoneImg} alt="pixel-stone" className="stone-image" />
            </div>
        </div>
    );
};

export default Stone;