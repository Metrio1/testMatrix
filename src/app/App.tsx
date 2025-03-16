import * as React from 'react'
import { PortfolioPage } from '../pages/PortfolioPage'
import "./styles/index.js";
import {AssetPriceUpdater} from "./providers/ui/AssetPriceUpdater.tsx";

export const App: React.FC = () => {
    return (
        <>
            <AssetPriceUpdater />
            <PortfolioPage />
        </>
    )
}