import * as Dialog from "@radix-ui/react-dialog";
import { X } from "phosphor-react";
import { ReactNode } from "react";
import { Button } from "./Button";

interface ModalProps {
  open: boolean;
  title: string;
  titleButton: string | ReactNode;
  children: ReactNode;
  handleOpenModal: (open: boolean) => void;
}

export function Modal({
  open,
  titleButton,
  title,
  children,
  handleOpenModal,
}: ModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={handleOpenModal}>
      <Dialog.Trigger asChild>
        <Button type="button" classNameStyle="px-2">
          {titleButton}
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black opacity-50 inset-0 fixed z-20 " />
        <Dialog.Content className="fixed z-30 rounded p-4 bg-zinc-700 shadow-md shadow-zinc-700 top-[50%] left-[50%] w-[400px] min-h-[300px] -translate-y-1/2 -translate-x-1/2  flex flex-col justify-center items-center animateModal">
          <Dialog.DialogClose className="absolute right-2 top-2">
            <X size={28} />
          </Dialog.DialogClose>
          <Dialog.Title className="text-xl my-2 uppercase text-zinc-300">
            {title}
          </Dialog.Title>
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
