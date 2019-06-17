import React from "react";
import axios from "../utils/axios"
import { Redirect } from "react-router";

function withAuthentication(WrappedComponent) {
    return class Component extends React.Component {
        state = {
            isAuth: true,
            loading: true
        }

        componentDidMount() {
            axios.get("/validateCredentials")
                .then(() => {
                    this.setState({ loading: false })
                }).catch(() => {
                    this.setState({ isAuth: false, loading: false })
                })
        }

        render() {
            if (this.state.loading) {
                return null
            }
            else if (this.state.isAuth) {
                return <WrappedComponent {...this.props} />
            } else {
                return <Redirect to="/" />
            }
        }

    }
}
export default withAuthentication