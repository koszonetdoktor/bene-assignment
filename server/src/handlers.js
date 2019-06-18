const jwt = require("jsonwebtoken")
const config = require("./config.json")
const { pool } = require("./db")
const http = require("http")

module.exports.authenticate = (request, response) => {
    const { name, password } = request.body
    pool.query("SELECT * FROM users WHERE name = $1 AND password = $2", [name, password], (err, res) => {
        if (err) {
            response.status(500)
                .json({
                    error: 'Incorrect email or password'
                })
        }
        if (res.rows.length) {
            const payload = { name };
            const token = jwt.sign(payload, config.auth.secret, {
                expiresIn: '1h'
            });
            response.cookie('token', token, { httpOnly: true })
                .sendStatus(200);
        } else {
            response.status(401)
                .json({
                    error: 'Incorrect email or password'
                })
        }
    })
}

module.exports.getUserCities = async (request, response) => {
    const { name } = request
    try {
        const cityIdsRes = await pool.query("SELECT city_id FROM users_cities WHERE user_name = $1", [name])

        const cityIds = cityIdsRes.rows.map((row) => (row.city_id))
        const paramQueries = cityIdsRes.rows.map((row, i) => (`$${i + 1}`))
        if (cityIds.length) {
            const citiesRes = await pool.query(`SELECT geonameid, name, timezone FROM geoname WHERE geonameid IN (${[...paramQueries]})`, cityIds)
            response.json(citiesRes.rows)
        } else {
            response.json([])
        }
    } catch (err) {
        response.err(err)
    }
}

module.exports.addCityToUser = (request, response) => {
    const { name } = request
    const { cityId } = request.body

    pool.query("INSERT INTO users_cities(user_name, city_id) VALUES($1, $2)", [name, cityId], (err, res) => {
        if (err) {
            response.err(err)
        }
        response.redirect("/users/cities")
    })
}

module.exports.getFilteredCities = (request, response) => {
    const { filterName } = request.params

    pool.query("SELECT geonameid, name, timezone FROM geoname WHERE name ILIKE '%' || $1 ||'%' LIMIT 8", [filterName], (err, res) => {
        if (err) {
            response.status(400).send({ error: err })
        }
        response.json(res.rows)
    })
}

module.exports.getCityWeather = (request, response) => {
    const { cityId } = request.params
    getWeatherInfo(cityId)
        .then((rawWeather) => {
            const weatherResp = {
                sunriseTime: rawWeather.sys.sunrise,
                sunsetTime: rawWeather.sys.sunset,
                temperature: rawWeather.main.temp,
                weather: {
                    stateIconId: rawWeather.weather[0].id,
                    description: rawWeather.weather[0].description
                }
            }
            response.json(weatherResp)
        }).catch((err) => {
            response.status(400).send({ error: err })
        })
}

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
