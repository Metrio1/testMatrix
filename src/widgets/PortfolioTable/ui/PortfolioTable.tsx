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
        <div className={"portfolio-table"}>
            <div className={"portfolio-table__header"}>
                <div className={"portfolio-table__cell"}>Актив</div>
                <div className={"portfolio-table__cell"}>Количество</div>
                <div className={"portfolio-table__cell"}>Цена</div>
                <div className={"portfolio-table__cell"}>Общая стоимость</div>
                <div className={"portfolio-table__cell"}>Изм. за 24ч</div>
                <div className={"portfolio-table__cell"}>% портфеля</div>
            </div>
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
