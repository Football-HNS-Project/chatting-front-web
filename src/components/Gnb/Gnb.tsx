import { useLocation } from "react-router-dom";

import { useSetAtom } from "jotai";

import { Logo } from "@assets/Logo";
import { MenuSvg } from "@assets/Svg/MenuSvg";
import { SearchSvg } from "@assets/Svg/SearchSvg";

import { Dropdown } from "@components/Gnb/Dropdown";
import { GNB_MENU } from "@components/Gnb/GNB_MENU";

import { UserAtom, User_Dummy } from "@stores/UserStore";

export const Gnb: React.FC = () => {
  const { pathname } = useLocation();

  const isChattingPage = pathname.includes("chatting");

  const setUser = useSetAtom(UserAtom);

  return (
    <div
      className={`fixed left-0 top-0 z-[50] h-[64px] w-full bg-white ${
        isChattingPage && "border-b-[1px] border-gray-200"
      }`}
    >
      <div className="mx-auto my-0 flex h-full max-w-[120rem] flex-row items-center justify-between px-[2rem] py-[1.2rem]">
        <a className="mr-[3.6rem] items-center" href="/">
          <Logo />
        </a>

        {!isChattingPage && (
          <nav className="hidden w-full flex-row pr-[4rem] md:flex">
            <ul className="inline-block list-none font-bold">
              {GNB_MENU.map((menu) => (
                <li key={menu.label} className=" inline-block">
                  <a className="mr-[3rem] text-[1.8rem]" href={menu.href}>
                    {menu.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}

        {!isChattingPage ? (
          <div className="flex flex-row items-center justify-center gap-[1.2rem]">
            <button className="lg:hidden">
              <SearchSvg />
            </button>
            <form className="hidden lg:block">
              <input
                type="search"
                placeholder="물품이나 동네를 검색해보세요"
                className="h-[4rem] w-[28.8rem] rounded-md bg-gray-100 px-[1.2rem] py-[0.9rem] text-[1.6rem]"
              />
            </form>
            <button className="md:hidden">
              <MenuSvg />
            </button>
            <a
              href="/chatting"
              className="hidden w-fit whitespace-nowrap rounded-md border-[1px] border-gray-400 px-[1.6rem] py-[0.8rem] text-[1.6rem] font-bold hover:bg-gray-100 hover:opacity-[0.7] md:block"
            >
              채팅하기
            </a>
          </div>
        ) : (
          <>
            <div className="flex gap-5">
              {User_Dummy.map((v) => (
                <button
                  key={v.id}
                  onClick={() => {
                    setUser({ id: v.id, name: v.name });
                  }}
                >
                  {v.name}
                </button>
              ))}
            </div>
            <Dropdown />
          </>
        )}
      </div>
    </div>
  );
};
