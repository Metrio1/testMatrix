import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import { updateAvailableAssets } from '../../../pages/PortfolioPage/model/portfolioSlice'

export const AssetPriceUpdater = () => {
    const dispatch = useDispatch()
    const availableAssets = useSelector((state: RootState) => state.portfolio.availableAssets)

    useEffect(() => {
        if (!availableAssets || availableAssets.length === 0) return

        const streams = availableAssets
            .map(asset => asset.name.toLowerCase() + 'usdt@ticker')
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
                    // Обновляем те записи, которые соответствуют полученному символу
                    const updatedAssets = availableAssets.map(asset =>
                        asset.name === symbol ? { ...asset, price, dailyChange } : asset
                    )
                    dispatch(updateAvailableAssets(updatedAssets))
                }
            } catch (error) {
                console.error('Ошибка WebSocket:', error)
            }
        }

        return () => ws.close()
    }, [dispatch, availableAssets])

    return null
}