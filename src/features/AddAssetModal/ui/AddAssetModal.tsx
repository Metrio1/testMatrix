import * as React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addAsset } from '../../../pages/PortfolioPage/model/portfolioSlice'
import { Asset } from '../../../entities/asset'
import { Modal } from '../../../widgets/ModalForm'
import { RootState } from '../../../app/providers/store'
import "../style.scss";

export const AddAssetModal: React.FC = () => {
    const dispatch = useDispatch()
    const availableAssets = useSelector((state: RootState) => state.portfolio.availableAssets)

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedAsset, setSelectedAsset] = useState<
        Omit<Asset, 'id' | 'quantity'> | null
    >(null)
    const [quantity, setQuantity] = useState('1.0')

    const handleOpen = () => setIsModalOpen(true)

    const handleClose = () => {
        setIsModalOpen(false)
        setSelectedAsset(null)
        setQuantity('1')
    }

    const handleSelectAsset = (asset: Omit<Asset, 'id' | 'quantity'>) => {
        setSelectedAsset(asset)
    }

    const handleAdd = () => {
        if (selectedAsset) {
            const newAsset: Asset = {
                id: Date.now().toString(),
                name: selectedAsset.name,
                price: selectedAsset.price,
                dailyChange: selectedAsset.dailyChange,
                quantity: parseFloat(quantity) || 0,
            }
            dispatch(addAsset(newAsset))
            handleClose()
        }
    }

    const handleCancelSelection = () => {
        setSelectedAsset(null)
        setQuantity('1')
    }

    return (
        <div className={"add-asset-modal"}>
            <button className={"button"} onClick={handleOpen}>Открыть форму</button>
            {isModalOpen && (
                <Modal onClose={handleClose}>
                    <ul
                        className={"add-asset-modal__list"}
                    >
                        {availableAssets.map((asset) => (
                            <li
                                className={"add-asset-modal__item"}
                                key={asset.name}
                                onClick={() => handleSelectAsset(asset)}
                            >
                                <span className={"add-asset-modal__item-text"}>
                                    {asset.name}
                                </span>
                                <span className={"add-asset-modal__item-text"}>
                                    ${asset.price.toFixed(2)}
                                </span>
                                <span className={"add-asset-modal__item-text"}>
                                    {' '} {asset.dailyChange.toFixed(2)}%
                                </span>
                            </li>
                        ))}
                    </ul>

                    {selectedAsset && (
                        <div
                            className={"add-asset-modal__actions"}
                        >
                            <div className={"add-asset-modal__actions-selected"}>
                                <span>{selectedAsset.name}</span>
                                <span>${selectedAsset.price}</span>
                            </div>
                            <label>
                                <input
                                    className={"add-asset-modal__actions-quantity"}
                                    type="number"
                                    placeholder={"Количество"}
                                    step="any"
                                    onChange={(e) => setQuantity(e.target.value)}
                                />
                            </label>
                            <div className={"add-asset-modal__actions-buttons"}>
                                <button
                                    className={"add-asset-modal__actions-button button"}
                                    onClick={handleAdd}
                                >
                                    Добавить
                                </button>
                                <button
                                    className={"add-asset-modal__actions-button button"}
                                    onClick={handleCancelSelection}
                                >
                                    Отменить выбор
                                </button>
                            </div>
                        </div>
                    )}
                </Modal>
            )}
        </div>
    )
}