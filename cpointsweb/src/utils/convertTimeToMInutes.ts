export function convertTimeToMinutes(time: string): number {
  const [hour, minute] = time.split(":");

  return Number(hour) * 60 + Number(minute);
}
