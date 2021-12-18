import {LOST_EVENINGS_START} from "../Constants";
import {TimeSpan} from "./TimeSpan";


export const calculateTimeUntilLostEvenings = (): TimeSpan => {
    const millisUntilLostEvenings = LOST_EVENINGS_START.getTime() - new Date().getTime();
    const totalSeconds = millisUntilLostEvenings / 1000;
    const totalMinutes = totalSeconds / 60;
    const totalHours = totalMinutes / 60;
    const totalDays = totalHours / 24;

    const days = Math.floor(totalDays);
    const hours = Math.floor(totalHours - days * 24);
    const minutes = Math.floor(totalMinutes - (hours + days * 24) * 60);
    const seconds = Math.floor(totalSeconds - (minutes + (hours + days * 24) * 60) * 60);
    return {
        days,
        hours,
        minutes,
        seconds,
        totalSeconds,
        totalMinutes,
        totalHours,
        totalDays
    };
}