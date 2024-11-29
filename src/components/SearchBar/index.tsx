import { useState } from "react"
import './styles.css'

export const SearchBar = ({ handleSubmit, placeHolder, name }) => {
    const [value, setValue] = useState('')

    return (
        <div className="input-wrapper">
            <input
                name={name}
                type="text"
                placeholder={placeHolder}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit(value)}
            />
            <button onClick={() => handleSubmit(value)} disabled={!value} >Search</button>
        </div>
    )
}