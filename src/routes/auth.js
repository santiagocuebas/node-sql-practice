
import { Router } from 'express';
import passport from 'passport';
import { isLoggedIn, isNotLoggedIn } from '../lib/logged.js';

const router = Router();

router.get('/signup', isNotLoggedIn, (req, res) => res.render('auth/signup.hbs'));

router.post('/signup', isNotLoggedIn, passport.authenticate('signup', {
	successRedirect: '/profile',
	failureRedirect: '/signup',
	failureFlash: true
}));

router.get('/login', isNotLoggedIn, (req, res) => res.render('auth/login'));

router.post('/login', isNotLoggedIn, passport.authenticate('login', {
	successRedirect: '/profile',
	failureRedirect: '/login',
	failureFlash: true
}));

router.get('/profile', isLoggedIn, (req, res) => res.render('profile.hbs'));

router.get('/logout', isLoggedIn, (req, res, next) => {
	req.logout(err => {
		if (err) return next(err);
		res.redirect('/login');
	});
});

export default router;
