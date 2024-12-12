import pkg from 'easy-yandex-s3';
import multer from 'multer';

// Подключаем модуль
export default function residences(app, pool) {
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

	app.post('/add_residence', async (req, res) => {
		const {
			name,
			type,
			description,
			categoriesNames,
			categoriesDescriptions,
			priceFrom,
			area,
			remoteness,
		} = req.body;
		let dataItemId;
		console.log(req.files, 'files');
		const galleryPhotos = req.files.filter(
			(item) => item.fieldname === 'gallery[]',
		);
		const categoryPhotos = req.files.filter(
			(item) => item.fieldname === 'categoriesPhotos[]',
		);
		const urlsGallery = await pool
			.query('INSERT INTO property_residences SET ?', {
				name,
				description,
				priceFrom,
				area,
				remoteness,
				type,
			})
			.then((data) => {
				if (data[0]) {
					dataItemId = data[0].insertId;
					const upload = s3.Upload(
						[
							...galleryPhotos.map((item) => {
								return {
									buffer: item.buffer,
									name: item.originalname,
								};
							}),
						],
						`/Residences/${data[0].insertId}/gallery/`,
					);
					res.json({ message: 'apartment successfully added' });
					return upload;
				}
				res.json({ message: 'error' });
				return;
			});
		urlsGallery.map((item) => {
			pool.query('INSERT INTO property_residences_gallery SET ?', {
				parentId: dataItemId,
				url: item.Location,
			});
		});
		const urlsCategory = await s3.Upload(
			[
				...categoryPhotos.map((item) => {
					return {
						buffer: item.buffer,
						name: item.originalname,
					};
				}),
			],
			`/Residences/${dataItemId}/category/`,
		);
		urlsCategory.map((item, index) => {
			pool.query('INSERT INTO property_residences_category SET ?', {
				parentId: dataItemId,
				url: item.Location,
				description: categoriesDescriptions[index],
				name: categoriesNames[index],
			});
		});
	});
	app.get('/residences/get_all', async function (req, res) {
		const { residence_id = undefined } = req.query;
		const [residences] = await pool.query(
			`SELECT *
				FROM property_residences`,
		);
		const [gallery] = await pool.query(
			`SELECT *
				FROM property_residences_gallery`,
		);
		const [categories] = await pool.query(
			`SELECT *
				FROM property_residences_category`,
		);
		const result = residences.map((residence) => {
			return {
				...residence,
				gallery: gallery.filter(
					(galleryItem) => galleryItem.parentId === residence.id,
				),
				categories: categories.filter(
					(categoryItem) => categoryItem.parentId === residence.id,
				),
			};
		});
		return res.json(result);
	});
	app.get('/residences/handbook', async function (_, res) {
		const [residences] = await pool.query(`SELECT * FROM property_residences`);
		const result = residences.map(({ name }) => name);
		return res.json(result);
	});
}
