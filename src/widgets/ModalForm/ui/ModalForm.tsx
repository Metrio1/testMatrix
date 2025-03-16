import * as React from 'react'
import { Modal } from "./Modal";
import {useState} from "react";

export const ModalForm: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div>
            <button onClick={() => setIsModalOpen(true)}>Открыть форму</button>
            {isModalOpen && (
                <Modal onClose={() => setIsModalOpen(false)}>
                    <form>
                        <button type="submit">Добавить</button>
                        <button type="button" onClick={() => setIsModalOpen(false)}>Отменить</button>
                    </form>
                </Modal>
            )}
        </div>
    );
};
