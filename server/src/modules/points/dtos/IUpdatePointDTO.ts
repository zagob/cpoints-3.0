export interface BankBalancePointProps {
  timeMorning: string;
  lunch: string;
  timeAfternoon: string;
  totalTimePoint: string;
  statusPoint: "UP" | "DOWN" | "EQUAL";
  pointId: string;
}

export interface IUpdatePointDTO {
  entryOne: string;
  exitOne: string;
  entryTwo: string;
  exitTwo: string;
  isHoliday?: boolean;
}
