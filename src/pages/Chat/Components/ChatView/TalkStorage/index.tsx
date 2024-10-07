import { useParams } from "react-router-dom";

import { X } from "lucide-react";

import {
  Button,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@components/ui";

import { TalkImages } from "./TalkImages";

type TalkStorageProps = {
  isDrawerOpen: boolean;
  setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const TalkStorage = ({
  isDrawerOpen,
  setIsDrawerOpen,
}: TalkStorageProps) => {
  const { id: roomId } = useParams<{ id: string }>();

  return (
    <Drawer
      direction="right"
      open={isDrawerOpen}
      onOpenChange={setIsDrawerOpen}
    >
      <DrawerContent position="right" className="flex h-full flex-col">
        <div className="border-b">
          <DrawerHeader className="p-4">
            <DrawerTitle>톡서랍</DrawerTitle>
            <DrawerDescription>사진을 모아봅니다.</DrawerDescription>
          </DrawerHeader>
        </div>

        <TalkImages roomId={roomId ?? ""} />

        {isDrawerOpen && (
          <DrawerClose asChild className="absolute -left-12 top-2">
            <Button variant="secondary" size="icon">
              <X className="h-5 w-5" />
            </Button>
          </DrawerClose>
        )}
      </DrawerContent>
    </Drawer>
  );
};
