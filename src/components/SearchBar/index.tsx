import { useState } from "react"
import './styles.css'

export const SearchBar = ({ handleSubmit }) => {
    const [value, setValue] = useState('')

    return (
        <div className="input-wrapper">
            <input
                name="search-by-app-id"
                type="text"
                placeholder="Enter App ID for game..."
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            />
            <button onClick={() => handleSubmit(value)}>Search</button>
        </div>
    )
}