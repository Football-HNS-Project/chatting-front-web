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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@components/ui";

import { FileTab } from "./FileTab";
import { ImageTab } from "./ImageTab";
import { NoticeTab } from "./NoticeTab";
import { VideoTab } from "./VideoTab";

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
      <DrawerContent
        position="right"
        className="flex h-full w-[500px] flex-col"
      >
        <div className="border-b">
          <DrawerHeader className="p-4">
            <DrawerTitle>톡서랍</DrawerTitle>
            <DrawerDescription>대화방의 콘텐츠를 모아봅니다.</DrawerDescription>
          </DrawerHeader>
        </div>

        <Tabs
          defaultValue="images"
          className="flex flex-grow flex-col overflow-hidden"
        >
          <TabsList className="w-full justify-between">
            <TabsTrigger value="images">사진</TabsTrigger>
            <TabsTrigger value="videos">동영상</TabsTrigger>
            <TabsTrigger value="files">파일</TabsTrigger>
            <TabsTrigger value="notices">공지사항</TabsTrigger>
          </TabsList>

          <TabsContent value="images" className="h-full overflow-auto p-2">
            <ImageTab roomId={roomId ?? ""} />
          </TabsContent>
          <TabsContent value="videos" className="h-full overflow-auto p-2">
            <VideoTab roomId={roomId ?? ""} />
          </TabsContent>
          <TabsContent value="files" className="h-full overflow-auto p-2">
            <FileTab roomId={roomId ?? ""} />
          </TabsContent>
          <TabsContent value="notices" className="h-full overflow-auto p-2">
            <NoticeTab roomId={roomId ?? ""} />
          </TabsContent>
        </Tabs>

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
