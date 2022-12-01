import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import ptBr from "date-fns/locale/pt";
import { useRef, useState } from "react";

import { useForm } from "react-hook-form";
import { InputTime } from "./InputTime";
import { Button } from "./Button";
import { Modal } from "./Modal";
import { useSession } from "next-auth/react";
import { ModalUserInfo } from "./modals/ModalUserInfo";
import { useAuth } from "../hooks/useAuth";

export interface UseFormTimePointsProps {
  entryOne: string;
  exitOne: string;
  entryTwo: string;
  exitTwo: string;
}

export function AsideControlPoints() {
  const { userInfo, existDataUserInfo } = useAuth();
  const { status } = useSession();
  const {
    register,
    handleSubmit,
    control,
    formState: {},
    watch,
  } = useForm<UseFormTimePointsProps>({
    defaultValues: {
      entryOne: "",
      entryTwo: "",
      exitOne: "",
      exitTwo: "",
    },
  });
  const [dateSelected, setDateSelected] = useState<Date | undefined>(
    new Date()
  );

  function onSubmit(data: UseFormTimePointsProps) {
    const { entryOne, entryTwo, exitOne, exitTwo } = data;

    const formatDate = {
      entryOne,
      exitOne,
      entryTwo,
      exitTwo,
    };

    console.log("formatDate", formatDate);
  }

  //   const disabledDays = dataTable.map((item) =>
  //     !item.selectedDateString ? [] : new Date(item.selectedDateString)
  //   ); [new Date(), new Date()]
  return (
    <div
      className={`w-[400px] flex flex-col items-center bg-zinc-800 rounded relative ${
        !existDataUserInfo && "opacity-40"
      }`}
    >
      <DayPicker
        locale={ptBr}
        mode="single"
        selected={dateSelected}
        onSelect={(date) => setDateSelected(date)}
        disabled={[{ dayOfWeek: [0, 6] }]}
        modifiers={{
          available: { dayOfWeek: [1, 2, 3, 4, 5] },
        }}
        captionLayout="dropdown"
        modifiersStyles={{
          disabled: { fontSize: "75%", cursor: "not-allowed", opacity: 0.4 },
        }}
        footer={dateSelected ? "" : "Selecione uma data"}
      />

      <form
        className="w-full px-4 flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex items-center gap-4 justify-center w-full">
          <div className="flex flex-col">
            <label htmlFor="entryOne" className="text-md font-bold">
              Entrada 1:
            </label>
            <InputTime id="entryOne" nameInput="entryOne" register={register} />
          </div>
          <div className="flex flex-col">
            <label htmlFor="exitOne" className="text-md font-bold">
              Saída 1:
            </label>
            <InputTime id="exitOne" nameInput="exitOne" register={register} />
          </div>
        </div>
        <div className="flex items-center gap-4 justify-center w-full">
          <div className="flex flex-col">
            <label htmlFor="entryTwo" className="text-md font-bold">
              Entrada 2:
            </label>
            <InputTime id="entryTwo" nameInput="entryTwo" register={register} />
          </div>
          <div className="flex flex-col">
            <label htmlFor="exitTwo" className="text-md font-bold">
              Saída 2:
            </label>
            <InputTime id="exitTwo" nameInput="exitTwo" register={register} />
          </div>
        </div>
      </form>
      <div className="w-full px-4">
        <Button
          disabled={existDataUserInfo}
          classNameStyle="w-full mt-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-green-800"
          type="submit"
        >
          Enviar
        </Button>
      </div>
    </div>
  );
}
