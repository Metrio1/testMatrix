export interface Asset {
    id: string;
    name: string;
    quantity: number;
    price: number;
    dailyChange: number;
}

export interface AssetRowProps {
    asset: Asset
    totalCost: number
    portfolioShare: number
}

export interface FormattedValues {
    price: string
    total: string
    change: string
    share: string
}
