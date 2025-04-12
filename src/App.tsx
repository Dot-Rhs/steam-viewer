
import { SearchUser } from './components/SearchUser'
import TabItem from './components/Tabs/TabItem'
import { TabList } from './components/Tabs'
import { Games } from './components/Games'
import './App.css'
import GlobalState from './components/context'

function App() {

  return (
    <GlobalState>
      <div className='App'>
        <TabList activeTabIndex={1}>
          <TabItem label='Games Tab'>
            <Games />
          </TabItem>
          <TabItem label='Player Tab' >
            <SearchUser />
          </TabItem>
        </TabList>
      </div >
    </GlobalState>
  )
}

export default App
