import * as React from 'react'
import { useDispatch } from 'react-redux'
import { removeAsset } from '../../../pages/PortfolioPage/model/portfolioSlice'
import { Asset, AssetRowProps, FormattedValues } from '../config/types'

const formatValues = (asset: Asset, totalCost: number, portfolioShare: number): FormattedValues => {
    const formattedPrice = asset.price.toLocaleString('ru-RU', { style: 'currency', currency: 'USD' })
    const formattedTotal = totalCost.toLocaleString('ru-RU', { style: 'currency', currency: 'USD' })
    const formattedChange = `${asset.dailyChange > 0 ? '+' : ''}${asset.dailyChange.toFixed(2)}%`
    const formattedShare = `${portfolioShare.toFixed(2)}%`
    return { price: formattedPrice, total: formattedTotal, change: formattedChange, share: formattedShare }
}

export const AssetRow: React.FC<AssetRowProps> = ({ asset, totalCost, portfolioShare }) => {
    const dispatch = useDispatch()
    const { price, total, change, share } = formatValues(asset, totalCost, portfolioShare)

    const handleDelete = () => {
        dispatch(removeAsset(asset.id))
    }

    return (
        <div className={"portfolio-table__row"} onClick={handleDelete}>
            <div className={"portfolio-table__cell"}>{asset.name}</div>
            <div className={"portfolio-table__cell"}>{asset.quantity.toFixed(4)}</div>
            <div className={"portfolio-table__cell"}>{price}</div>
            <div className={"portfolio-table__cell"}>{total}</div>
            <div className={"portfolio-table__cell"}>{change}</div>
            <div className={"portfolio-table__cell"}>{share}</div>
        </div>
    )
}
