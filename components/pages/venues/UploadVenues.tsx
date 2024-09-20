import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Venues } from "@/utils/types";
import UploadVenueForm from "./UploadVenueForm";

const UploadVenues = ({
  open,
  setOpen,
  editValue,
}: {
  open: boolean;
  setOpen: (data: boolean) => void;
  editValue?: Venues | null;
}) => {
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle className="text-center mt-3">
            {editValue ? "ویرایش محل اجرا" : "ایجاد محل اجرا"}
          </SheetTitle>
        </SheetHeader>
        <UploadVenueForm editValue={editValue} open={open} setOpen={setOpen} />
      </SheetContent>
    </Sheet>
  );
};

export default UploadVenues;
