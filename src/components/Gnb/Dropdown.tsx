import { Fragment, useState } from "react";

import { Menu, Switch, Transition } from "@headlessui/react";

import { HumanSvg } from "@components/Gnb/humanSvg";

export const Dropdown = () => {
  const [enabled, setEnabled] = useState(false);

  return (
    <Menu as="div" className="relative inline-block text-left">
      {({ open }) => (
        <>
          <Menu.Button
            className={`${
              open && "bg-gray-100"
            } inline-flex w-full items-center justify-center h-[44px] gap-[9px] px-[12px] text-[16px] font-bold rounded hover:bg-gray-100 duration-300`}
          >
            <HumanSvg />
            닉네임
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
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
              className="absolute right-0 mt-2 w-[220px] divide-y divide-gray-200 border-[1px] border-gray-600 rounded-lg bg-gray-50 shadow-md"
            >
              <div className="dropdown-menu">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setEnabled(!enabled);
                      }}
                      className={`${
                        active ? "bg-gray-200" : "text-gray-900"
                      } flex w-full justify-between items-center rounded-md p-[7px] text-[16px]`}
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
                    </button>
                  )}
                </Menu.Item>
              </div>

              <div className="dropdown-menu">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                      className={`${
                        active ? "bg-gray-200" : "text-gray-900"
                      } flex w-full justify-between items-center rounded-md p-[7px] text-[16px]`}
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
