export default function registration(app, pool) {
	app.get('/apartments', function (req, res) {
		pool.query('SELECT * FROM property_users').then((data) => {
			res.json(data[0]);
		});
	});

}
