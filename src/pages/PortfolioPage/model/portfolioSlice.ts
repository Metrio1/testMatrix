// src/pages/PortfolioPage/model/portfolioSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Asset } from '../../../entities/asset'

export interface PortfolioState {
    assets: Asset[]
}

const initialState: PortfolioState = {
    assets: []
}

export const portfolioSlice = createSlice({
    name: 'portfolio',
    initialState,
    reducers: {
        addAsset: (state, action: PayloadAction<Asset>) => {
            state.assets.push(action.payload)
        },
        removeAsset: (state, action: PayloadAction<string>) => {
            state.assets = state.assets.filter((asset) => asset.id !== action.payload)
        },
        updateAssetPrice: (
            state,
            action: PayloadAction<{ symbol: string; price: number; dailyChange: number }>
        ) => {
            const { symbol, price, dailyChange } = action.payload
            const asset = state.assets.find(
                (a) => a.name.toLowerCase() === symbol.toLowerCase()
            )
            if (asset) {
                asset.price = price
                asset.dailyChange = dailyChange
            }
        }
    }
})

export const { addAsset, removeAsset, updateAssetPrice } = portfolioSlice.actions
export default portfolioSlice.reducer
