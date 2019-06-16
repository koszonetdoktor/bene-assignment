const { Pool } = require('pg')
const express = require("express")
const bodyParse = require("body-parser")
const http = require("http")
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")

const app = express()
const port = 3000

const pool = new Pool({
    user: 'gergohalmi',
    host: 'localhost',
    database: 'testdb',
    port: 5432
})

app.use(express.static("../"))
app.use(bodyParse.json())
app.use(cookieParser())


const withAuth = function (req, res, next) {
    console.log("called")
    const token =
        req.cookies.token;
    if (!token) {
        res.status(401).send('Unauthorized: No token provided');
    } else {
        console.log("token", token)
        jwt.verify(token, "mysecretsshhh", function (err, decoded) {
            if (err) {
                res.status(401).send('Unauthorized: Invalid token');
            } else {
                console.log("verified", decoded)
                req.name = decoded.name;
                next();
            }
        });
    }
}

app.get("/", (req, res) => {
    console.log("request")
    res.sendFile(path.join(__dirname, "../", "index.html"))
})

app.post("/authenticate", (request, response) => {
    const { name, password } = request.body

    console.log(name, password)

    const payload = { name };
    const token = jwt.sign(payload, "mysecretsshhh", {
        expiresIn: '1h'
    });
    response.cookie('token', token, { httpOnly: true })
        .sendStatus(200);
})

app.get("/users/:name/cities", (request, response) => {
    const { name } = request.params
    pool.query("SELECT * FROM users_cities WHERE user_name = $1", [name], (err, res) => {
        if (err) {
            console.error(err)
            response.err(err)
        }
        response.json(res.rows)
    })
})

app.post("/users/:name/cities", (request, response) => {
    const { name } = request.params
    const { cityId } = request.body

    pool.query("INSERT INTO users_cities(user_name, city_id) VALUES($1, $2)", [name, cityId], (err, res) => {
        if (err) {
            response.err(err)
        }
        response.redirect(`/users/${name}/cities`)
    })
})

app.get("/cities/:filterName", withAuth, (request, response) => {
    const { filterName } = request.params
    console.log("PAR", request.name)

    pool.query("SELECT geonameid, name FROM geoname WHERE name ILIKE '%' || $1 ||'%' LIMIT 5", [filterName], (err, res) => {
        if (err) {
            response.send(400, err)
        }
        response.json(res.rows)
    })
})

app.get("/weather/:cityId", withAuth, (request, response) => {
    const { cityId } = request.params
    getWeatherInfo(cityId)
        .then((rawWeather) => {
            const weatherResp = {
                sunriseTime: rawWeather.sys.sunrise,
                sunsetTime: rawWeather.sys.sunset,
                temperature: rawWeather.main.temp,
                stateIconId: rawWeather.weather[0].id
            }
            response.json(weatherResp)
        }).catch((err) => {
            response.send(400, err)
        })
})

async function getWeatherInfo(cityId) {
    const waetherToken = "64b4679f700d4d3cfb9c804f16e90acf"
    return new Promise((resolve, reject) => {
        http.get(`http://api.openweathermap.org/data/2.5/weather?id=${cityId}&units=metric&appid=${waetherToken}`, (res) => {
            let body = ""
            res.on("data", (data) => {
                body += data
            })
            res.on("end", () => {
                resolve(JSON.parse(body))
            })
        }).on("error", (err) => {
            reject(err)
        })
    })
}

app.listen(port, () => console.log(`App is listening to port ${port}`))

pool.query("SELECT * FROM geoname WHERE name='Budapest'", (err, res) => {
    console.log(res.rows, err)
})
