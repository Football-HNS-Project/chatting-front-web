import React from "react";

import { NavigateFunction } from "react-router-dom";

import { useAtom } from "jotai";

import { useCreateRoom } from "@apis/Room/useCreateRoom";

// import { CreateRoomModalAtom } from "@stores/ModalStore";

// import { UserAtom, User_Dummy } from "@stores/UserStore";

type CreateRoomModalProps = {
  navigate: NavigateFunction;
  closeModal: () => void;
};

export const CreateRoomModal = ({
  navigate,
  closeModal,
}: CreateRoomModalProps) => {
  // const user = useAtomValue(UserAtom);
  // const [isVisibleCreateRoomModal, setIsVisibleCreateRoomModal] =
  //   useAtom(CreateRoomModalAtom);

  const [userList, setUserList] = React.useState<number[]>([]);
  const [title, setTitle] = React.useState<string>("");
  const { mutate } = useCreateRoom();

  // const handleConfirm = () => {
  //   mutate(
  //     { name: title, participants: userList },
  //     {
  //       onSuccess: (res) => {
  //         setIsVisibleCreateRoomModal(false);
  //         navigate(`/chatting${res.headers.location}`);
  //       },
  //     }
  //   );
  // };

  // const handleCancel = () => {
  //   setIsVisibleCreateRoomModal(false);
  // };

  // React.useEffect(() => {
  //   setTitle("");
  //   setUserList([]);
  // }, [isVisibleCreateRoomModal]);

  return (
    <div className="flex h-[600px] w-[400px] flex-col items-center justify-between rounded-lg bg-white p-5 shadow-2xl">
      <h2 className="mb-4 text-xl font-bold text-gray-800">채팅방 생성</h2>

      <div className="">
        <input
          className="h-full w-full border-[1px] p-4 text-xl"
          placeholder="유저 이름 검색"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      </div>
      {/* <div className="flex min-h-full items-center justify-center p-4 text-center">
        <div className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-10 text-left align-middle shadow-xl transition-all">
          <div className="mt-4">
            <input
              className="h-full w-full border-[1px] p-4 text-xl"
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
                          className={`cursor-pointer px-3 py-5 text-xl hover:bg-gray-300 ${
                            userList.includes(v.id) && "bg-slate-200"
                          }`}
                        >
                          {v.name}
                        </div>
                      ))}
            </div>
          </div>

          <div className="mt-10 flex justify-center gap-4">
            <button
              type="button"
              className="inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-transparent px-4 py-2 text-[14px] font-medium text-gray-900 hover:bg-gray-200 focus:outline-none"
              onClick={handleCancel}
            >
              취소
            </button>
            <button
              type="button"
              className="inline-flex w-full items-center justify-center rounded-md border border-transparent bg-green-500 px-4 py-2 text-[14px] font-medium text-white hover:bg-green-400 focus:outline-none"
              onClick={handleConfirm}
            >
              확인
            </button>
          </div>
        </div>
      </div> */}
    </div>
  );
};
