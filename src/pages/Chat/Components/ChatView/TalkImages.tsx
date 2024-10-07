import React from "react";

import { useGetImages } from "@apis/Room/useGetImages";

import { QueryWrapper } from "@components/QueryWrapper";

import { Image } from "./Image";

type TalkImagesProps = {
  roomId: string;
};

export const TalkImages = ({ roomId }: TalkImagesProps) => {
  const query = useGetImages({ roomId, page: 0 });

  return (
    <QueryWrapper query={query}>
      {(data) => (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {data.contents &&
            Object.entries(data.contents[0].messagesByDate).map(
              ([date, messages]) => (
                <React.Fragment key={date}>
                  {messages.map((message) =>
                    message.files.map((file) => (
                      <div
                        key={file.id}
                        className="relative aspect-square overflow-hidden rounded-lg shadow-md transition-shadow hover:shadow-lg"
                      >
                        <Image
                          src={file.url}
                          alt={file.name}
                          layout="fill"
                          objectFit="cover"
                          className="transition-transform duration-300 hover:scale-110"
                        />
                        <div className="absolute bottom-0 left-0 right-0 truncate bg-black bg-opacity-50 p-2 text-sm text-white">
                          {file.name}
                        </div>
                      </div>
                    ))
                  )}
                </React.Fragment>
              )
            )}
        </div>
      )}
    </QueryWrapper>
  );
};
