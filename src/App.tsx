
import { useState } from 'react'
import { SearchUser } from './components/SearchUser'

import './App.css'
import { News } from './components/News'
import TabItem from './components/Tabs/TabItem'
import { TabList } from './components/Tabs'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='App'>
      <TabList activeTabIndex={1}>
        <TabItem label='News Tab'>

          <News />
        </TabItem>
        <TabItem label='Player Tab' >

          <SearchUser />
        </TabItem>
      </TabList>
      {/* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
    </div >
  )
}

export default App
