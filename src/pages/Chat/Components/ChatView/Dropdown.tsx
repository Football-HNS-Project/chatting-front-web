import { Fragment } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { Menu, Transition } from "@headlessui/react";

import { EllipsisVerticalSvg } from "@assets/Svg/EllipsisVerticalSvg";

import { useOutRoom } from "@apis/Room/useOutRoom";

export const Dropdown = () => {
  const { mutate } = useOutRoom();
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <Menu as="div" className="relative inline-block text-left">
      <>
        <Menu.Button className="inline-flex h-[24px] w-[24px] cursor-pointer items-center justify-center rounded-[4px] hover:bg-gray-200 hover:transition-colors hover:duration-500">
          <EllipsisVerticalSvg />
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items
            static
            className="absolute right-0 mt-5 w-[200px] rounded-lg border-[1px] border-gray-600 bg-gray-50 p-[10px]"
          >
            <div className="chatting-detail-dropdown-menu">
              <Menu.Item>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                  className="chatting-detail-dropdown-button hover:bg-gray-200"
                >
                  알림음 끄기
                </button>
              </Menu.Item>
            </div>

            <div className="chatting-detail-dropdown-menu">
              <Menu.Item>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                  className="chatting-detail-dropdown-button mt-[4px] hover:bg-gray-200"
                >
                  대화상대 차단하기
                </button>
              </Menu.Item>
            </div>

            <div className="chatting-detail-dropdown-menu">
              <Menu.Item>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    mutate(
                      {
                        roomId: String(id),
                      },
                      {
                        onSuccess: () => {
                          navigate("/chatting");
                        },
                      }
                    );
                  }}
                  className="chatting-detail-dropdown-button mt-[4px] hover:bg-gray-200"
                >
                  채팅방 나가기
                </button>
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </>
    </Menu>
  );
};
