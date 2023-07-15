export const routes = [
	{
		title: 'Big Mac',
		price: 2,
		infinitely: true,
		amount: 1,
		image: '../../../src/image/big-mac.jpg',
		bought: 0
	},
	{
		title: 'Nike',
		price: 10,
		infinitely: true,
		amount: 1,
		image: 'https://www.pngall.com/wp-content/uploads/5/Sylish-Men-Shoes-PNG-Picture.png',
		bought: 0
	},
	{
		title: 'Pepsi-cola',
		price: 25,
		infinitely: true,
		amount: 1,
		image:
			'https://storage.googleapis.com/tm-zopsmart-uploads/320/20220223/138485_2-20220223-140250.png',
		bought: 0
	},
	{
		title: '250 tons of TNT',
		price: 4700000,
		infinitely: true,
		amount: 1,
		image: 'https://fkpboz.ru/upload/information_system_1/4/1/0/item_410/information_items_410.jpg',
		bought: 0
	},
	{
		title: 'MRBEAST Milk Chocolate',
		price: 22,
		infinitely: true,
		amount: 1,
		image: 'https://feastables.com/cdn/shop/products/Milk-Box_238x@2x.png?v=1678318130',
		bought: 0
	},
	{
		title: 'YouTube Channel',
		price: 1000000000,
		infinitely: false,
		amount: 1,
		image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/640px-YouTube_full-color_icon_%282017%29.svg.png',
		bought: 1
	}
];

routes.sort((a, b) => a.price - b.price);
routes.forEach((el, index) => (el.id = index));
