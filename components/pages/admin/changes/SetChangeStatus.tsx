import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useChangesStore } from "@/service/store/useChangesStore";
import { CircleCheck, CircleX } from "lucide-react";
import React from "react";
import { toast } from "sonner";

const SetChangeStatus = ({ requestID }: { requestID: number }) => {
  const { approveChange, declineChange } = useChangesStore();
  const handleApproveRequest = async () => {
    toast.promise(
      async () => {
        try {
          await approveChange(requestID);
        } catch (error) {
          throw error;
        }
      },
      {
        loading: "پذیرفتن درخواست ...",
        success: "درخواست با موفقیت تایید شد",
        error: "خطا در تایید درخواست",
      }
    );
  };
  const handleDeclineRequest = async () => {
    toast.promise(
      async () => {
        try {
          await declineChange(requestID);
        } catch (error) {
          throw error;
        }
      },
      {
        loading: "رد درخواست ...",
        success: "درخواست با موفقیت رد شد",
        error: "خطا در رد درخواست",
      }
    );
  };
  return (
    <div className="flex gap-1">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="default" size="sm" className="h-7">
            <CircleCheck className="w-4 h-4 ml-1" />
            <span className="text-xs">پذیرفتن</span>
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-start">
              آیا از پذیرفتن درخواست اطمینان دارید؟
            </AlertDialogTitle>
            <AlertDialogDescription className="text-start">
              در صورت پذیرفتن کلیه تغییرات روی نمایش مورد نظر اعمال می شود
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="md:gap-2">
            <AlertDialogCancel>لغو</AlertDialogCancel>
            <AlertDialogAction onClick={handleApproveRequest}>
              پذیرفتن
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" size="sm" className="h-7">
            <CircleX className="w-4 h-4 ml-1" />
            رد کردن
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-start">
              آیا از رد درخواست اطمینان دارید؟
            </AlertDialogTitle>
            <AlertDialogDescription className="text-start">
              در صورت رد کردن، نمایش هیچ تغییری نمیکند
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="md:gap-2">
            <AlertDialogCancel>لغو</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeclineRequest}
              className="bg-red-400 hover:bg-red-500"
            >
              رد درخواست
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default SetChangeStatus;
