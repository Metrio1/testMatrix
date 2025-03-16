import * as React from "react";
import "../style.scss"
import {AddAssetModal} from "../../../features/AddAssetModal";

export const Header: React.FC = () => {
    
    return (
        <div className={"header"}>
            <h1 className={"header__title"}>Portfolio overview</h1>
            <AddAssetModal />
        </div>
    )
}