
import passport from 'passport';
import LocalStrategy from 'passport-local';
import pool from '../database.js';
import { encryptPassword, matchPassword } from './bcrypt.js';
import {
	isValidEmail,
	isValidLastname,
	isValidName,
	isValidPassword
} from './services.js';

passport.use('login', new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password',
	passReqToCallback: true
}, async (req, email, password, done) => {
	const data =  await pool.query('SELECT * FROM users Where email = ?', [email]);
	const data2 = data[0];
	if (data2.length > 0) {
		const user = data2[0];
		const validPassword = await matchPassword(password, user.password);
		if (validPassword) done(null, user);
		else return done(null, false, req.flash('message', 'Incorrect Password'));
	} else return done(null, false, req.flash('message', 'The email does not exists'));
}));

passport.use('signup', new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password',
	passReqToCallback: true
}, async (req, email, password, done) => {
	const { name, lastname } = req.body;

	const matchName = isValidName(name);
	const matchLastname = isValidLastname(lastname);
	const matchEmail = await isValidEmail(email);
	const matchPassword = isValidPassword(password);
	
	if (
		matchName &&
		matchLastname &&
		matchEmail &&
		matchPassword
	) {
		const newUser = {
			email,
			password,
			name,
			lastname
		};
		
		// Encrypt passworld
		newUser.password = await encryptPassword(password);

		// Saving in the database
		const res = await pool.query('INSERT INTO users Set ? ', [newUser]);
		newUser.id = res[0].insertId;
		return done(null, newUser);
	} else return done(null, false, req.flash('message', 'An error has occurred'));
}));

passport.serializeUser((user, done) => {
	return done(null, user.id);
});

passport.deserializeUser( async (id, done) => {
	const data = await pool.query('SELECT * FROM users Where id = ?', [id]);
	return done(null, data[0][0]);
});

export default passport;
