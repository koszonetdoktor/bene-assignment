import React, { useState } from "react"
import axios from "../../utils/axios"
import { RouteComponentProps } from "react-router-dom"

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
                props.history.push("/list")
            })
            .catch(() => {
                setIsLoginError(true)
            })
    }
    console.log(props)
    return (
        <div>
            <form>
                <label>
                    Username
                    <input
                        type="text"
                        name="name"
                        autoFocus={true}
                        value={credentials.name}
                        onChange={onInputChange}
                    />
                </label>
                <label>
                    Password
                    <input
                        type="text"
                        name="pw"
                        value={credentials.pw}
                        onChange={onInputChange}
                    />
                </label>
            </form>
            <button onClick={onFormSubmit}>Login</button>
            {isLoginError && <span>ERROR</span>}
        </div>
    )
}
export default Login