import { Fragment } from "react";

import { Menu, Transition } from "@headlessui/react";

import { EllipsisVerticalSvg } from "@assets/EllipsisVerticalSvg";

export const Dropdown = () => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <>
        <Menu.Button className="inline-flex justify-center items-center rounded-[4px] w-[24px] h-[24px] cursor-pointer hover:bg-gray-200 hover:transition-colors hover:duration-500">
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
            className="absolute right-0 mt-5 p-[10px] w-[200px] border-[1px] border-gray-600 rounded-lg bg-gray-50"
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
                  className="chatting-detail-dropdown-button hover:bg-gray-200 mt-[4px]"
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
                  }}
                  className="chatting-detail-dropdown-button hover:bg-gray-200 mt-[4px]"
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
