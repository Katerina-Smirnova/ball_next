'use client'
import {Game} from "@/app/ball/game";
import {useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import TextWrapper from "@/app/components/TextWrapper";
import {setText} from "@/app/features/text/textSlice";


export default function GameWrapper() {
    const data = useSelector((state) => state.data.data)
    const loading = useSelector((state) => state.data.isLoading);
    const container = useRef(null)
    const dispatch = useDispatch();

    useEffect(() => {
        if (loading || !data.length || !container.current) return;
        const game = new Game();
        (async () => {
            await game.init(container.current);
            dispatch(setText(data[0].title))
        })();
        return () => {
            game.destroy();
        };
    }, [loading, data]);
    return (
        <div className={"game-wrapper"}>
            <div ref={container}/>
            <TextWrapper/>
        </div>
    )
}

