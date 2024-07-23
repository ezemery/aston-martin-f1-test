import { useState, useEffect } from "react";
import { throttle } from "./utils/throttle";
export const useMousePosition = () => {
    const [position, setPosition] = useState({
        x:0,
        y:0
    })

    useEffect(() => {
        const onMouseMove = throttle((e) => {
            const {clientX:x, clientY:y} = e
            setPosition({x,y})
        },200);
        window.addEventListener("mousemove", onMouseMove);
        return () => window.removeEventListener("mousemove", onMouseMove);
    },[])

    return position;
} 