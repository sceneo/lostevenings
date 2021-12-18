import {useGlobalState} from "../state/GlobalStateProvider";
import {useEffect, useRef, useState} from "react";
import {calculateTimeUntilLostEvenings} from "../calculator/calculateTimeUntilLostEvenings";




export default function TimeTillLostEvenings() {
    const {state, setState} = useGlobalState();

    const timerRef = useRef<NodeJS.Timeout>();
    useEffect(() => {
        timerRef.current = setInterval(() => {
            setState({
                ...state,
                timeUntilLostEvenings: calculateTimeUntilLostEvenings()
            })
        }, 1000);

        return () => {
            clearInterval(timerRef.current!);
        };
    }, [ timerRef, state ]);
    return (
        <div>
            Time until LE V: { state.timeUntilLostEvenings?.days } days {state.timeUntilLostEvenings?.hours}h {state.timeUntilLostEvenings?.minutes}m {state.timeUntilLostEvenings?.seconds}s
        </div>

    );
}

