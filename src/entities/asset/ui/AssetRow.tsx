import * as React from 'react'

import { Asset, AssetRowProps, FormattedValues } from '../config/types';

const formatValues = (asset: Asset, totalCost: number, portfolioShare: number): FormattedValues => {
    const formattedPrice = asset.price.toLocaleString('ru-RU', { style: 'currency', currency: 'USD' })
    const formattedTotal = totalCost.toLocaleString('ru-RU', { style: 'currency', currency: 'USD' })
    const formattedChange = `${asset.dailyChange > 0 ? '+' : ''}${asset.dailyChange.toFixed(2)}%`
    const formattedShare = `${portfolioShare.toFixed(2)}%`

    return { price: formattedPrice, total: formattedTotal, change: formattedChange, share: formattedShare }
}

export const AssetRow: React.FC<AssetRowProps> = ({ asset, totalCost, portfolioShare }) => {
    const { price, total, change, share } = formatValues(asset, totalCost, portfolioShare)

    return (
        <tr>
            <td>{asset.name}</td>
            <td>{asset.quantity.toFixed(4)}</td>
            <td>{price}</td>
            <td>{total}</td>
            <td>{change}</td>
            <td>{share}</td>
        </tr>
    )
}
