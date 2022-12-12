import express from 'express';
import morgan from 'morgan';
import { engine } from 'express-handlebars';
import session from 'express-session';
import passport from 'passport';
import flash from 'connect-flash';
import MySQLStore from 'express-mysql-session';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { PORT } from './config.js';
import pool from './database.js';
import * as helpers from './lib/helpers.js';
import './lib/passport.js';

// Index Routes
import iRoutes from './routes/index.js';
import aRoutes from './routes/auth.js';
import lRoutes from './routes/links.js';

// Initializations 
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

// Settings
app.set('port', PORT);
app.set('views', join(__dirname, 'views'));
app.engine('.hbs', engine({
	defaultLayout: 'main',
	layoutsDir: join(app.get('views'), 'layouts'),
	partialsDir: join(app.get('views'), 'partials'),
	extname: '.hbs',
	helpers
}));
app.set('view engine', '.hbs');

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(session({
	key: 'unnombrecualquiera',
	secret: 'otronombrecualquiera',
	store: new MySQLStore({}, pool),
	resave: false,
	saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// Global Variables
app.use((req, res, next) => {
	app.locals.message = req.flash('message');
	app.locals.success = req.flash('success');
	app.locals.user = req.user;
	next();
});

// Routes
app.use(iRoutes);
app.use(aRoutes);
app.use('/links',lRoutes);

// Static Files
app.use(express.static(join(__dirname, 'public')));

// Listening
app.listen(PORT);
console.log('Server on port', PORT);
