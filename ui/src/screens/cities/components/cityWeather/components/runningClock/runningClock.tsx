import React, { Fragment, useEffect, useRef, useState } from "react"
import moment from "moment-timezone"

interface Props {
    timezone: string
}

function RunningClock(props: Props) {

    const timer = useRef<any>()
    const [currentTime, setCurrentTime] = useState<{ hour: string, minute: string }>({ hour: "", minute: "" })
    useEffect(() => {
        timer.current = setInterval(() => {
            setCurrentTime({
                hour: moment.tz(props.timezone).format("HH"),
                minute: moment.tz(props.timezone).format("mm")
            })
        }, 1000)
        return () => {
            clearInterval(timer.current)
        }
    }, [])

    return (
        <Fragment>
            <span className="weather__current-time">{currentTime.hour}</span>
            <span className="weather__current-time">{currentTime.minute}</span>
        </Fragment>
    )
}
export default RunningClock