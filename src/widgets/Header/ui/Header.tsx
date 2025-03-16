import * as React from "react";
import "../style.scss"
import { ModalForm } from "../../ModalForm";

export const Header: React.FC = () => {

    function handleClick(){
        console.log("open")
    }

    return (
        <div className={"header"}>
            <h1 className={"header__title"}>Portfolio overview</h1>
            <ModalForm />
        </div>
    )
}