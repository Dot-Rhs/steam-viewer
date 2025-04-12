import { createContext, useState } from "react"
import { IGameInfo, INewsState, IUserData } from "../../interfaces"

type GlobalStateType = {
    children: React.ReactNode
}

type GlobalContextType = {
    currentAppId: number | null
    setCurrentAppId: React.Dispatch<React.SetStateAction<number | null>>
    newsCache: INewsState
    setNewsCache: React.Dispatch<React.SetStateAction<INewsState>>
    infoCache: IGameInfo | null
    setInfoCache: React.Dispatch<React.SetStateAction<IGameInfo | null>>
    playerData: IUserData | null
    setPlayerData: React.Dispatch<React.SetStateAction<IUserData | null>>
}

export const GlobalContext = createContext<GlobalContextType | null>(null)

const GlobalState = ({ children }: GlobalStateType) => {
    const [newsCache, setNewsCache] = useState<INewsState>({ newsitems: [] })
    const [infoCache, setInfoCache] = useState<IGameInfo | null>(null)
    const [currentAppId, setCurrentAppId] = useState<number | null>(null)
    const [playerData, setPlayerData] = useState<IUserData | null>(null)

    return (
        <GlobalContext.Provider value={{ newsCache, setNewsCache, infoCache, setInfoCache, currentAppId, setCurrentAppId, playerData, setPlayerData }}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalState