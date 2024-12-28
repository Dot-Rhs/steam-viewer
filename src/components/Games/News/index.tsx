
import { useEffect, useMemo, useState } from 'react';
import './styles.css'
import { Card } from './card';
import { INewsState } from '../../../interfaces';
// import { SearchBar } from '../SearchBar';

interface IProps {
    appId: number
}

export const News = ({ appId }: IProps) => {
    const [appData, setAppData] = useState<INewsState>({ newsitems: [] });
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [count, setCount] = useState<number>(10);

    const handleFetchNews = useMemo(() => async (val: number) => {

        setLoading(() => true);
        try {
            const getAppNews = await fetch(`${ import.meta.env.VITE_LOCAL_SERVER_API_BASE_DOMAIN }/getNews/${ val }?count=${ count }`);

            const data = await getAppNews.json();

            if (data.appnews.newsitems) {
                setAppData((prev) => ({ newsitems: [...prev.newsitems, ...data.appnews.newsitems] }));
            }

        } catch (error: unknown) {
            if (error instanceof Error) setErrorMsg(() => error?.message);
        }
        setLoading(() => false);
    }, [appData, appId]);


    useEffect(() => {
        if (count > 10) {
            handleFetchNews(appId);
        }
    }, [count]);

    useEffect(() => {
        handleFetchNews(appId)
    }, [appId])

    return (
        <div className="news-container">
            {loading && <h2>Loading...</h2>}
            {errorMsg && <h2>{errorMsg}</h2>}
            {
                <>

                    <Card newsItems={appData?.newsitems} />

                    {appData.newsitems.length ? <button onClick={() => setCount((prev) => prev + 10)
                    }>Load More...</button> : null}
                </>
            }
        </div >
    );
}