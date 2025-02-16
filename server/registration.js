export default function registration(app, pool) {
	app.get('/', function (req, res) {
		pool.query('SELECT * FROM property_users').then((data) => {
			res.json(data[0]);
		});
	});

	app.post('/authorize_user', async (req, res) => {
		const { email, password } = req.body.params;
		pool
			.query(
				`SELECT * FROM property_users WHERE property_users.email = '${email}' AND property_users.password = '${password}'`,
			)
			.then((data) => {
				if (data[0].length) {
					res.json({ authorize: true, user: data[0][0] });
					return;
				}
				res.json({ authorize: false });
			});
	});

	app.get('/authorize_user_by_id/:user_id', function (req, res) {
		pool
			.query(
				`SELECT * FROM property_users WHERE property_users.id = ?`,
				req.params.user_id,
			)
			.then((data) => {
				res.json(data[0]);
			});
	});

	app.get('/confirm_user/:user_email', function (req, res) {
		pool
			.query(
				`SELECT * FROM property_users WHERE property_users.email = ?`,
				req.params.user_email,
			)
			.then((data) => {
				if (data[0].length) {
					res.json({ confirmed: true });
					return;
				}
				res.json({ confirmed: false });
			});
	});

	app.post('/add_user', async (req, res) => {
		const { user } = req.body;
		pool
			.query('INSERT INTO property_users SET ?', { ...user, role: 'user' })
			.then((data) => {
				if (data[0]) {
					res.json({ message: 'user successfully added' });
					return;
				}
				res.json({ message: 'error' });
			});
	});

	app.post('/change_user', async (req, res) => {
		const { user } = req.body;
		const { id, name, email, password } = user;
		const sqlRequest = updateTable({
			tableName: 'property_users',
			id,
			data: { name, email, password },
		});
		pool.query(sqlRequest).then((data) => {
			if (data[0]) {
				res.json({ message: 'user successfully changed' });
				return;
			}
			res.json({ message: 'error' });
		});
	});
}
