<script>
	import { routes } from './routes.js';

	let money = 1500000000;

	function numberWithCommas(x) {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	}

	function minMaxValue(node) {
		const min = +node.min;
		const max = +node.max;
		const id = node.id;

		node.addEventListener('input', (e) => {
			node.value = node.value.replace(/[^\d]/g, '');
			const value = +node.value;
			routes[id].bought = value;
			if (node.max & (value > max)) {
				node.value = max;
				routes[id].bought = max;
			} else if (value < min) {
				node.value = min;
				routes[id].bought = min;
			} else if (value == '') {
				node.value = 0;
				routes[id].bought = 0;
			} else if (/^0+/.test(node.value)) {
				node.value = node.value.replace(/^0+/, '');
				routes[id].bought = node.value;
			}
		});
	}

	function addMoney(num) {
		const step = num > 100 ? num / 10 : 1;
		const finalAmount = money + num;
		const t = Math.round(500 / (num / step));
		let interval = setInterval(() => {
			money += step;
			if (money == finalAmount) {
				clearInterval(interval);
			}
		}, t);
	}

	function delMoney(num) {
		const step = num > 100 ? num / 10 : 1;
		const finalAmount = money - num;
		const t = Math.round(500 / (num / step));
		let interval = setInterval(() => {
			money -= step;
			if (money == finalAmount) {
				clearInterval(interval);
			}
		}, t);
	}

	function itemBuy(id) {
		if (money >= routes[id].price) {
			if (!routes[id].infinitely && routes[id].bought != routes[id].amount) {
				++routes[id].bought;
				delMoney(routes[id].price);
			} else if (routes[id].infinitely) {
				++routes[id].bought;
				delMoney(routes[id].price);
			}
		}
	}

	function itemSell(id) {
		if (routes[id].bought != 0) {
			--routes[id].bought;
			addMoney(routes[id].price);
		}
	}
</script>

<div class="title">
	<img src="../../../src/image/mrglist.jpg" alt="MrBeast" class="header-img" />
	Spend Mr.Beast Money
</div>

<div class="money-bar">${numberWithCommas(money)}</div>

<div class="items">
	{#each routes as product}
		<div>
			<div class="item">
				<img src={product.image} alt={product.title} class="item-img" />
				<div class="item-title">{product.title}</div>
				<div class="item-price">${numberWithCommas(product.price)}</div>
				<div class="item-controls">
					<button class="item-sell" on:click={() => itemSell(product.id)}>Sell</button>
					{#if !product.infinitely}
						<input
							id={product.id}
							type="number"
							class="item-input"
							min="0"
							max={product.amount}
							value={product.bought}
							use:minMaxValue
							readonly
						/>
					{:else}
						<input
							id={product.id}
							type="number"
							class="item-input"
							min="0"
							value={product.bought}
							use:minMaxValue
							readonly
						/>
					{/if}
					<button class="item-buy" on:click={() => itemBuy(product.id)}>Buy</button>
				</div>
			</div>
		</div>
	{/each}
</div>

<style>
	div {
		display: block;
	}

	button {
		cursor: pointer;
		padding: 10px 12px;
		border-radius: 3px;
		color: #fff;
		border: none;
		font-weight: 700;
		touch-action: manipulation;
	}

	.title {
		font-size: 32px;
		background: #fff;
		padding: 30px 20px;
		margin-bottom: 10px;
		font-weight: 700;
		text-align: center;
		line-height: 1.3em;
	}

	.header-img {
		display: block;
		width: 125px;
		height: 125px;
		margin: 10px auto 25px;
		border-radius: 125px;
	}

	.money-bar {
		color: #fff;
		background-color: #2ecc71;
		background: linear-gradient(180deg, #2ecc71, #1abc9c);
		padding: 20px;
		margin: 10px 0;
		font-family: Roboto, sans-serif;
		font-size: 32px;
		font-weight: 700;
		text-align: center;
		top: 0;
		position: sticky;
		z-index: 9999;
	}

	.items {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		grid-gap: 10px 10px;
	}

	.item {
		max-width: 100%;
		background-color: #fff;
		text-align: center;
		font-size: 18px;
		padding: 20px 15px;
		width: 100%;
	}

	.item-img {
		display: block;
		margin: 15px auto;
		height: 120px;
		max-width: 100%;
		-o-object-fit: contain;
		object-fit: contain;
	}

	.item-title {
		font-size: 22px;
		font-weight: 700;
	}

	.item-price {
		font-size: 20px;
		color: #24c486;
	}

	.item-controls {
		font-size: 20px;
		font-weight: 700;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		grid-gap: 10px 10px;
		margin-top: 25px;
	}

	.item-sell {
		background: linear-gradient(180deg, #f53b82, #f53b57);
	}

	.item-buy {
		background: linear-gradient(180deg, #2ecc71, #1abc9c);
	}

	.item-input {
		padding: 9px 12px;
		border-radius: 3px;
		border: 1px solid #b2bec3;
		color: #333;
		width: 100%;
		text-align: center;
		font-size: 20px;
	}
</style>
