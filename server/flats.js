import pkg from 'easy-yandex-s3';
import multer from 'multer';
function convertFiltersToSQL(filters) {
	const sqlParams = [];
	Object.entries(filters).map(([key, value]) => {
		if (key === 'residence') {
			sqlParams.push(`${key} = '${value}'`);
		}
		if (key === 'rooms') {
			const sqlRooms = value.map((room) => `rooms = "${room}"`).join(' OR ');
			sqlParams.push(sqlRooms);
		}
		if (key === 'priceFrom') {
			sqlParams.push(`price > ${value}`);
		}
		if (key === 'priceTo') {
			sqlParams.push(`price < ${value}`);
		}
		if (key === 'metersFrom') {
			sqlParams.push(`m2 > '${value}'`);
		}
		if (key === 'metersTo') {
			sqlParams.push(`m2 < '${value}'`);
		}
	}, '');
	return sqlParams.join(' AND ');
}
// Подключаем модуль
export default function flats(app, pool) {
	let EasyYandexS3 = pkg.default;
	// Инициализация
	let s3 = new EasyYandexS3({
		auth: {
			accessKeyId: process.env.YANDEXS3_ACCESS_KEY_ID,
			secretAccessKey: process.env.YANDEXS3_SECRET_ACCESS_KEY,
		},
		Bucket: 'property-images', // например, "my-storage",
		debug: false, // Дебаг в консоли, потом можете удалить в релизе
	});
	// app.use(multer().any());

	app.post('/add_apartment', async (req, res) => {
		const { flat, floor, m2, price, year, residence, rooms } = req.body;
		const [scheme, ...photos] = req.files;
		let dataItemId;
		const urls = await pool
			.query('INSERT INTO property_apartments SET ?', {
				flat,
				floor,
				m2,
				price,
				year,
				residence,
				rooms,
			})
			.then((data) => {
				if (data[0]) {
					dataItemId = data[0].insertId;
					const upload = s3.Upload(
						[
							{
								buffer: scheme.buffer,
								name: scheme.originalname,
							},
							...photos.map((item) => {
								return {
									buffer: item.buffer,
									name: item.originalname,
								};
							}),
						],
						`/Flats/${data[0].insertId}/`,
					);
					res.json({ message: 'apartment successfully added' });
					return upload;
				}
				res.json({ message: 'error' });
				return;
			});
		urls.map((item, index) => {
			pool.query('INSERT INTO property_photos SET ?', {
				parentId: dataItemId,
				url: item.Location,
				type: index === 0 ? 'scheme' : 'photo',
			});
		});
	});
	app.get('/apartments/get_all', function (req, res) {
		// const {priceFrom, rooms} = req.query;

		console.log(convertFiltersToSQL(req.query));
		const sqlString =
			convertFiltersToSQL(req.query).length > 0
				? `(SELECT * FROM property_apartments WHERE ${convertFiltersToSQL(
						req.query,
				  )}) AS property_apartments`
				: 'property_apartments';
		pool
			.query(
				`SELECT * FROM ${sqlString}
				INNER JOIN property_photos ON property_apartments.id = property_photos.parentId 
				WHERE property_photos.type = "scheme"`,
			)
			.then((data) => {
				res.json(data[0]);
			});
	});
}
