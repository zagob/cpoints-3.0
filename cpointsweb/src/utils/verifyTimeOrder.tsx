import { convertTimeToMinutes } from "./convertTimeToMInutes";

interface VerifyTimeOrderProps {
  entryOne: string;
  exitOne: string;
  entryTwo: string;
  exitTwo: string;
}

export function VerifyTimeOrder(times: VerifyTimeOrderProps): boolean {
  const { entryOne, exitOne, entryTwo, exitTwo } = times;

  const entryOneMinutes = convertTimeToMinutes(entryOne);
  const exitOneMinutes = convertTimeToMinutes(exitOne);
  const entryTwoMinutes = convertTimeToMinutes(entryTwo);
  const exitTwoMinutes = convertTimeToMinutes(exitTwo);

  const isTimesAccept =
    entryOneMinutes < exitOneMinutes &&
    exitOneMinutes < entryTwoMinutes &&
    entryTwoMinutes < exitTwoMinutes;

  return isTimesAccept;
}
