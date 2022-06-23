
import passport from 'passport';
import LocalStrategy from 'passport-local';

import pool from '../database.js';
import helpers from '../lib/helpers.js';

passport.use('local.login', new LocalStrategy({
	usernameField: 'username',
	passwordField: 'password',
	passReqToCallback: true
}, async (req, username, password, done) => {
	const data =  await pool.query('SELECT * FROM users Where username = ?', [username]);
	if (data.length > 0) {
		const user = data[0];
		const validPassword = await helpers.matchPassword(password, user.password);
		if (validPassword) done(null, user, req.flash('success', 'Welcome ' + user.username));
		else done(null, false, req.flash('message', 'Incorrect Password'));
	} else return done(null, false, req.flash('message', 'The Username does not exists'));
}));

passport.use('local.signup', new LocalStrategy({
	usernameField: 'username',
	passwordField: 'password',
	passReqToCallback: true
}, async (req, username, password, done) => {
	const { fullname } = req.body;
	const newUser = {
		username,
		password,
		fullname
	};
	newUser.password = await helpers.encryptPassword(password);
	const res = await pool.query('INSERT INTO users Set ?', [newUser]);
	newUser.id = res.insertId;
	return done(null, newUser);
}));

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser( async (id, done) => {
	const data = await pool.query('SELECT * FROM users Where id = ?', [id]);
	done(null, data[0]);
});

export default passport;
