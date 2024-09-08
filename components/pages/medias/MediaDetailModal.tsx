import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { Media } from "@/utils/types";
import MediaDetailBody from "./MediaDetailBody";
import MediaDetailFooter from "./MediaDetailFooter";

const MediaDetailModal = ({
  isOpen,
  onOpenChange,
  selectedImage,
  setOpenDeleteModal,
}: {
  isOpen: boolean;
  onOpenChange: any;
  selectedImage: Media;
  setOpenDeleteModal: (bool: boolean) => void;
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="p-6 max-w-full">
        <>
          <MediaDetailBody selectedImage={selectedImage} />
          <DialogFooter>
            <MediaDetailFooter
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
