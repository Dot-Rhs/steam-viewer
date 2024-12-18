
import { useEffect, useMemo, useState } from 'react';
import './styles.css'
import { Card } from './card';
import { INewsState } from '../../../interfaces';
// import { SearchBar } from '../SearchBar';

interface IProps {
    appId: number
}

console.log('DAR: ', import.meta.env, process.env, process.env.VITE_LOCAL_SERVER_API_BASE_DOMAIN);

export const News = ({ appId }: IProps) => {
    const [appData, setAppData] = useState<INewsState>({ newsitems: [] });
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [count, setCount] = useState<number>(10);

    const handleFetchNews = useMemo(() => async (val: number) => {

        setLoading(() => true);
        try {
            const getAppNews = await fetch(`${ import.meta.env.VITE_LOCAL_SERVER_API_BASE_DOMAIN }/getNews/${ val }?count=${ count }`);
            console.log('what2: ', val, count, appId);

            const data = await getAppNews.json();
            // const friendsData = await getFriends.json()
            // console.log('DAAA: ', contentRef.current.getBoundingClientRect().height)
            if (data.appnews.newsitems) {
                setAppData((prev) => ({ newsitems: [...prev.newsitems, ...data.appnews.newsitems] }));
            }
            // setAppId(() => val);

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
            handleFetchNews(appId);
        }
    }, [count]);

    useEffect(() => {
        console.log('aaaa: ,', appId);

        handleFetchNews(appId)
    }, [appId])


    return (
        <div className="news-container">
            {/* <SearchBar handleSubmit={handleSubmit} placeHolder={"Enter App ID for game..."} name='search-by-app-id' /> */}

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