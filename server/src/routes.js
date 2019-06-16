const { Router } = require("express")
const handlers = require("./handlers")
const authorization = require("./auth")

const router = Router()

router.post("/authenticate", handlers.authenticate)

router.get("/users/cities", authorization, handlers.getUserCities)

router.post("/users/cities", authorization, handlers.addCityToUser)

router.get("/city/:filterName", authorization, handlers.getFilteredCities)

router.get("/weather/:cityId", authorization, handlers.getCityWeather)

module.exports = router