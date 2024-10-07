import { useGetImages } from "@apis/Room/useGetImages";

import { QueryWrapper } from "@components/QueryWrapper";

import { FileCard } from "./FileCard";

type FileTabProps = {
  roomId: string;
};

export const FileTab = ({ roomId }: FileTabProps) => {
  const query = useGetImages({ roomId, page: 0, messageType: "FILE" });

  return (
    <QueryWrapper query={query}>
      {(data) => (
        <>
          {data.contents.length === 0 ? (
            <div className="flex h-full items-center justify-center">
              <p className="text-gray-500">파일이 없습니다.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-2">
              {data.contents.flatMap((message) =>
                message.files.map((file) => (
                  <FileCard key={file.url} file={file} />
                ))
              )}
            </div>
          )}
        </>
      )}
    </QueryWrapper>
  );
};
