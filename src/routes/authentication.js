
import { Router } from 'express';
const router = Router();

import passport from 'passport';

router.get('/signup', (req, res) => res.render('auth/signup.hbs'));

router.post('/signup', passport.authenticate('local.signup', {
		successRedirect: '/profile',
		fairuleRedirect: '/signup',
		fairuleFlash: true
}));

router.get('/login', (req, res) => res.render('auth/login'));

router.post('/login', (req, res, next) => {
	passport.authenticate('local.login', {
		successRedirect: '/profile',
		failureRedirect: '/login',
		failureFlash: true
	})(req, res, next);
});

router.get('/profile', (req, res) => res.send('profile.hbs'));

export default router;
