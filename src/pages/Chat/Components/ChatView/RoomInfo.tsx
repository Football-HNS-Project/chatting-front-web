import { useState } from "react";

import { useParams } from "react-router-dom";

import { Archive, X } from "lucide-react";

import LOGO from "@assets/chat-logo.png";

import { useGetRoomInfo } from "@apis/Room/useGetRoomInfo";

import { QueryWrapper } from "@components/QueryWrapper";
import {
  Button,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@components/ui";

import { TalkImages } from "./TalkImages";
import { UsersInRoom } from "./UsersInRoom";

export const RoomInfo = () => {
  const { id } = useParams<{ id: string }>();
  const query = useGetRoomInfo({ roomId: id ?? "" });
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <QueryWrapper query={query}>
      {(data) => (
        <>
          <div className="chatting-divider flex min-h-[64px] items-center justify-between border-b-[1px] px-[20px]">
            <div className="flex w-full items-center gap-[12px]">
              <img width={40} src={LOGO} alt="logo" />
              <div className="flex w-full items-center justify-between pr-6">
                <div className="w-[600px] overflow-hidden text-ellipsis whitespace-nowrap">
                  <span className="text-[16px] font-semibold">{data.name}</span>
                </div>

                <div className="flex flex-row">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsDrawerOpen(true)}
                  >
                    <Archive className="h-5 w-5" />
                  </Button>
                  <UsersInRoom memberSize={data.memberSize} />
                </div>
              </div>
            </div>
          </div>

          <Drawer
            direction="right"
            open={isDrawerOpen}
            onOpenChange={setIsDrawerOpen}
          >
            <DrawerContent position="right" className="flex h-full flex-col">
              <div className="flex-shrink-0 border-b p-4">
                <DrawerHeader>
                  <DrawerTitle>톡서랍</DrawerTitle>
                </DrawerHeader>
              </div>
              <div className="flex-grow overflow-y-auto p-4">
                <TalkImages roomId={id || ""} />
              </div>
              {isDrawerOpen && (
                <DrawerClose asChild className="absolute -left-12 top-2">
                  <Button variant="secondary" size="icon">
                    <X className="h-5 w-5" />
                  </Button>
                </DrawerClose>
              )}
            </DrawerContent>
          </Drawer>
        </>
      )}
    </QueryWrapper>
  );
};
