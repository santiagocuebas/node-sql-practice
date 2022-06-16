
import { Router } from 'express';
import pool from '../database.js';
const router = Router();

router.get('/add', (req,res) => {
	res.render('links/add.hbs');
});

router.post('/add', (req, res) => {
	res.send('received');
});

export default router;
