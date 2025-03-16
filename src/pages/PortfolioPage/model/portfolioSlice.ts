import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Asset } from '../../../entities/asset'
import { availableAssets as initialAvailableAssets } from '../../../features/AddAssetModal/config/availableAssets'

export interface PortfolioState {
    assets: Asset[]
    availableAssets: Omit<Asset, 'id' | 'quantity'>[]
}

const loadAssetsFromStorage = (): Asset[] => {
    const savedAssets = localStorage.getItem('portfolioAssets');
    return savedAssets ? JSON.parse(savedAssets) : [];
};

const initialState: PortfolioState = {
    assets: loadAssetsFromStorage(),
    availableAssets: initialAvailableAssets
}

export const portfolioSlice = createSlice({
    name: 'portfolio',
    initialState,
    reducers: {
        addAsset: (state, action: PayloadAction<Asset>) => {
            state.assets.push(action.payload);
            localStorage.setItem('portfolioAssets', JSON.stringify(state.assets));
        },
        removeAsset: (state, action: PayloadAction<string>) => {
            state.assets = state.assets.filter(asset => asset.id !== action.payload);
            localStorage.setItem('portfolioAssets', JSON.stringify(state.assets));
        },
        updateAssetPrice: (
            state,
            action: PayloadAction<{ symbol: string; price: number; dailyChange: number }>
        ) => {
            const { symbol, price, dailyChange } = action.payload
            const asset = state.assets.find(a => a.name.toLowerCase() === symbol.toLowerCase())
            if (asset) {
                asset.price = price
                asset.dailyChange = dailyChange
            }
        },
        updateAvailableAssets: (state, action: PayloadAction<Omit<Asset, 'id' | 'quantity'>[]>) => {
            state.availableAssets = action.payload
        }
    }
})

export const { addAsset, removeAsset, updateAssetPrice, updateAvailableAssets } = portfolioSlice.actions
export default portfolioSlice.reducer