import { ICreateBankBalancePointDTO } from "./ICreateBankBalancePointDTO";

export interface ICreatePointsDTO {
  entryOne: string;
  exitOne: string;
  entryTwo: string;
  exitTwo: string;
  isHoliday?: boolean;
  // bankPointBalance?: ICreateBankBalancePointDTO | undefined;
}
