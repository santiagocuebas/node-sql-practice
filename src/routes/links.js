
import { Router } from 'express';
import pool from '../database.js';
import { isLoggedIn } from '../lib/auth.js';

const router = Router();

router.get('/add', isLoggedIn, (req, res) => res.render('links/add.hbs'));

router.post('/add', isLoggedIn, async (req, res) => {
	const { title, url, description } = req.body;
	const newLink = {
		title,
		url,
		description,
		user_id: req.user[0].id
	};
	await pool.query('INSERT INTO links SET ? ', [newLink]);
	req.flash('success', 'Link Saved Successfully');
	res.redirect('/links');
});

router.get('/', isLoggedIn, async (req, res) => {
	const links = await pool.query('SELECT * FROM links Where user_id = ?', [req.user[0].id]);
	const links2 = links[0];
	res.render('links/list.hbs', { links: links2 });
});

router.get('/edit/:id', isLoggedIn, async (req, res) => {
	const { id } = req.params;
	const links = await pool.query('SELECT * FROM links Where id = ?', [id]);
	const links2 = links[0];
	res.render('links/edit.hbs', { link: links2[0] });
});

router.post('/edit/:id', isLoggedIn, async (req, res) => {
	const { id } = req.params;
	const { title, url, description } = req.body;
	const newLink = {
		title,
		url,
		description
	};
	await pool.query('UPDATE links SET ? Where id = ?', [newLink, id]);
	req.flash('success', 'Link Updated Successfully');
	res.redirect('/links');
});

router.get('/delete/:id', isLoggedIn, async (req, res) => {
	const { id } = req.params;
	await pool.query('DELETE FROM links Where id = ?', [id]);
	req.flash('success', 'Link Deleted Successfully');
	res.redirect('/links');
});

export default router;
