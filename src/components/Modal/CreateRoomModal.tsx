import { Fragment, useContext } from "react";
import React from "react";

import { useNavigate } from "react-router-dom";

import { Dialog, Transition } from "@headlessui/react";
import { useAtom, useAtomValue } from "jotai";

import { CreateRoomRes } from "@typings/WebsocketMessage.type";

import { WebSocketContext } from "@components/Websocket/WebsocketProvider";

import { CreateRoomModalAtom } from "@stores/ModalStore";
import { UserAtom, User_Dummy } from "@stores/UserStore";

export const CreateRoomModal = () => {
  const user = useAtomValue(UserAtom);
  const [isVisibleCreateRoomModal, setIsVisibleCreateRoomModal] =
    useAtom(CreateRoomModalAtom);
  const { isReady, subscribe, sendRequest, unsubscribe } =
    useContext(WebSocketContext);
  const navigate = useNavigate();
  const [userList, setUserList] = React.useState<number[]>([]);
  const [title, setTitle] = React.useState<string>("");

  const handleConfirm = () => {
    if (isReady) {
      sendRequest({
        type: "CREATE_ROOM_REQUEST",
        data: {
          name: title || "임시 방",
          participants: [user.id, ...userList],
        },
      });

      subscribe({
        type: "system",
        channel: "CREATE_ROOM_RESPONSE",
        callbackFn: (data) => {
          sendRequest({
            type: "GET_ROOMS_REQUEST",
          });
          navigate(`room/${(data as CreateRoomRes["data"]).roomId}`);
        },
      });
      setIsVisibleCreateRoomModal(false);
    }

    return () => {
      unsubscribe({ type: "system", channel: "CREATE_ROOM_RESPONSE" });
    };
  };

  const handleCancel = () => {
    setIsVisibleCreateRoomModal(false);
  };

  React.useEffect(() => {
    setTitle("");
    setUserList([]);
  }, [isVisibleCreateRoomModal]);

  return (
    <>
      <Transition appear show={isVisibleCreateRoomModal} as={Fragment}>
        <Dialog as="div" className="relative z-[90]" onClose={handleCancel}>
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
                    채팅방 생성
                  </Dialog.Title>
                  <div className="mt-4">
                    <input
                      className="border-[1px] w-full h-full p-4 text-xl"
                      placeholder="방 제목을 입력하세요."
                      value={title}
                      onChange={(e) => {
                        setTitle(e.target.value);
                      }}
                    />
                  </div>
                  <div className="mt-3">
                    <p className="mb-2 p-3 text-gray-500">유저 목록</p>
                    <div className="h-60 overflow-y-auto">
                      {User_Dummy.filter((v) => v.id !== user.id).map((v) => (
                        <div
                          key={v.id}
                          onClick={() => {
                            if (userList.includes(v.id)) {
                              const idx = userList.findIndex((u) => u === v.id);
                              const checkedUserList = [...userList];
                              checkedUserList.splice(idx, 1);
                              setUserList(checkedUserList);
                            } else {
                              setUserList((prev) => [...prev, v.id]);
                            }
                          }}
                          className={`px-3 py-5 text-xl hover:bg-gray-300 cursor-pointer ${
                            userList.includes(v.id) && "bg-slate-200"
                          }`}
                        >
                          {v.name}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-center mt-10 gap-4">
                    <button
                      type="button"
                      className="w-full inline-flex justify-center items-center rounded-md border border-gray-400 bg-transparent px-4 py-2 text-[14px] font-medium text-gray-900 hover:bg-gray-200 focus:outline-none"
                      onClick={handleCancel}
                    >
                      취소
                    </button>
                    <button
                      type="button"
                      className="w-full inline-flex justify-center items-center rounded-md border border-transparent bg-green-500 px-4 py-2 text-[14px] font-medium text-white hover:bg-green-400 focus:outline-none"
                      onClick={handleConfirm}
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
