import { motion } from "framer-motion";
import React, { ReactNode } from "react";
import toast from "react-hot-toast";

interface IModal {
  showModal: boolean;
  children: ReactNode;
  onHideModal: () => void;

}

const ModalLayout: React.FC<IModal> = ({
  showModal,
  children,
  onHideModal,
}) => {
  const handleBackgroundClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      if (onHideModal) {
        onHideModal();
      } else {
        toast.error("Please wait while we process your request");
      }
    }
  };

  if (showModal === false) return <></>;
  else
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-screen h-screen bg-[#00000080] z-20 fixed top-0 left-0 flex items-center justify-center"
        onClick={handleBackgroundClick}
      >
        <div className=" md:p-0 absolute mx-2 md:mx-4 ">
          <div
            className={`bg-white px-4 py-8 md:p-12 rounded-xl  text-zinc-800 w-full md:min-w-[500px] max-w-[700px]`}
          >
            {children}
          </div>
        </div>
      </motion.div>
    );
};

export default ModalLayout;
