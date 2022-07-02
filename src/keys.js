
import { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE } from './config.js'

export const database = {
		host: DB_HOST,
		user: DB_USER,
		password: DB_PASSWORD,
		database: DB_DATABASE,
		waitForConnections: true,
		connectionLimit: 10,
		queueLimit: 0
}
