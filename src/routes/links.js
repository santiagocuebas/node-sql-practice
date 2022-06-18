
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
	await pool.query('INSERT INTO links SET ?', newLink);
	res.redirect('/links');
});

router.get('/', async (req,res) => {
	const links = await pool.query('SELECT * FROM links');
	res.render('links/list.hbs', { links });
})

export default router;
