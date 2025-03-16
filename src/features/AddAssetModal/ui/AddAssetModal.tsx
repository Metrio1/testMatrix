import * as React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addAsset } from '../../../pages/PortfolioPage/model/portfolioSlice'
import { Asset } from '../../../entities/asset'
import { Modal } from '../../../widgets/ModalForm'
import { RootState } from '../../../app/providers/store'

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
        <div>
            <button onClick={handleOpen}>Открыть форму</button>
            {isModalOpen && (
                <Modal onClose={handleClose}>
                    <h3>Выберите актив для добавления</h3>
                    <div
                        style={{
                            maxHeight: '200px',
                            overflowY: 'auto',
                            border: '1px solid #ccc',
                            padding: '8px',
                        }}
                    >
                        {availableAssets.map((asset) => (
                            <div
                                key={asset.name}
                                onClick={() => handleSelectAsset(asset)}
                                style={{
                                    cursor: 'pointer',
                                    padding: '4px 8px',
                                    backgroundColor:
                                        selectedAsset?.name === asset.name ? '#e0e0e0' : 'transparent',
                                }}
                            >
                                <strong>{asset.name}</strong> | ${asset.price.toFixed(2)} |{' '}
                                {asset.dailyChange.toFixed(2)}%
                            </div>
                        ))}
                    </div>

                    {selectedAsset && (
                        <div
                            style={{
                                marginTop: '16px',
                                borderTop: '1px solid #ddd',
                                paddingTop: '16px',
                            }}
                        >
                            <h4>Добавить актив: {selectedAsset.name}</h4>
                            <label>
                                Количество:
                                <input
                                    type="number"
                                    step="any"
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                />
                            </label>
                            <div style={{ marginTop: '12px' }}>
                                <button onClick={handleAdd}>Добавить</button>
                                <button onClick={handleCancelSelection} style={{ marginLeft: '8px' }}>
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