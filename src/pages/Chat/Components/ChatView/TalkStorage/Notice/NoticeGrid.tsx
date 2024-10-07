import { useGetImages } from "@apis/Room/useGetImages";

import { QueryWrapper } from "@components/QueryWrapper";

import { NoticeCard } from "./NoticeCard";

type NoticeGridProps = {
  roomId: string;
};

export const NoticeGrid = ({ roomId }: NoticeGridProps) => {
  const query = useGetImages({ roomId, page: 0, messageType: "NOTICE" });

  return (
    <QueryWrapper query={query}>
      {(data) => (
        <>
          {data.contents.length === 0 ? (
            <div className="flex h-full items-center justify-center">
              <p className="text-gray-500">공지사항이 없습니다.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
              {data.contents.flatMap((message) =>
                message.files.map((file) => (
                  <div
                    key={file.url}
                    className="relative aspect-square overflow-hidden rounded-md shadow-md transition-shadow hover:shadow-lg"
                  >
                    <NoticeCard
                      src={file.url}
                      alt={file.name}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-300 hover:scale-110"
                    />
                    <div className="absolute bottom-0 left-0 right-0 truncate bg-black bg-opacity-50 p-1 text-sm text-white">
                      {file.name}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </>
      )}
    </QueryWrapper>
  );
};
