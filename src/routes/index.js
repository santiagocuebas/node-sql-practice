
import { Router } from 'express';
const router = Router();

import { isNotLoggedIn } from '../lib/logged.js';

router.get('/', isNotLoggedIn, (req, res) => res.render('index.hbs'));

export default router;
