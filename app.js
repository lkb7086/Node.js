//> Modules.
//-----------------------------------------------------------------------
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv").config({ path: ".env" });
const cookie_parser = require("cookie-parser");
const path = require("path");
const jwt = require("jsonwebtoken");
const { redirect } = require("express/lib/response");
const fs = require("fs");
const { sequelize_game, sequelize_game_log, sequelize_receipt, sequelize_external, Sequelize }
    = require("./models");
const https = require("https");

const session = require('express-session');
const moment = require('moment');
require('moment-timezone');

const login = require("./managers/login");
const user_info = require("./managers/user_info");
const game_log = require("./managers/game_log");
const all_event = require("./managers/all_event");
const post_mail = require("./managers/post_mail");
const shop = require("./managers/shop");
const group_mail_reward = require("./managers/group_mail_reward");
const all_notification = require("./managers/all_notification");
const collection = require("./managers/collection");
const subscribe_manager = require("./managers/subscribe_manager");
//-----------------------------------------------------------------------

const app = express();

app.set('http_port', process.env.HTTP_PORT || 2011);

app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'keyboard',
    cookie: {
        httpOnly: true,
        secure: false,
    },
}));

app.db = sequelize_game;
app.db_game_log = sequelize_game_log;
app.db_receipt = sequelize_receipt;
app.db_external = sequelize_external;
app.seq = Sequelize;

moment.tz.setDefault('Asia/Seoul');

//-----------------------------------------------------------------------
app.use(morgan("dev"));
app.use(cors());
app.use(express.static(path.join(__dirname, "/pages")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", check_session, function (req, res) {
    console.log('debug: show page');
});

login.register(app);
user_info.register(app);
game_log.register(app);
all_event.register(app);
post_mail.register(app);
shop.register(app);
group_mail_reward.register(app);
all_notification.register(app);
collection.register(app);
subscribe_manager.register(app);

if (process.env.NODE_ENV === 'live') {

} else if (process.env.NODE_ENV === 'development') {
    app.listen(app.get("http_port"), () => {
        console.log(`Waiting `, app.get("http_port"), " port");
        //console.log(`Example app listening on port ${port}`)
    })
}

//----------------------------------------------------------------
function connect_db() {
    sequelize_game.sync({ force: false })
        .then(() => {
            console.log("DB(game) connected");
        })
        .catch((err) => {
            console.log(err);
        });

    sequelize_game_log.sync({ force: false })
        .then(() => {
            console.log("DB(game_log) connected");
        })
        .catch((err) => {
            console.log(err);
        });

    sequelize_receipt.sync({ force: false })
        .then(() => {
            console.log("DB(receipt) connected");
        })
        .catch((err) => {
            console.log(err);
        });

    sequelize_external.sync({ force: false })
        .then(() => {
            console.log("DB(external) connected");
        })
        .catch((err) => {
            console.log(err);
        });
}
//----------------------------------------------------------------

// 세션 인증 판단
//----------------------------------------------------------------
function check_session(req, res, next) {
    if (process.env.NODE_ENV === 'development') {
        if (req.session.user_id === undefined) {
            fs.readFile("./html/account.html", (error, data) => {
                res.end(data);
            });
        } else {
            fs.readFile("./html/main.html", (error, data) => {
                res.end(data);
            });
        }
    } else if (process.env.NODE_ENV === 'live') {
        fs.readFile("./html/main.html", (error, data) => {
            res.end(data);
        });
    } else {
        return;
    }
}
//----------------------------------------------------------------