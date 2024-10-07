import { useGetImages } from "@apis/Room/useGetImages";

import { QueryWrapper } from "@components/QueryWrapper";

import { TalkImage } from "./TalkImage";

type TalkImagesProps = {
  roomId: string;
};

export const TalkImages = ({ roomId }: TalkImagesProps) => {
  const query = useGetImages({ roomId, page: 0, messageType: "IMAGE" });

  return (
    <QueryWrapper query={query}>
      {(data) => (
        <div className="h-full overflow-auto p-2">
          {data.contents.length === 0 ? (
            <div className="flex h-full items-center justify-center">
              <p className="text-gray-500">이미지가 없습니다.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
              {data.contents.flatMap((message) =>
                message.files.map((file) => (
                  <div
                    key={file.id}
                    className="relative aspect-square overflow-hidden rounded-md shadow-md transition-shadow hover:shadow-lg"
                  >
                    <TalkImage
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
        </div>
      )}
    </QueryWrapper>
  );
};
