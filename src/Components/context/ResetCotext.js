import { createContext } from "react";

let ResetPassword = createContext;

function ResetPasswordProvider(){
    let x=0;
    return <ResetPassword.provide value={x}></ResetPassword.provide>
}