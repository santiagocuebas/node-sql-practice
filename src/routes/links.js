
import { Router } from 'express';
import pool from '../database.js';
const router = Router();

router.get('/add', (req,res) => {
	res.render('links/add.hbs');
})

export default router;
