import { createContext, useState } from "react"
import { IGameInfo, INewsState } from "../../interfaces"

export const GlobalContext = createContext<unknown | null>(null)

const GlobalState = ({ children }) => {
    const [newsCache, setNewsCache] = useState<INewsState>({ newsitems: [] })
    const [infoCache, setInfoCache] = useState<IGameInfo | null>(null)

    return (
        <GlobalContext.Provider value={{ newsCache, setNewsCache, infoCache, setInfoCache }}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalState