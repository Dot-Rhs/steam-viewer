
import { useEffect, useMemo, useState, cache } from 'react';
import './styles.css'
import { Card } from './card';
import { INewsState } from '../../../interfaces';
import useGlobalContext from '../../context/hook/useGlobalContext';
// import { SearchBar } from '../SearchBar';

interface IProps {
    appId: number
}

export const News = ({ appId }: IProps) => {
    const { newsCache, setNewsCache } = useGlobalContext()
    const [appData, setAppData] = useState<INewsState>(newsCache);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [count, setCount] = useState<number>(10);

    const handleFetchNews = useMemo(() => async (val: number) => {
        setLoading(() => true);

        try {
            const getAppNews = await fetch(`${ import.meta.env.VITE_LOCAL_SERVER_API_BASE_DOMAIN }/getNews/${ val }?count=${ count }`);

            if (!getAppNews.ok) throw new Error("Failed to fetch game news. Please try again later.");

            const data = await getAppNews.json();

            if (data.appnews.newsitems) {
                setAppData((prev) => ({ newsitems: [...data.appnews.newsitems] }));
                setNewsCache((prev) => ({ newsitems: [...data.appnews.newsitems] }));
                setCount((prev) => prev + 10)
            }
        } catch (error: unknown) {
            if (error instanceof Error) setErrorMsg(() => error?.message);
        }

        setLoading(() => false);
    }, [appId, count]);

    useEffect(() => {
        if (newsCache.newsitems.length) {

            setAppData(() => newsCache)
            setCount(() => newsCache.newsitems.length + 10)
            return
        } else {
            console.log('m0');

            handleFetchNews(appId)
        }

    }, [appId])

    return (
        <div className="news-container">
            {loading && <h2>Loading...</h2>}
            {errorMsg && <h2>{errorMsg}</h2>}
            {
                <>

                    <Card newsItems={appData?.newsitems} />

                    {appData.newsitems.length ? <button onClick={() => handleFetchNews(appId)
                    }>Load More...</button> : null}
                </>
            }
        </div >
    );
}