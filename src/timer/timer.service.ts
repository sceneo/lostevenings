import {Injectable} from "@angular/core";
import {TimeUnit} from "./TimeUnit";

@Injectable(
  {
    providedIn: 'root',
  }
)
export class TimerService {
  constructor() {
  }

  private static SECONDS_PER_DAY = 86400;
  private static SECONDS_PER_HOUR = 3600;
  private static SECONDS_PER_MINUTE = 60;

  getTimeUntil(date: number): number {
    return (date - Date.now()) / 1000; // in seconds
  }

  getCurrentTimeInSecondsWithoutDays(): number {
    const currentTimeInSeconds = Date.now() / 1000 + TimerService.SECONDS_PER_HOUR; // GMT + 1
    const numberOfDays = Math.floor(currentTimeInSeconds / TimerService.SECONDS_PER_DAY);
    return currentTimeInSeconds - numberOfDays * TimerService.SECONDS_PER_DAY;
  }

  getTimeUnitFrom(date: number) {
    const days = Math.floor(date / TimerService.SECONDS_PER_DAY);
    const hours = Math.floor((date - TimerService.SECONDS_PER_DAY * days) / TimerService.SECONDS_PER_HOUR)
    const minutes = Math.floor((date - TimerService.SECONDS_PER_DAY * days - TimerService.SECONDS_PER_HOUR * hours) / TimerService.SECONDS_PER_MINUTE)
    const seconds = Math.floor(date - TimerService.SECONDS_PER_DAY * days - TimerService.SECONDS_PER_HOUR * hours - minutes * TimerService.SECONDS_PER_MINUTE)
    return {
      days,
      hours,
      minutes,
      seconds
    }
  }

  renderTimeFromNumber(time: number) {
    return this.renderTimeFromTimeUnit(this.getTimeUnitFrom(time));
  }

  private renderTimeFromTimeUnit(time: TimeUnit): string {
    if (time.days > 0) {
      return time.days + " days  " + this.renderTimeWithoutDays(time);
    } else {
      return this.renderTimeWithoutDays(time);
    }
  }

  private renderTimeWithoutDays(time: TimeUnit) {
    return this.addLeadingZeroIfOnlyOneDigit(time.hours) + ":" + this.addLeadingZeroIfOnlyOneDigit(time.minutes) + ":" + this.addLeadingZeroIfOnlyOneDigit(time.seconds);
  }

  private addLeadingZeroIfOnlyOneDigit(input: number): string {
    return input < 10 ? "0" + input : input.toString();
  }

}
