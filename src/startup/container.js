const { createContainer, asClass, asValue, asFunction } = require('awilix');

//Config
const config = require("../config");
const app = require(".");

//servicios
const { HomeService } = require("../services");

//controladores
const { HomeController } = require("../controllers");

//Rutas
const { HomeRoutes } = require("../routes/index.routes");
const Routes = require("../routes");

// Modelos
const { User, Comment, Idea } = require("../models");

const container = createContainer();

container.register({
    app: asClass(app).singleton(),
    router: asFunction(Routes).singleton(),
    config: asValue(config)
})
    .register({
        HomeService: asClass(HomeService).singleton()
    })
    .register({
        HomeController: asClass(HomeController.bind(HomeController)).singleton()
    })
    .register({
        HomeRoutes: asFunction(HomeRoutes).singleton()
    })
    .register({
        User: asValue(User),
        Idea: asValue(Idea),
        Comment: asValue(Comment)
    });

module.exports = container;

