import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { Media } from "@/utils/types";
import MediaDetailBody from "./MediaDetailBody";
import MediaDetailFooter from "./MediaDetailFooter";

const MediaDetailModal = ({
  isOpen,
  onOpenChange,
  selectedImage,
  setOpenDeleteModal,
  mode,
}: {
  isOpen: boolean;
  onOpenChange: any;
  selectedImage: Media;
  setOpenDeleteModal: (bool: boolean) => void;
  mode: "view" | "edit";
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="p-6 max-w-full">
        <>
          <MediaDetailBody mode={mode} selectedImage={selectedImage} />
          <DialogFooter>
            <MediaDetailFooter
              mode={mode}
              selectedImage={selectedImage}
              setOpenDeleteModal={setOpenDeleteModal}
            />
          </DialogFooter>
        </>
      </DialogContent>
    </Dialog>
  );
};

export default MediaDetailModal;
