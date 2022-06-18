
import express from 'express';
import morgan from 'morgan';
import { engine } from 'express-handlebars';
import session from 'express-session';
import validator from 'express-validator';
import passport from 'passport';
import flash from 'connect-flash';
import MySQLStore from 'express-mysql-session';
import bodyParser from 'body-parser';

import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// IndexRoutes
import iRoutes from './routes/index.js';
import handlebars from './lib/handlebars.js';
import aRoutes from './routes/authentication.js';
import lRoutes from './routes/links.js';

// Initializations 
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

// Settings
app.set('port', process.env.PORT || 3000);
app.set('views', join(__dirname, 'views'));
app.engine('.hbs', engine({
	defaultLayout: 'main',
	layaoutsDir: join(app.get('views'), 'layouts'),
	partialsDir: join(app.get('views'), 'partials'),
	extname: '.hbs',
	helpers: handlebars

}));
app.set('view engine', '.hbs');

// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Global Variables
app.use((req,res,next)=>{
	next();
});

// Routes
app.use(iRoutes);
app.use(aRoutes);
app.use('/links',lRoutes);

// Static Files
app.use(express.static(join(__dirname, 'public')));

// Listening
app.listen(app.get('port'));
console.log('Server on port', app.get('port'));
