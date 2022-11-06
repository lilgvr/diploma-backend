const passport = require('passport');
const LocalStrategy = require('passport-local');
const crypto = require('crypto');

passport.use(new LocalStrategy(async (username: string, password: string, done: (...arg: any) => void) => {

}))
