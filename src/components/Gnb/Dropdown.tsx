import { Fragment, useState } from "react";

import { Menu, Switch, Transition } from "@headlessui/react";
import { useAtomValue, useSetAtom } from "jotai";

import { CreateRoomModalAtom, LogoutModalAtom } from "@stores/ModalStore";
import { UserAtom } from "@stores/UserStore";

export const Dropdown = () => {
  const [enabled, setEnabled] = useState(false);
  const setIsVisibleLogoutModal = useSetAtom(LogoutModalAtom);
  const setIsVisibleCreateRoomModal = useSetAtom(CreateRoomModalAtom);
  const user = useAtomValue(UserAtom);

  return (
    <Menu as="div" className="relative inline-block text-left">
      {({ open }) => (
        <>
          <Menu.Button
            className={`${
              open && "bg-gray-100"
            } inline-flex h-[44px] w-full items-center justify-center gap-[9px] rounded px-[12px] text-[16px] font-bold duration-300 hover:bg-gray-100`}
          >
            <img
              width={32}
              height={32}
              className="image-divider rounded-full border-[1px]"
              src="/src/assets/Profile.png"
            />
            {user.name}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-6 w-6"
            >
              <path
                fillRule="evenodd"
                d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z"
                clipRule="evenodd"
              />
            </svg>
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
              className="absolute right-0 mt-2 w-[220px] divide-y divide-gray-200 rounded-lg border-[1px] border-gray-600 bg-gray-50 shadow-md"
            >
              <div className="dropdown-menu">
                <Menu.Item>
                  {({ active }) => (
                    <div
                      onClick={(e) => {
                        e.preventDefault();
                        setEnabled(!enabled);
                      }}
                      className={`${
                        active ? "bg-gray-200" : "text-gray-900"
                      } flex w-full cursor-pointer items-center justify-between rounded-md p-[7px] text-[16px]`}
                    >
                      채팅 알림
                      <Switch
                        checked={enabled}
                        onChange={setEnabled}
                        className={`${
                          enabled ? "bg-orange-500" : "bg-gray-500"
                        } relative inline-flex h-[18px] w-[30px] items-center rounded-full`}
                      >
                        <span className="sr-only">Enable notifications</span>
                        <span
                          className={`${
                            enabled ? "translate-x-6" : "translate-x-1"
                          } inline-block h-[14px] w-[14px] transform rounded-full bg-white transition`}
                        />
                      </Switch>
                    </div>
                  )}
                </Menu.Item>
              </div>

              <div className="dropdown-menu">
                <Menu.Item>
                  {({ active }) => (
                    <div
                      onClick={() => {
                        setIsVisibleCreateRoomModal(true);
                      }}
                      className={`${
                        active ? "bg-gray-200" : "text-gray-900"
                      } flex w-full cursor-pointer items-center justify-between rounded-md p-[7px] text-[16px]`}
                    >
                      채팅방 생성
                    </div>
                  )}
                </Menu.Item>
              </div>

              <div className="dropdown-menu">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => {
                        setIsVisibleLogoutModal(true);
                      }}
                      className={`${
                        active ? "bg-gray-200" : "text-gray-900"
                      } flex w-full items-center justify-between rounded-md p-[7px] text-[16px]`}
                    >
                      로그아웃
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
};
