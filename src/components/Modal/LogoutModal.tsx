import { Fragment } from "react";

import { Dialog, Transition } from "@headlessui/react";

type ModalProps = {
  setIsOpen: (status: boolean) => void;
  isOpen: boolean;
};

export const LogoutModal = ({ isOpen, setIsOpen }: ModalProps) => {
  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-[90]" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/40" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-10 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title className="text-[20px] font-bold text-gray-900">
                    로그아웃
                  </Dialog.Title>
                  <div className="mt-4">
                    <p className="text-[14px] leading-8 text-gray-800 ">
                      로그아웃을 하시면 다시 인증을 하셔야 합니다. 정말
                      로그아웃을 하시겠습니까?
                    </p>
                  </div>

                  <div className="mt-10 flex justify-center gap-4">
                    <button
                      type="button"
                      className="inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-transparent px-4 py-2 text-[14px] font-medium text-gray-900 hover:bg-gray-200 focus:outline-none"
                      onClick={closeModal}
                    >
                      취소
                    </button>
                    <button
                      type="button"
                      className="inline-flex w-full items-center justify-center rounded-md border border-transparent bg-green-500 px-4 py-2 text-[14px] font-medium text-white hover:bg-green-400 focus:outline-none"
                      onClick={closeModal}
                    >
                      확인
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
