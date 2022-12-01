import { createContext, ReactNode, useState } from "react";

interface CreatePointsProps {
  entryOne: string;
  exitOne: string;
  entryTwo: string;
  exitTwo: string;
  totalHour: number;
}

interface PointsProps {
  id: string;
  entryOne: string;
  exitOne: string;
  entryTwo: string;
  exitTwo: string;
  isHoliday: boolean;
  userId: string;
  datetime: Date;
  bankPointBalance: {
    timeMorning: string;
    lunch: string;
    timeAfternoon: string;
    totalTimePoint: string;
    statusPoint: "UP" | "DOWN" | "EQUAL";
  };
}

interface PointsContextProps {
  points: {}[];
  onCreatePoint(point: CreatePointsProps): Promise<void>;
}

interface PointsProviderProps {
  children: ReactNode;
}

export const PointsContext = createContext({} as PointsContextProps);

export function PointsProvider({ children }: PointsProviderProps) {
  const [points, setPoints] = useState([]);

  async function onCreatePoint(point: CreatePointsProps) {}

  return (
    <PointsContext.Provider value={{ onCreatePoint, points }}>
      {children}
    </PointsContext.Provider>
  );
}
