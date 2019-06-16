import React, { useState } from 'react';
import axios from "./utils/axios"

const App = () => {
    const [credentials, setCredentials] = useState<{ name: string, pw: string }>({ name: "", pw: "" })

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
            .then((resp) => {
                console.log("resp", resp)
            }).catch((err) => {
                console.error("ERRR", err)
            })
    }

    const onTestRequest = () => {
        axios.get("/users/admin/cities")
            .then((rep) => {
                console.log("rRESP", rep.data)
            }).catch(err => {
                console.error("ERRRR", err)
            })
    }

    return (
        <div>
            <form>
                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        autoFocus={true}
                        value={credentials.name}
                        onChange={onInputChange}
                    />
                </label>
                <label>
                    Password:
                    <input
                        type="text"
                        name="pw"
                        value={credentials.pw}
                        onChange={onInputChange}
                    />
                </label>
            </form>
            <button onClick={onFormSubmit}>Login</button>
            <button onClick={onTestRequest}>Test button</button>
        </div>
    );
}

export default App;
