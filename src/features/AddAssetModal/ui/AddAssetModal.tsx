import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addAsset } from '../../../pages/PortfolioPage/model/portfolioSlice';
import { Asset } from '../../../entities/asset';
import { Modal } from '../../../widgets/ModalForm';
import { RootState } from '../../../app/providers/store';
import "../style.scss";

export const AddAssetModal: React.FC = () => {
    const dispatch = useDispatch();
    const availableAssets = useSelector((state: RootState) => state.portfolio.availableAssets);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAsset, setSelectedAsset] = useState<Omit<Asset, 'id' | 'quantity'> | null>(null);
    const [quantity, setQuantity] = useState('1.0');
    const [searchQuery, setSearchQuery] = useState('');

    const listRef = useRef<HTMLUListElement | null>(null);
    const scrollDirectionRef = useRef<number>(0);
    const animationFrameRef = useRef<number | null>(null);

    const handleOpen = () => setIsModalOpen(true);

    const handleClose = () => {
        setIsModalOpen(false);
        setSelectedAsset(null);
        setQuantity('1');
        setSearchQuery('');
    };

    const handleSelectAsset = (asset: Omit<Asset, 'id' | 'quantity'>) => {
        setSelectedAsset(asset);
    };

    const handleAdd = () => {
        if (selectedAsset) {
            const newAsset: Asset = {
                id: Date.now().toString(),
                name: selectedAsset.name,
                price: selectedAsset.price,
                dailyChange: selectedAsset.dailyChange,
                quantity: parseFloat(quantity) || 0,
            };
            dispatch(addAsset(newAsset));
            handleClose();
        }
    };

    const handleCancelSelection = () => {
        setSelectedAsset(null);
        setQuantity('1');
    };

    const filteredAssets = availableAssets.filter((asset) =>
        asset.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const scrollStep = 2;

    const animateScroll = () => {
        if (listRef.current) {
            if ("scrollBy" in listRef.current) {
                listRef.current.scrollBy({top: scrollDirectionRef.current * scrollStep, behavior: "auto"});
            }
            animationFrameRef.current = requestAnimationFrame(animateScroll);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLUListElement>) => {
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            scrollDirectionRef.current = -1;
            if (animationFrameRef.current === null) {
                animationFrameRef.current = requestAnimationFrame(animateScroll);
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            scrollDirectionRef.current = 1;
            if (animationFrameRef.current === null) {
                animationFrameRef.current = requestAnimationFrame(animateScroll);
            }
        }
    };

    const handleKeyUp = (e: React.KeyboardEvent<HTMLUListElement>) => {
        if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
            scrollDirectionRef.current = 0;
            if (animationFrameRef.current !== null) {
                if (typeof animationFrameRef.current === "number") {
                    cancelAnimationFrame(animationFrameRef.current);
                }
                animationFrameRef.current = null;
            }
        }
    };

    useEffect(() => {
        if (isModalOpen && listRef.current) {
            if ("focus" in listRef.current) {
                listRef.current.focus();
            }
        }
    }, [isModalOpen]);

    return (
        <div className="add-asset-modal">
            <button className="button button--big" onClick={handleOpen}>
                Добавить
            </button>
            {isModalOpen && (
                <Modal onClose={handleClose}>
                    <label htmlFor="asset-search" className="visually-hidden">
                        Поиск по валюте
                    </label>
                    <input
                        id="asset-search"
                        type="text"
                        className="add-asset-modal__search input"
                        placeholder="Поиск по валюте..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <ul
                        className="add-asset-modal__list"
                        ref={listRef}
                        tabIndex={0}
                        role="listbox"
                        aria-label="Список доступных валют"
                        onKeyDown={handleKeyDown}
                        onKeyUp={handleKeyUp}
                    >
                        {filteredAssets.map((asset) => (
                            <li
                                className="add-asset-modal__item"
                                key={asset.name}
                                role="option"
                                aria-selected={selectedAsset?.name === asset.name}
                                onClick={() => handleSelectAsset(asset)}
                            >
                                <span className="add-asset-modal__item-text">{asset.name}</span>
                                <span className="add-asset-modal__item-text">${asset.price.toFixed(2)}</span>
                                <span className="add-asset-modal__item-text">{asset.dailyChange.toFixed(2)}%</span>
                            </li>
                        ))}
                    </ul>
                    {selectedAsset && (
                        <div className="add-asset-modal__actions">
                            <div className="add-asset-modal__actions-selected">
                                <span>{selectedAsset.name}</span>
                                <span>${selectedAsset.price.toFixed(2)}</span>
                            </div>
                            <label htmlFor="asset-quantity" className="visually-hidden">
                                Количество
                            </label>
                            <input
                                id="asset-quantity"
                                className="add-asset-modal__actions-quantity input"
                                type="number"
                                placeholder="Количество"
                                step="any"
                                onChange={(e) => setQuantity(e.target.value)}
                            />
                            <div className="add-asset-modal__actions-buttons">
                                <button
                                    className="add-asset-modal__actions-button button"
                                    onClick={handleAdd}
                                >
                                    Добавить
                                </button>
                                <button
                                    className="add-asset-modal__actions-button button"
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
    );
};
