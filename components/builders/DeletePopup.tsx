import { Dispatch, SetStateAction } from "react";
import { setOverlay } from "@/libs/redux-state/features/overlay/overlaySlice";
import { useDispatch } from "react-redux";

type DeletePopupProps = {
  showDeleteModal: boolean;
  setShowDeleteModal: Dispatch<SetStateAction<boolean>>;
  deleteItem: () => Promise<void>;
};

const DeletePopup = ({
  showDeleteModal,
  setShowDeleteModal,
  deleteItem,
}: DeletePopupProps) => {
  const dispatch = useDispatch();

  const cancelDeleteProduct = () => {
    setShowDeleteModal(false);
    dispatch(setOverlay(false));
  };

  return (
    <>
      {showDeleteModal && (
        <section className="modal z-[36] border-[1px] border-gray-300 p-6 bg-white">
          <p className="mb-8">
            This action is irreversible. Do you want to proceed?
          </p>
          <div className="flex gap-3 items-center justify-center">
            <button
              type="button"
              className="border-[1px] border-gray-300 py-2 px-4 text-[#272829]"
              onClick={cancelDeleteProduct}
            >
              Cancel
            </button>
            <button
              type="button"
              className="bg-[#272829] py-2 px-4 text-white"
              onClick={deleteItem}
            >
              Delete
            </button>
          </div>
        </section>
      )}
    </>
  );
};

export default DeletePopup;
