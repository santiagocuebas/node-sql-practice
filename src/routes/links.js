
import { Router } from 'express';
import pool from '../database.js';

const router = Router();

router.get('/add', (req,res) => res.render('links/add.hbs'));

router.post('/add', async (req, res) => {
	const { title, url, description } = req.body;
	const newLink = {
		title,
		url,
		description
	};
	await pool.query('INSERT INTO links SET ?', [newLink]);
	req.flash('success', 'Link Saved Successfully');
	res.redirect('/links');
});

router.get('/', async (req,res) => {
	const links = await pool.query('SELECT * FROM links');
	res.render('links/list.hbs', { links });
});

router.get('/edit/:id', async (req, res) => {
	const { id } = req.params;
	const links = await pool.query('SELECT * FROM links Where id = ?', [id])
	console.log(links);
	res.render('links/edit.hbs', { link: links[0] });
});

router.post('/edit/:id', async (req, res) => {
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

router.get('/delete/:id', async (req, res) => {
	const { id } = req.params;
	await pool.query('DELETE FROM links Where id = ?', [id]);
	req.flash('success', 'Link Deleted Successfully');
	res.redirect('/links');
});

export default router;
