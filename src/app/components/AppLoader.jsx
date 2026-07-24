"use client";

import {useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import fetchData from "@/app/features/data/dataThunk";
import {Assets} from "pixi.js";

export function AppLoader({ children }) {
    const dispatch = useDispatch();
    const [ready, setReady] = useState(false);
    useEffect(() => {
        async function load() {
            await dispatch(fetchData());
            await Assets.load('/ball.png');
            setReady(true);
        }
        load();
    }, []);
    if (!ready) {
        return <div>Loading...</div>;
    }

    return children;
}