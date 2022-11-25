export interface ICreateBankBalancePointDTO {
  timeMorning: string;
  lunch: string;
  timeAfternoon: string;
  totalTimePoint: string;
  statusPoint: "UP" | "DOWN" | "EQUAL";
  pointId: string;
}
