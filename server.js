const express = require('express');
const next = require('next');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const dotenv = require('dotenv');
dotenv.config();

const dev = process.env.NODE_ENV !== 'production';
const prod = process.env.NODE_ENV === 'production';
const PORT = process.env.PORT;

const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
	const server = express();

	server.use(morgan('dev'));
	server.use(express.json());
	server.use(express.urlencoded({ extended: true }));
	server.use(cookieParser());
	server.use(
		expressSession({
			resave: true,
			saveUninitialized: false,
			secret: process.env.COOKIE_SECRET,
			cookie: {
				httpOnly: true,
				secure: false
			}
		})
	);

	server.get('*', (req, res) => {
		return handle(req, res);
	});

	server.listen(PORT, () => {
		console.log(PORT ? `Listening next + express server: localhost:${PORT} 👌` : 'Your server is dead... 💀');
	});
});
