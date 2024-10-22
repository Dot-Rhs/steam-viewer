
import { useEffect, useReducer, useRef, useState } from 'react';
import './styles.css'
import { Card } from './card';
import { SearchBar } from '../SearchBar';

const INITIAL_MAX_HEIGHT = 10000;

export const News = () => {
    const [appId, setAppId] = useState(""); // 440 = Team Fortress 2
    const [appData, setAppData] = useState(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [count, setCount] = useState<number>(10);

    const handleSubmit = async (val) => {
        console.log('what: ', val);

        setLoading(() => true);
        try {
            const getAppNews = await fetch(`http://localhost:5000/getNews/${ val }?count=${ count }`);

            const data = await getAppNews.json();
            // const friendsData = await getFriends.json()
            // console.log('DAAA: ', contentRef.current.getBoundingClientRect().height)
            setAppData(() => data.appnews.newsitems);
            setAppId(() => val);

            // if (tempHeight === null) return;
            // setHeight(height === 0 ? tempHeight : 0);
        } catch (error: unknown) {
            if (error instanceof Error) setErrorMsg(() => error?.message);
        }
        setLoading(() => false);
    };

    // Sort the snap to top when loading more

    useEffect(() => {
        if (count > 10) {
            handleSubmit(appId);
        }
    }, [count]);


    return (
        <div className="news-container">
            <SearchBar handleSubmit={handleSubmit} />

            {loading && <h2>Loading...</h2>}
            {errorMsg && <h2>{errorMsg}</h2>}
            {
                appData !== null && (!loading || errorMsg) ? (
                    <>

                        <Card newsItems={appData} />
                        <button onClick={() => setCount((prev) => prev + 10)
                        }>Load More...</button>
                    </>
                ) : null
            }

        </div >
    );
}