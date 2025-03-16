import * as React from 'react'
import { useEffect, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../../app/providers/store'
import { AssetRow } from '../../../entities/asset'
import { updateAssetPrice } from '../../../pages/PortfolioPage/model/portfolioSlice.ts'
import "../style.scss"

export const PortfolioTable: React.FC = () => {
    const dispatch = useDispatch()
    const assets = useSelector((state: RootState) => state.portfolio.assets)

    const totalPortfolioValue = assets.reduce((sum, asset) => {
        return sum + asset.quantity * asset.price
    }, 0)

    const assetSymbols = useMemo(() => assets.map(asset => asset.name), [assets])

    useEffect(() => {
        const streams = assetSymbols
            .map(symbol => symbol.toLowerCase() + 'usdt@ticker')
            .join('/')
        const wsUrl = `wss://stream.binance.com:9443/stream?streams=${streams}`
        const ws = new WebSocket(wsUrl)

        ws.onmessage = (event) => {
            try {
                const message = JSON.parse(event.data)
                if (message?.data && message?.stream) {
                    const stream: string = message.stream
                    const symbol = stream.replace('usdt@ticker', '').toUpperCase()
                    const price = parseFloat(message.data.c)
                    const dailyChange = parseFloat(message.data.P)
                    dispatch(updateAssetPrice({ symbol, price, dailyChange }))
                }
            } catch (error) {
                console.error('Ошибка при обработке сообщения WebSocket:', error)
            }
        }

        ws.onclose = (event) => {
            console.warn('WebSocket закрыт:', event.code, event.reason)
        }

        return () => {
            if (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING) {
                ws.close()
            }
        }
    }, [assetSymbols, dispatch])


    return (
        <div className={"portfolio-table"}>
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
                <tbody>
                {assets.map((asset) => {
                    const totalCost = asset.quantity * asset.price
                    const portfolioShare = (totalCost / totalPortfolioValue) * 100 || 0
                    return (
                        <AssetRow
                            key={asset.id}
                            asset={asset}
                            totalCost={totalCost}
                            portfolioShare={portfolioShare}
                        />
                    )
                })}
                </tbody>
            </table>
        </div>
    )
}