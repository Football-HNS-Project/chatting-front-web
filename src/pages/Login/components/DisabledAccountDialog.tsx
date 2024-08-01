import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { Ban } from "lucide-react";

import { Button, DialogContent } from "@components/ui";

export const DisabledAccountDialog = () => {
  return (
    <DialogContent className="flex w-[400px] flex-col items-center p-6 text-center">
      <DialogTitle className="mb-4 text-2xl font-bold">계정 정지</DialogTitle>
      <div className="mb-4 rounded-full bg-red-100 p-4">
        <Ban size={48} className="text-red-500" />
      </div>
      <DialogDescription className="mb-6">
        <p className="mb-2 text-lg font-semibold">
          사용자 계정이 정지되었습니다.
        </p>
        <p className="text-gray-600">자세한 내용은 관리자에게 문의해 주세요.</p>
      </DialogDescription>
      <Button variant="outline" onClick={() => window.location.reload()}>
        확인
      </Button>
    </DialogContent>
  );
};
