import * as React from 'react'
import "../style.scss";

interface ModalProps {
    onClose: () => void;
    children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
    return (
        <div className="modal">
            <div className="modal__overlay" onClick={onClose} />
            <div className="modal__content">
                {children}
            </div>
        </div>
    );
};
