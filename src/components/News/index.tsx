
import { useEffect, useMemo, useReducer, useRef, useState } from 'react';
import './styles.css'
import { Card } from './card';
import { SearchBar } from '../SearchBar';

const INITIAL_MAX_HEIGHT = 10000;

export const News = () => {
    const [appId, setAppId] = useState(""); // 440 = Team Fortress 2
    const [appData, setAppData] = useState({ newsitems: [] });
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [count, setCount] = useState<number>(10);

    const handleSubmit = useMemo(() => async (val) => {
        console.log('what: ', val);

        setLoading(() => true);
        try {
            const getAppNews = await fetch(`http://localhost:5000/getNews/${ val }?count=${ count }`);

            const data = await getAppNews.json();
            // const friendsData = await getFriends.json()
            // console.log('DAAA: ', contentRef.current.getBoundingClientRect().height)
            if (data.appnews.newsitems) {
                setAppData((prev) => ({ newsitems: [...prev.newsitems, ...data.appnews.newsitems] }));
            }
            setAppId(() => val);

            // if (tempHeight === null) return;
            // setHeight(height === 0 ? tempHeight : 0);
        } catch (error: unknown) {
            if (error instanceof Error) setErrorMsg(() => error?.message);
        }
        setLoading(() => false);
    }, [appData, appId]);

    // Sort the snap to top when loading more

    useEffect(() => {
        if (count > 10) {
            handleSubmit(appId);
        }
    }, [count]);


    return (
        <div className="news-container">
            <SearchBar handleSubmit={handleSubmit} placeHolder={"Enter App ID for game..."} name='search-by-app-id' />

            {loading && <h2>Loading...</h2>}
            {errorMsg && <h2>{errorMsg}</h2>}
            {
                // appData !== null &&
                // (!loading || errorMsg) ? (
                <>

                    <Card newsItems={appData?.newsitems} />

                    {appData.newsitems.length ? <button onClick={() => setCount((prev) => prev + 10)
                    }>Load More...</button> : null}
                </>
                // ) : null
            }

        </div >
    );
}