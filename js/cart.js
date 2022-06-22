document.addEventListener('DOMContentLoaded', () => {
    //Было product btn
	const favorite_btn = document.querySelectorAll('.favorite_btn');
	const cartProductsList = document.querySelector('.cart-content__list');
    //Было cart
	const favorite = document.querySelector('.favorite');
	const cartQuantity = document.querySelector('.notify'); 
	const fullPrice = document.querySelector('.fullprice');
	// const orderModalOpenProd = document.querySelector('.order-modal__btn');
	// const orderModalList = document.querySelector('.order-modal__list');

	//Получает значение атрибута и записывает в localstorage
	const productBtn = document.querySelectorAll('.product');
	productBtn.forEach((Btn) =>{
		Btn.addEventListener('click', (e) => {
			let numberBtn = e.target.closest('.product');
			let NIndex = numberBtn.getAttribute('data-id');
			localStorage.setItem('NIndex', NIndex);		
		});
	})
	
	let price = 0;
	// let randomId = 0;
    //Чистит цифры  и пробелы
	const priceWithoutSpaces = (str) => {
		return str.replace(/\s/g, '');
	};
	//Возврощает все пробелы
	const normalPrice = (str) => {
		return String(str).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
	};
   
	const plusFullPrice = (currentPrice) => {
		return price += currentPrice;
	};

	const minusFullPrice = (currentPrice) => {
		return price -= currentPrice;
	};

	//Добавляет уведомление
	const printQuantity = () => {
		let productsListLength = cartProductsList.querySelector('.suda').children.length;
		cartQuantity.textContent = productsListLength;
		productsListLength > 0 ? cartQuantity.classList.add('active') : cartQuantity.classList.remove('active');
	};

	// console.log(printQuantity());
	//Выводим полную цену
	// const printFullPrice = () => {
	// 	fullPrice.textContent = `${normalPrice(price)}€`;
	// };

	const generateCartProduct = (img, title, price, id) => {
		return `			
            <aricle class="productik" data-id="${id}">
                <div href="#" class="product_link">
                    <div class="product_img">
                        <img src="${img}" alt="creatine">
                    </div>
                    <div class="product_row">
                        <div class="product_flex">
                            <button class="favorite_btn btn">
                                <svg width="21" height="19" viewBox="0 0 21 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M14.7749 0.999994C13.1219 0.999994 11.5355 1.76798 10.5 2.98159C9.46448 1.76798 7.87798 0.999994 6.22499 0.999994C3.29899 0.999994 1 3.29447 1 6.21469C1 9.79858 4.22999 12.7189 9.12248 17.1561L9.73284 17.7064C10.1681 18.0989 10.8307 18.0977 11.2644 17.7036L11.8775 17.1466C16.7699 12.7189 20 9.79858 20 6.21469C20 3.29447 17.701 0.999994 14.7749 0.999994Z" />
                                    </svg>                                                     
                            </button>
                            <h3 class="product_title">${title}</h3>
                            <span class="product_price">${normalPrice(price)}</span>
                        </div>
                        <div class="functional_panel">
                            <div class="f_last">
                                <button class="plus func" data-id="${id}">+</button>
                                <span class="number">1</span>
                                <button class="minus func">-</button>
                            </div>
                            <div class="functional_remove">
                                <button class="remove">Remove</button>
                            </div>       
                        </div>
                    </div>
                </div>
            </aricle>
		`;
	};

	const deleteProducts = (productParent) => {
		let id = productParent.querySelector('.cart-product').dataset.id;
		document.querySelector(`.product[data-id="${id}"]`).querySelector('.product__btn').disabled = false;
		
		let currentPrice = parseInt(priceWithoutSpaces(productParent.querySelector('.cart-product__price').textContent));
		minusFullPrice(currentPrice);
		// printFullPrice();
		productParent.remove();

		printQuantity();
        
		updateStorage();
	};

	favorite_btn.forEach(el => {
		// Выдает рандомный айди каждой карточки
		// el.closest('.product').setAttribute('data-id', randomId++);
		el.addEventListener('click', (e) => {
			let self = e.currentTarget;
			let parent = self.closest('.product');
			let id = parent.dataset.id;
			let img = parent.querySelector('.product_img img').getAttribute('src');
			let title = parent.querySelector('.product_title').textContent;
			let priceString = priceWithoutSpaces(parent.querySelector('.product_price').textContent);
			let priceNumber = parseInt(priceWithoutSpaces(parent.querySelector('.product_price').textContent));
			console.log(priceNumber);
			plusFullPrice(priceNumber);
			// printFullPrice();
			cartProductsList.querySelector('.suda').insertAdjacentHTML('afterbegin', generateCartProduct(img, title, priceString, id));
			printQuantity();		
			updateStorage();	
			self.disabled = true;
			self.classList.add('active');
		});
	});


	// cartProductsList.addEventListener('click', (e) => {
	// 	if (e.target.classList.contains('cart-product__delete')) {
	// 		deleteProducts(e.target.closest('.cart-content__item'));
	// 	}
	// });

	// let flag = 0;
	// orderModalOpenProd.addEventListener('click', (e) => {
	// 	if (flag == 0) {
	// 		orderModalOpenProd.classList.add('open');
	// 		orderModalList.style.display = 'block';
	// 		flag = 1;
	// 	} else {
	// 		orderModalOpenProd.classList.remove('open');
	// 		orderModalList.style.display = 'none';
	// 		flag = 0;
	// 	}
	// });

	// const generateModalProduct = (img, title, price, id) => {
	// 	return `
	// 		<li class="order-modal__item">
	// 			<article class="order-modal__product order-product" data-id="${id}">
	// 				<img src="${img}" alt="" class="order-product__img">
	// 				<div class="order-product__text">
	// 					<h3 class="order-product__title">${title}</h3>
	// 					<span class="order-product__price">${normalPrice(price)}</span>
	// 				</div>
	// 				<button class="order-product__delete">Удалить</button>
	// 			</article>
	// 		</li>
	// 	`;
	// };

	// const modal = new GraphModal({
	// 	isOpen: (modal) => {
	// 		console.log('opened');
	// 		let array = cartProductsList.querySelector('.simplebar-content').children;
	// 		let fullprice = fullPrice.textContent;
	// 		let length = array.length;

	// 		document.querySelector('.order-modal__quantity span').textContent = `${length} шт`;
	// 		document.querySelector('.order-modal__summ span').textContent = `${fullprice}`;
	// 		for (item of array) {
	// 			console.log(item)
	// 			let img = item.querySelector('.cart-product__img').getAttribute('src');
	// 			let title = item.querySelector('.cart-product__title').textContent;
	// 			let priceString = priceWithoutSpaces(item.querySelector('.cart-product__price').textContent);
	// 			let id = item.querySelector('.cart-product').dataset.id;

	// 			orderModalList.insertAdjacentHTML('afterbegin', generateModalProduct(img, title, priceString, id));

	// 			let obj = {};
	// 			obj.title = title;
	// 			obj.price = priceString;
	// 			productArray.push(obj);
	// 		}

	// 		console.log(productArray)
	// 	},
	// 	isClose: () => {
	// 		console.log('closed');
	// 	}
	// });

	// document.querySelector('.order').addEventListener('submit', (e) => {
	// 	e.preventDefault();
	// 	let self = e.currentTarget;

	// 	let formData = new FormData(self);
	// 	let name = self.querySelector('[name="Имя"]').value;
	// 	let tel = self.querySelector('[name="Телефон"]').value;
	// 	let mail = self.querySelector('[name="Email"]').value;
	// 	formData.append('Товары', JSON.stringify(productArray));
	// 	formData.append('Имя', name);
	// 	formData.append('Телефон', tel);
	// 	formData.append('Email', mail);

	// 	let xhr = new XMLHttpRequest();

	// 	xhr.onreadystatechange = function() {
	// 		if (xhr.readyState === 4) {
	// 			if (xhr.status === 200) {
	// 				console.log('Отправлено');
	// 			}
	// 		}
	// 	}

	// 	xhr.open('POST', 'mail.php', true);
	// 	xhr.send(formData);

	// 	self.reset();
	// });

	// Считаем сумму
	const countSumm = () => {
		// let price = 0;
		let tovar = Number(localStorage.getItem('tovar'));
		let biba = Number(localStorage.getItem('price'));	
		let lui = biba - tovar;	
		console.log(lui);	
		document.querySelectorAll('.productik').forEach(el => {			
			if (localStorage.getItem('tovar') !== null) { //Проверка на содержание данных price = lui + price;											
				if(tovar !== biba){								
					lui += parseInt(priceWithoutSpaces(el.querySelector('.product_price').textContent));			
					// price = price + lui;
					price = lui;
					console.log(price);
					// localStorage.setItem('price', lui);
				}else{
					price += parseInt(priceWithoutSpaces(el.querySelector('.product_price').textContent));	
				}
			}else{
				price += parseInt(priceWithoutSpaces(el.querySelector('.product_price').textContent));	
				console.log('тут пуста');
			}
			
		});
	};

	const initialState = () => {
		if (localStorage.getItem('products') !== null) {
			cartProductsList.querySelector('.suda').innerHTML = localStorage.getItem('products');
			// let parent = cartProductsList.querySelector('.suda');
			// console.log(parent)
			printQuantity();
			countSumm();
			// printFullPrice();
				
			document.querySelectorAll('.productik').forEach(el => {
				let id = el.dataset.id;						
				let nashel = document.querySelector(`.product[data-id="${id}"]`);           
                if(nashel !== null){
                    document.querySelector(`.product[data-id="${id}"]`).querySelector('.favorite_btn').disabled = true;
                    document.querySelector(`.product[data-id="${id}"]`).querySelector('.favorite_btn').classList.add('active');	
                }  
			});	
		}
	};

	initialState();
	// let lenig = Number(printQuantity());
	// console.log(lenig);
	const updateStorage = () => {
		let parent = cartProductsList.querySelector('.suda');
		console.log(parent)
		let html = parent.innerHTML;	
		if (html.length) {
			localStorage.setItem('products', html);
			localStorage.setItem('price', price);
			// localStorage.setItem('quanty' , printQuantity())
		} else {
			localStorage.removeItem('products');
			localStorage.removeItem('price');
		}
	};

	let search = document.querySelector('.header_search');
	let head = document.querySelector('header');
	let inpit = document.querySelector('#inpit');
	let funtional = document.querySelector('.header_functional');

	document.querySelector('.menu').addEventListener('change', (e) => {
		event.preventDefault();
		document.querySelector('nav').classList.toggle('table');	  
	});
	search.addEventListener('click', (e) => {   
		document.querySelector('.wrap').classList.toggle('active');	
		document.querySelector('.search').classList.toggle('active');	
		document.querySelector('nav').classList.toggle('active');	
		head.classList.toggle('hidden');
		inpit.focus();
	});

	funtional.addEventListener('click', (e) => {   
	document.querySelector('nav').classList.remove('table');	
	document.querySelector('input[type=checkbox]').checked=false;
	});
	// document.querySelector('.modal').addEventListener('click', (e) => {
	// 	if (e.target.classList.contains('order-product__delete')) {
	// 		let id = e.target.closest('.order-modal__product').dataset.id;
	// 		let cartProduct = document.querySelector(`.cart-content__product[data-id="${id}"]`).closest('.cart-content__item');
	// 		deleteProducts(cartProduct)
	// 		e.target.closest('.order-modal__product').remove();
	// 	}
	// });

});