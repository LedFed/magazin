//выгружаем данные из localstorage
let parent = document.querySelector('#suda');
let productArray = [];
parent.innerHTML = localStorage.getItem('products');
const fullPrice = document.querySelector('.fullprice');
const orderModalOpenProd = document.querySelector('.order-modal__btn');
const orderModalList = document.querySelector('.order-modal__list');
let but = parent.querySelector('.productik');
console.log(but)



if(but == null){
    document.querySelector('.Buy').disabled = true;
    document.querySelector('.Buy').classList.add('active');
    parent.innerHTML = 'Корзина пуста';
}else{
    document.querySelector('.Buy').disabled = false;
    document.querySelector('.Buy').classList.remove('active');
}
//Удаляет все пробелы
function priceWithoutSpaces(str) {
    return str.replace(/\s/g, '');
}
//Возврощает все пробелы
const normalPrice = (str) => {
    return String(str).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
};
//Проверка на содержание данных
if (localStorage.getItem('price') !== null) { 
    let price = document.querySelector('.total');
    price.innerHTML = normalPrice(localStorage.getItem('price')+'€');
}

const countSumm = () => {
    let flow = 0;
    document.querySelectorAll('.productik').forEach(el => {    
       flow += Number(parseInt(priceWithoutSpaces(el.querySelector('.product_price').textContent)));   
    }); 

    localStorage.setItem('tovar' , flow); 

    if (localStorage.getItem('tovar') == 0) {
        localStorage.removeItem('tovar' );
    }
  
  
};

// Удаление карточки товара e.target.closest('product_price');
const deleteProducts = (productParent) => {
    productParent.remove();
};

const cartProductsList = document.querySelector('#suda');
cartProductsList.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove')) {    
        let blick =  e.target.closest('.productik');
        let est = parseInt(priceWithoutSpaces(blick.querySelector('.product_price').textContent));
        let nuber = parseInt(priceWithoutSpaces(blick.querySelector('.number').textContent));
        console.log(est);
        console.log(nuber);
        localStorage.removeItem('num'+ blick.dataset.id);
        let rate = localStorage.getItem('price');
        rate =  parseInt(priceWithoutSpaces(rate));
        rate = Number(rate);
        let izi = est * nuber;
        rate = (rate - izi);
        console.log(rate);
        let section = document.querySelector('.total'); 
            section.innerHTML = normalPrice(rate+'€');
            localStorage.setItem('price' , rate);
        console.log(izi);
        deleteProducts(e.target.closest('.productik'));
        parent = document.querySelector('#suda');
        parent = parent.innerHTML;
        localStorage.setItem('products', parent);    
        countSumm();
    }
});
countSumm();
//Цикл для инкремента и дикримента
document.querySelectorAll('.productik').forEach(el =>{     
        let num = localStorage.getItem('num'+el.dataset.id);    
        num = Number(num);   
        if (num == 0){
            num = el.querySelector('.number');
            num = Number(num.textContent);
            num.innerHTML = num;
        }else{
            num = localStorage.getItem('num'+el.dataset.id);
            let secta = el.querySelector('.number');
            secta.innerHTML = num;
        }
    // +
    el.querySelector('.plus').onclick = function(){     
        let secta = el.querySelector('.number');
        num++;
        secta.innerHTML = num;
        localStorage.setItem('num'+ el.dataset.id, num ); //Тут я просто доволен собой 
        let price_product = parseInt(priceWithoutSpaces(el.querySelector('.product_price').textContent));
        let rate = localStorage.getItem('price');
        rate =  parseInt(priceWithoutSpaces(rate));
        rate = Number(rate);   
        rate += price_product;
        let section = document.querySelector('.total'); 
            section.innerHTML = normalPrice(rate+'€');
        localStorage.setItem('price' , rate);
    }
    // -
    el.querySelector('.minus').onclick = function(){
        let minusik = el.querySelector('.minus');
        console.log(num)
        if( num > 1){
            let secta = el.querySelector('.number');
            console.log(num) 
            num--;  
            console.log(num) 
            secta.innerHTML = num;
            localStorage.setItem('num'+ el.dataset.id, num ); 
            let price_product = parseInt(priceWithoutSpaces(el.querySelector('.product_price').textContent));
            let rate = localStorage.getItem('price');
            rate =  parseInt(priceWithoutSpaces(rate));
            rate = Number(rate);
            rate -= price_product;
            console.log(rate)                    
            let section = document.querySelector('.total'); 
            section.innerHTML = normalPrice(rate+'€');
            localStorage.setItem('price' , rate);
        }
    }
})

    cartProductsList.addEventListener('click', (e) => {
		if (e.target.classList.contains('cart-product__delete')) {
			deleteProducts(e.target.closest('.cart-content__item'));
		}
	});

	let flag = 0;
	orderModalOpenProd.addEventListener('click', (e) => {
		if (flag == 0) {
			orderModalOpenProd.classList.add('open');
			orderModalList.style.display = 'block';
			flag = 1;
		} else {
			orderModalOpenProd.classList.remove('open');
			orderModalList.style.display = 'none';
			flag = 0;
		}
	});

	const generateModalProduct = (img, title, price, id) => {
		return `
			<li class="order-modal__item">
				<article class="order-modal__product order-product" data-id="${id}">
					<img src="${img}" alt="" class="order-product__img">
					<div class="order-product__text">
						<h3 class="order-product__title">${title}</h3>
						<span class="order-product__price">${normalPrice(price)}</span>
					</div>
					<button class="order-product__delete">Удалить</button>
				</article>
			</li>
		`;
	};
    obj = [];
    
	const modal = new GraphModal({   
		isOpen: (modal) => {
            orderModalList.innerHTML = '';
			console.log('opened');
			let array = document.querySelector('.suda').children;
			let fullprice = localStorage.getItem("price");   
            let length = array.length; 
			document.querySelector('.order-modal__quantity span').textContent = `${length} шт`;
			document.querySelector('.order-modal__summ span').textContent = `${normalPrice(fullprice) +'€'}`;
			for (item of array) {
				console.log(item)
				let img = document.querySelector('.product_img img').getAttribute('src');
				let title = item.querySelector('.product_title').textContent;
				let priceString = priceWithoutSpaces(item.querySelector('.product_price').textContent);
				let id = document.querySelector('.productik').dataset.id;
				orderModalList.insertAdjacentHTML('afterbegin', generateModalProduct(img, title, priceString, id));
                let obj = {};
				obj.title = title;
                console.log(obj.title);
				obj.price = priceString;
				productArray.push(obj);
			}
			console.log(productArray)    
		},
		isClose: () => {
			console.log('closed');      
		}
	});

	document.querySelector('.order__btn ').addEventListener('submit', (e) => {
		e.preventDefault();
		let self = e.currentTarget;
		let formData = new FormData(self);
		let name = self.querySelector('[name="Имя"]').value;
		let tel = self.querySelector('[name="Телефон"]').value;
		let mail = self.querySelector('[name="Email"]').value;
		formData.append('Товары', JSON.stringify(productArray));
		formData.append('Имя', name);
		formData.append('Телефон', tel);
		formData.append('Email', mail);

		let xhr = new XMLHttpRequest();

		xhr.onreadystatechange = function() {
			if (xhr.readyState === 4) {
				if (xhr.status === 200) {
					console.log('Отправлено');
				}
			}
		}
		xhr.open('POST', 'mail.php', true);
		xhr.send(formData);
		self.reset();
	});

    

	document.querySelector('.modal').addEventListener('click', (e) => {
		if (e.target.classList.contains('order-product__delete')) {
			let id = e.target.closest('.order-modal__product').dataset.id;
			let cartProduct = document.querySelector(`.productik[data-id="${id}"]`);
			deleteProducts(cartProduct);
			e.target.closest('.order-modal__product').remove();
		}
	});
    
   
    // console.log(); 
 
 