import { useGetImages } from "@apis/Room/useGetImages";

import { QueryWrapper } from "@components/QueryWrapper";

import { VideoCard } from "./VideoCard";

type VideoTabProps = {
  roomId: string;
};

export const VideoTab = ({ roomId }: VideoTabProps) => {
  const query = useGetImages({ roomId, page: 0, messageType: "VIDEO" });

  return (
    <QueryWrapper query={query}>
      {(data) => (
        <>
          {data.contents.length === 0 ? (
            <div className="flex h-full items-center justify-center">
              <p className="text-gray-500">동영상이 없습니다.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
              {data.contents.flatMap((message) =>
                message.files.map((file) => (
                  <div
                    key={file.url}
                    className="relative aspect-square overflow-hidden rounded-md shadow-md transition-shadow hover:shadow-lg"
                  >
                    <VideoCard
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
