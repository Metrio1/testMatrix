import * as React from 'react'
import { PortfolioTable } from '../../../widgets/PortfolioTable'
import "../style.scss";
import {Header} from "../../../widgets/Header";

export const PortfolioPage: React.FC = () => {
    return (
        <div className={"portfolio-page"}>
            <Header />
            <PortfolioTable />
        </div>
    )
}