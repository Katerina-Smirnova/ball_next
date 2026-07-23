'use client'
import {Game} from "@/app/game";
import {useEffect, useRef} from "react";


export default function GameWrapper() {
    const container = useRef(null)
    useEffect(() => {
        const game = new Game();
        game.init(container.current);
    }, []);
    return (
        <div ref={container}/>
    )
}

