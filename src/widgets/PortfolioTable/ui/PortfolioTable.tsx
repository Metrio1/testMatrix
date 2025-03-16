import * as React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/providers/store';
import { Asset, AssetRow } from '../../../entities/asset';
import { VirtualizedList } from '../../VirtualizedList';
import "../style.scss";

export const PortfolioTable: React.FC = () => {
    const assets = useSelector((state: RootState) => state.portfolio.assets);

    const totalPortfolioValue = assets.reduce((sum, asset) => sum + asset.quantity * asset.price, 0);

    return (
        <div className="portfolio-table">
            <table>
                <thead>
                <tr>
                    <th>Актив</th>
                    <th>Количество</th>
                    <th>Цена</th>
                    <th>Общая стоимость</th>
                    <th>Изм. за 24ч</th>
                    <th>% портфеля</th>
                </tr>
                </thead>
            </table>
            <VirtualizedList<Asset>
                items={assets}
                itemHeight={50}
                containerHeight={500}
                renderItem={(asset) => {
                    const totalCost = asset.quantity * asset.price;
                    const portfolioShare = (totalCost / totalPortfolioValue) * 100 || 0;
                    return <AssetRow key={asset.id} asset={asset} totalCost={totalCost} portfolioShare={portfolioShare} />;
                }}
            />
        </div>
    );
};
