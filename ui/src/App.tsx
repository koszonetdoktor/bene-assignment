import React, { useState } from 'react';
import axios from "./utils/axios"
import { BrowserRouter as Router, Route } from "react-router-dom"
import Login from "./screens/login"
import CitiesList from "./screens/citiesList"

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
        axios.get("/users/cities")
            .then((rep) => {
                console.log("rRESP", rep.data)
            }).catch(err => {
                console.error("ERRRR", err)
            })
    }
    const onTestRequest2 = () => {
        axios.post("/users/cities", {
            cityId: 558055
        })
            .then((rep) => {
                console.log("rRESP", rep.data)
            }).catch(err => {
                console.error("ERRRR", err)
            })
    }
    const onTestRequest3 = () => {
        axios.get("/cities/buda")
            .then((rep) => {
                console.log("rRESP", rep.data)
            }).catch(err => {
                console.error("ERRRR", err)
            })
    }
    const onTestRequest4 = () => {
        axios.get("/weather/3054643")
            .then((rep) => {
                console.log("rRESP", rep.data)
            }).catch(err => {
                console.error("ERRRR", err)
            })
    }
    return (
        <Router>
            <Route exact path="/" component={Login} />
            <Route path="/list" component={CitiesList} />
        </Router>
    );
}

export default App;