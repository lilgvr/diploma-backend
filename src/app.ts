import { closeConnection, openConnection } from "./db";

const { PROJECT_ROOT, port, host } = require('../app.config');
const login = require('./routes/login');
const index = require("./routes");
const register = require('./routes/register');
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

app.set('view-engine', 'ejs');

// MySQL
openConnection();

// CORS
app.use(cors());

// Login
// app.use(passport.session());

// Routes
app.use("/", index);
app.use("/login", login);
app.use("/register", register);

// Static
app.use('/static', express.static(path.join(PROJECT_ROOT, 'static')));

app.listen(port, host, () => {
    console.log(`Server started on http://${ host }:${ port }`);
})

app.on('exit', () => {
    closeConnection();
})
