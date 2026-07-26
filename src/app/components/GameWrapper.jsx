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
        if (loading || !data.length || !container.current) return;
        const game = new Game();
        (async () => {
            await game.init(container.current);
        })();
        return () => {
            game.destroy();
        };
    }, [loading, data]);
    return (
        <>
            <div ref={container}/>
            <TextWrapper/>
        </>
    )
}

