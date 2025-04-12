
import { useState } from 'react';
import './styles.css'
import { SearchBar } from '../SearchBar';
import { News } from './News';
import TabItem from '../Tabs/TabItem';
import { TabList } from '../Tabs';
import { InfoPanel } from './Info';


export const Games = () => {
    const [appId, setAppId] = useState<number>(); // 440 = Team Fortress 2
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [loading, _setLoading] = useState(false);

    const handleSubmit = async (value: string) => {
        setErrorMsg(() => null)

        const regex = new RegExp('^[0-9]+$')
        if (!regex.test(value)) return setErrorMsg(() => "Please enter a valid App ID.\nNumeric values only.");

        setAppId(() => Number(value))
    }

    return (
        <div className="games-container">
            <SearchBar handleSubmit={handleSubmit} placeHolder={"Enter App ID for game..."} name='search-by-app-id' />

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