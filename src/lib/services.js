import pool from '../database.js';

// Validating signup fields
export const isValidName = value => {
	if (typeof value !== 'string') return false;
	if (value.length === 0) return false;
	return true;
};

export const isValidLastname = value => {
	if (typeof value !== 'string') return false;
	if (value.length === 0) return false;
	return true;
};

export const isValidEmail = async value => {
	const regex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

	const links = await pool.query('SELECT * FROM users Where email = ?', [value]);

	if (typeof value !== 'string') return false;
	if (!regex.exec(value)) return false;
	if (links[0].length > 0) return false;

	return true;
};

export const isValidPassword = value => {
	const regex = /^(?=\w*[0-9])(?=\w*[a-z])\S{8,40}$/;

	if (typeof value !== 'string') return false;
	if (!regex.exec(value)) return false;

	return true;
};
