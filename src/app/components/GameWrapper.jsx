'use client'
import {Game} from "@/app/ball/game";
import {useEffect, useRef} from "react";
import {useSelector} from "react-redux";
import TextWrapper from "@/app/components/TextWrapper";


export default function GameWrapper() {
    const data = useSelector((state) => state.data.data)
    const loading = useSelector((state) => state.data.isLoading);
    const container = useRef(null)
    useEffect(() => {
        if (loading || !data.length) return;
        const game = new Game(data);
        game.init(container.current);
        console.log("Game init");
        // return () => {
        //     game.destroy()
        // }
    }, [loading]);
    return (
        <>
            <div ref={container}/>
            <TextWrapper/>
        </>
    )
}

