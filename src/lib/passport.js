
import passport from 'passport';
import LocalStrategy from 'passport-local';

import pool from '../database.js';
import { encryptPassword, matchPassword } from './helpers.js';

passport.use('local.login', new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password',
	passReqToCallback: true
}, async (req, email, password, done) => {
	const data =  await pool.query('SELECT * FROM users Where email = ?', [email]);
	const data2 = data[0];
	if (data2.length > 0) {
		const user = data2[0];
		const validPassword = await matchPassword(password, user.password);
		if (validPassword) done(null, user, req.flash('success', `Welcome ${user.name} ${user.lastname}`));
		else done(null, false, req.flash('message', 'Incorrect Password'));
	} else return done(null, false, req.flash('message', 'The email does not exists'));
}));

passport.use('local.signup', new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password',
	passReqToCallback: true
}, async (req, email, password, done) => {
	const { name, lastname } = req.body;
	const newUser = {
		email,
		password,
		name,
		lastname
	};
	newUser.password = await encryptPassword(password);
	const res = await pool.query('INSERT INTO users Set ? ', [newUser]);
	newUser.id = res[0].insertId;
	return done(null, newUser);
}));

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser( async (id, done) => {
	const data = await pool.query('SELECT * FROM users Where id = ?', [id]);
	done(null, data[0]);
});

export default passport;
