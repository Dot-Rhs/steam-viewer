
import { useEffect, useReducer, useRef, useState } from 'react';
import './styles.css'
import { Card } from './card';
import { SearchBar } from '../SearchBar';

const INITIAL_MAX_HEIGHT = 10000;

export const News = () => {
    const [appId, setAppId] = useState("auto");
    const [appData, setAppData] = useState(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (val) => {
        console.log('EEE: ', val);

        setLoading(() => true);
        try {
            const getAppNews = await fetch(`http://localhost:5000/getNews/440?count=10`);
            const data = await getAppNews.json();
            // const friendsData = await getFriends.json()
            // console.log('DAAA: ', contentRef.current.getBoundingClientRect().height)
            setAppData(() => data.appnews.newsitems);
            setAppId(() => "");

            // if (tempHeight === null) return;
            // setHeight(height === 0 ? tempHeight : 0);
        } catch (error: unknown) {
            if (error instanceof Error) setErrorMsg(() => error?.message);
        }
        setLoading(() => false);
    };



    return (
        <div className="news-container">
            <SearchBar handleSubmit={handleSubmit} />

            {loading && <h2>Loading...</h2>}
            {errorMsg && <h2>{errorMsg}</h2>}
            {
                appData !== null && (!loading || errorMsg) ? (
                    <Card newsItems={appData} />
                ) : null
            }
        </div >
    );
}