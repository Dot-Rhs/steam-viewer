
import { useEffect, useMemo, useReducer, useRef, useState } from 'react';
import './styles.css'
import { Card } from './card';
import { SearchBar } from '../SearchBar';
import { News } from './News';
import TabItem from '../Tabs/TabItem';
import { TabList } from '../Tabs';
import { InfoPanel } from './Info';

const INITIAL_MAX_HEIGHT = 10000;

export const Games = () => {
    const [appId, setAppId] = useState(""); // 440 = Team Fortress 2
    const [appData, setAppData] = useState({ newsitems: [] });
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    // const [count, setCount] = useState<number>(10);

    // const handleSubmit = useMemo(() => async (val, count?) => {
    //     console.log('what: ', val, count);

    //     setLoading(() => true);
    //     try {
    //         const getAppNews = await fetch(`http://localhost:5000/getNews/${ val }?count=${ count || 10 }`);

    //         const data = await getAppNews.json();
    //         // const friendsData = await getFriends.json()
    //         // console.log('DAAA: ', contentRef.current.getBoundingClientRect().height)
    //         if (data.appnews.newsitems) {
    //             setAppData((prev) => ({ newsitems: [...prev.newsitems, ...data.appnews.newsitems] }));
    //         }
    //         setAppId(() => val);

    //         // if (tempHeight === null) return;
    //         // setHeight(height === 0 ? tempHeight : 0);
    //     } catch (error: unknown) {
    //         if (error instanceof Error) setErrorMsg(() => error?.message);
    //     }
    //     setLoading(() => false);
    // }, [appData, appId]);

    // Sort the snap to top when loading more

    // useEffect(() => {
    //     if (count > 10) {
    //         handleSubmit(appId);
    //     }
    // }, [count]);


    // const handleSubmit()

    return (
        <div className="games-container">
            <SearchBar handleSubmit={(val) => setAppId(() => val)} placeHolder={"Enter App ID for game..."} name='search-by-app-id' />

            {loading && <h2>Loading...</h2>}
            {errorMsg && <h2>{errorMsg}</h2>}
            {appId &&
                (!loading || errorMsg) ? (
                <TabList activeTabIndex={1}>
                    <TabItem label='Info Tab'>
                        <InfoPanel appId={appId} />
                    </TabItem >
                    {/* <TabItem label='News Tab'>
                        <News appId={appId} />
                    </TabItem > */}
                </TabList >) : null
            }




        </div >
    );
}