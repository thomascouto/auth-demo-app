import React, { createContext } from "react"
import { GlobalStateType } from "../types/types"

const GlobalStateContext = createContext<GlobalStateType | null>(null)
export default GlobalStateContext
