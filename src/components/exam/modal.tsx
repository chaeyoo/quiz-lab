import React from "react";
import ReactDOM from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center"
      onClick={handleOverlayClick}
    >
      <div className=" flex flex-col bg-_medium-gray rounded-lg shadow-lg max-w-sm mx-auto w-[200px]">
        <div className="h-[35px] bg-_green rounded-t-lg content-center px-2 text-sm">
          {message}
        </div>
        <button
          className="mt-4 px-4 py-2 bg-_purple text-white rounded"
          onClick={onClose}
        >
          계속하기
        </button>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
