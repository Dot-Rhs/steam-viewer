import { useEffect, useRef, useState } from "react"
import { IRecentlyPlayed } from "../../../interfaces"


interface IProps {
    gamesList: IRecentlyPlayed
}

export const RecentlyPlayedList = ({ gamesList }: IProps) => {

    return (
        <>
            {gamesList?.games?.length ? gamesList.games.map((game, idx) => (
                <div key={`${ idx }gamep-appid${ game.appid }`}>
                    <img src={`http://media.steampowered.com/steamcommunity/public/images/apps/${ game.appid }/${ game.img_icon_url }.jpg`} alt={`${ game.name } image`} key={`${ idx }image-appid${ game.appid }`} />
                </div>)) : null}
            <div>
            </div>
        </>

    )
}

