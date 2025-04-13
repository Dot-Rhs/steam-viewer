import { createContext, useState } from "react"
import { IGameData, IGameInfo, INewsState, IUserData } from "../../interfaces"
import { IFriendsState } from "../SearchUser/FriendsList"

type GlobalStateType = {
    children: React.ReactNode
}

export type GlobalContextType = {
    currentAppId: number | null
    setCurrentAppId: React.Dispatch<React.SetStateAction<number | null>>
    newsCache: INewsState
    setNewsCache: React.Dispatch<React.SetStateAction<INewsState>>
    infoCache: IGameInfo | null
    setInfoCache: React.Dispatch<React.SetStateAction<IGameInfo | null>>
}

export type PlayerContextType = {
    gameData: IGameData
    setGameData: React.Dispatch<React.SetStateAction<IGameData>>
    playerData: IUserData | null
    setPlayerData: React.Dispatch<React.SetStateAction<IUserData | null>>
    friendsCache: IFriendsState[]
    setFriendsCache: React.Dispatch<React.SetStateAction<IFriendsState[]>>
    currentId: string | null
    setCurrentId: React.Dispatch<React.SetStateAction<string | null>>
}

export const GlobalContext = createContext<GlobalContextType | null>(null)

export const GlobalStateContext = ({ children }: GlobalStateType) => {
    const [newsCache, setNewsCache] = useState<INewsState>({ newsitems: [] })
    const [infoCache, setInfoCache] = useState<IGameInfo | null>(null)
    const [currentAppId, setCurrentAppId] = useState<number | null>(null)

    return (
        <GlobalContext.Provider value={{ newsCache, setNewsCache, infoCache, setInfoCache, currentAppId, setCurrentAppId }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const PlayerContext = createContext<PlayerContextType | null>(null)

export const PlayerStateContext = ({ children }: GlobalStateType) => {
    const [gameData, setGameData] = useState<IGameData>({ games: [] });
    const [playerData, setPlayerData] = useState<IUserData | null>(null)
    const [friendsCache, setFriendsCache] = useState<IFriendsState[]>([]);
    const [currentId, setCurrentId] = useState<string | null>(null)

    return (
        <PlayerContext.Provider value={{ gameData, setGameData, playerData, setPlayerData, friendsCache, setFriendsCache, currentId, setCurrentId }}>
            {children}
        </PlayerContext.Provider>
    )
}