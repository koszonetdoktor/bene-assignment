import React, { useState } from "react"
import axios from "../../utils/axios"
import { RouteComponentProps } from "react-router-dom"
import "./index.css"

function Login(props: RouteComponentProps) {
    const [credentials, setCredentials] = useState<{ name: string, pw: string }>({ name: "", pw: "" })
    const [isLoginError, setIsLoginError] = useState<boolean>(false)

    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCredentials({
            ...credentials,
            [event.target.name]: event.target.value
        })
    }

    const onFormSubmit = () => {
        const body = {
            name: credentials.name,
            password: credentials.pw
        }
        axios.post("/authenticate", body)
            .then(() => {
                props.history.push("/cities")
            })
            .catch(() => {
                setIsLoginError(true)
            })
    }
    return (
        <div className="form__container">
            <div className="form__input-form">
                <label className="form__input-label">Username</label>
                <input
                    className="form__text-input"
                    type="text"
                    name="name"
                    autoFocus={true}
                    value={credentials.name}
                    onChange={onInputChange}
                />
            </div>
            <div className="form__input-form">
                <label className="form__input-label">Password</label>
                <input
                    className="form__text-input"
                    type="password"
                    name="pw"
                    value={credentials.pw}
                    onChange={onInputChange}
                />
            </div>
            <button className="btn" onClick={onFormSubmit}>Login</button>
            {isLoginError && <span>ERROR</span>}
        </div>
    )
}
export default Login