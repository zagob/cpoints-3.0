import { PencilSimple, UserList } from "phosphor-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../../hooks/useAuth";
import { Button } from "../Button";
import { InputTime } from "../InputTime";
import { Modal } from "../Modal";
import { VerifyTimeOrder } from "../../utils/verifyTimeOrder";
import toast, { Toaster } from "react-hot-toast";

const userInfoSchema = z.object({
  entryOne: z.string().min(4),
  exitOne: z.string().min(4),
  entryTwo: z.string().min(4),
  exitTwo: z.string().min(4),
  totalHour: z.string().optional(),
});

type UserInfo = z.infer<typeof userInfoSchema>;

export function ModalUserInfo() {
  const [modalUserInfo, setModalUserInfo] = useState(false);
  const {
    userInfo,
    handleCreateUserInfo,
    handleUpdateUserInfo,
    existDataUserInfo,
  } = useAuth();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<UserInfo>({
    resolver: zodResolver(userInfoSchema),
  });

  console.log("errors", errors);

  async function onSubmitDataUserInfo(data: UserInfo) {
    const { entryOne, entryTwo, exitOne, exitTwo, totalHour } = data;

    const formatData = {
      startHour: entryOne,
      entryLunchHour: exitOne,
      exitLunchHour: entryTwo,
      exitHour: exitTwo,
      totalHour: totalHour!,
    };

    const isAcceptTimes = VerifyTimeOrder({
      entryOne,
      entryTwo,
      exitOne,
      exitTwo,
    });

    if (!isAcceptTimes) {
      return toast.error("Tempos não correspondende");
    }

    try {
      existDataUserInfo
        ? await handleUpdateUserInfo(formatData)
        : await handleCreateUserInfo(formatData);

      toast.success("Informações cadastradas com sucesso!");
    } catch (err) {
      toast.error("Erro ao cadastrar informações");
    } finally {
      setModalUserInfo(false);
    }
  }

  useEffect(() => {
    if (userInfo) {
      setValue("entryOne", userInfo.startHour);
      setValue("exitOne", userInfo.entryLunchHour);
      setValue("entryTwo", userInfo.exitLunchHour);
      setValue("exitTwo", userInfo.exitHour);
      setValue("totalHour", userInfo.totalHour);
    }
  }, [userInfo, modalUserInfo]);

  return (
    <Modal
      titleButton={
        !existDataUserInfo ? (
          <div className="flex items-center gap-1">
            <span>Adicionar Informações do usuário</span>
            <UserList size={20} />
          </div>
        ) : (
          <PencilSimple />
        )
      }
      title="User Info"
      open={modalUserInfo}
      handleOpenModal={(open) =>
        open ? setModalUserInfo(true) : setModalUserInfo(false)
      }
    >
      <form
        onSubmit={handleSubmit(onSubmitDataUserInfo)}
        className="w-full h-full flex items-center flex-col gap-4"
      >
        <div className="flex items-center justify-center gap-4">
          <div className="flex flex-col">
            <label htmlFor="entryOne" className="text-xl">
              Entrada 1:
            </label>
            <InputTime
              defaultValue={userInfo ? userInfo?.startHour : "-- : --"}
              id="entryOne"
              register={register}
              nameInput="entryOne"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="exitOne" className="text-xl">
              Saída 1:
            </label>
            <InputTime id="exitOne" register={register} nameInput="exitOne" />
          </div>
        </div>

        <div className="flex items-center justify-center gap-4">
          <div className="flex flex-col">
            <label htmlFor="entryTwo" className="text-xl">
              Entrada 2:
            </label>
            <InputTime id="entryTwo" register={register} nameInput="entryTwo" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="exitTwo" className="text-xl">
              Saída 2:
            </label>
            <InputTime id="exitTwo" register={register} nameInput="exitTwo" />
          </div>
        </div>

        <div className="flex flex-col">
          <label htmlFor="totalHour" className="text-xl">
            Total Horas:
          </label>
          <InputTime id="totalHour" register={register} nameInput="totalHour" />
        </div>

        <div className="flex justify-center w-full">
          <Button
            disabled={
              watch("entryOne") === "" ||
              watch("entryTwo") === "" ||
              watch("exitOne") === "" ||
              watch("exitTwo") === "" ||
              watch("totalHour") === ""
            }
            type="submit"
            classNameStyle="w-full font-bold"
          >
            {existDataUserInfo ? "Atualizar" : "Adicionar"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
