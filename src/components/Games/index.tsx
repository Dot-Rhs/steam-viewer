
import { useState } from 'react';
import './styles.css'
import { SearchBar } from '../SearchBar';
import { News } from './News';
import TabItem from '../Tabs/TabItem';
import { TabList } from '../Tabs';
import { InfoPanel } from './Info';


export const Games = () => {
    const [appId, setAppId] = useState<number>(); // 440 = Team Fortress 2
    const [errorMsg, _setErrorMsg] = useState<string | null>(null);
    const [loading, _setLoading] = useState(false);

    return (
        <div className="games-container">
            <SearchBar handleSubmit={(val) => setAppId(() => Number(val))} placeHolder={"Enter App ID for game..."} name='search-by-app-id' />

            {loading && <h2>Loading...</h2>}
            {errorMsg && <h2>{errorMsg}</h2>}
            {appId &&
                (!loading || errorMsg) ? (
                <TabList activeTabIndex={0}>
                    <TabItem label='Info Tab' className='games-panel' >
                        <InfoPanel appId={appId} />
                    </TabItem >
                    <TabItem label='News Tab' className='news-panel'>
                        <News appId={appId} />
                    </TabItem >
                </TabList >) : null
            }
        </div >
    );
}