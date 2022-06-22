document.addEventListener('DOMContentLoaded', () => {
	const favorite_btn = document.querySelectorAll('.favorite_btn');
	const cartProductsList = document.querySelector('.cart-content__list');
	const favorite = document.querySelector('.favorite');
	const cartQuantity = document.querySelector('.notify'); 
    const products_war = document.querySelectorAll('.product');
	let price = 0;
	// let randomId = 3;
    let loshka = document.querySelector('#suda') ;
    loshka.innerHTML = localStorage.getItem('products');
    const disable = loshka.querySelectorAll('.productik');
    console.log(disable); 

    const printQuantity = () => {
        let productsListLength = document.querySelector('.suda').children.length;
        cartQuantity.textContent = productsListLength;
        productsListLength > 0 ? cartQuantity.classList.add('active') : cartQuantity.classList.remove('active');
    };

    const plusFullPrice = (currentPrice) => {
		return price += currentPrice;
	};
    printQuantity();
    function priceWithoutSpaces(str) {
        return str.replace(/\s/g, '');
    }
    const normalPrice = (str) => {
        return String(str).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
    };
    // const countSumm = () => {
    //     let flow = 0;
    //     document.querySelectorAll('.productik').forEach(el => {    
    //        flow += Number(parseInt(priceWithoutSpaces(el.querySelector('.product_price').textContent)));   
    //     }); 
    //     localStorage.setItem('tovar' , flow); 
    //     if (localStorage.getItem('tovar') == 0) {
    //         localStorage.removeItem('tovar' );
    //     }
    // };
    const generateCartProduct = (img, title, price, id) => {
		return `			
            <aricle class="productik" data-id="${id}">
                <a href="#" class="product_link">
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
                </a>
            </aricle>
		`;
	};
    favorite_btn.forEach(el => {
        // Выдает рандомный айди каждой карточки
        // if (!el.closest('.product').hasAttribute('data-id')){
        //     el.closest('.product').setAttribute('data-id', randomId++);
        // }
        el.addEventListener('click', (e) => {
            let self = e.currentTarget;
            let parent = self.closest('.product');
            let id = parent.dataset.id;
            let img = parent.querySelector('.product_img img').getAttribute('src');
            let title = parent.querySelector('.product_title').textContent;
            let priceString = priceWithoutSpaces(parent.querySelector('.product_price').textContent);
            let priceNumber = parseInt(priceWithoutSpaces(parent.querySelector('.product_price').textContent));
            plusFullPrice(priceNumber);
            cartProductsList.querySelector('.suda').insertAdjacentHTML('afterbegin', generateCartProduct(img, title, priceString, id));
            printQuantity();		
            updateStorage();   
            self.disabled = true;
            self.classList.add('active');
        });
    });
  
    // disable.forEach(el => {    
    //     let nuts = el.getAttribute('data-id');
    //     products_war.forEach(el => {    
    //         let valueid = el.dataset.id;
    //         if(nuts === valueid){
    //             el.querySelector('.favorite_btn').classList.add('active');	
    //             el.querySelector('.favorite_btn').disabled = true;
    //         }
    //     });  
    // });

    const countSumm = () => {
		// let price = 0;
		let tovar = Number(localStorage.getItem('tovar'));
		let biba = Number(localStorage.getItem('price'));	
		let lui = biba - tovar;	
		// console.log(lui);	    
		document.querySelectorAll('.productik').forEach(el => {	   
            // console.log('111');     
			if (localStorage.getItem('tovar') !== null) { //Проверка на содержание данных price = lui + price;												
				if(tovar !== biba){								
					lui += parseInt(priceWithoutSpaces(el.querySelector('.product_price').textContent));			
                    // console.log(lui);	
					price = lui;
				}else{
					price += parseInt(priceWithoutSpaces(el.querySelector('.product_price').textContent));	               
				}
			}else{
				price += parseInt(priceWithoutSpaces(el.querySelector('.product_price').textContent));	
                // console.log(price + 'fd');     
                // localStorage.setItem('price', price);         
			}			          
		});
	};
    const initialState = () => {
		if (localStorage.getItem('products') !== null) {
			cartProductsList.querySelector('.suda').innerHTML = localStorage.getItem('products');
			// let parent = cartProductsList.querySelector('.suda');  
            // let searching = document.querySelector('.products_grid_item')  ;
			// console.log(searching)
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
    const updateStorage = () => {
		let parent = cartProductsList.querySelector('.suda');
		// console.log(price)
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
});
// let search = document.querySelector('.header_search');
// let head = document.querySelector('header');
// let inpit = document.querySelector('#inpit');
// let funtional = document.querySelector('.header_functional');

// document.querySelector('.menu').addEventListener('change', (e) => {
//     event.preventDefault();
//     document.querySelector('nav').classList.toggle('table');	  
// });
// search.addEventListener('click', (e) => {   
//     document.querySelector('.wrap').classList.toggle('active');	
//     document.querySelector('.search').classList.toggle('active');	
//     document.querySelector('nav').classList.toggle('active');	
//     head.classList.toggle('hidden');
//     inpit.focus();
// });
// inpit.onblur = function() {
//     document.querySelector('.wrap').classList.remove('active');	
//     document.querySelector('.search').classList.remove('active');	
//     document.querySelector('nav').classList.remove('active');
//     head.classList.remove('hidden');
// };
// funtional.addEventListener('click', (e) => {   
//     document.querySelector('nav').classList.remove('table');	
//     document.querySelector('input[type=checkbox]').checked=false;
// });

//Исправить баг с фокусом
//Реализовать поиск
//В ручную выдать randomid
//Отформатировать и закомментировать код
//Проверка отправки писем на email
//Написал это 17.04.22
// loshka.innerHTML = localStorage.getItem('DatI');
// let imgS = loshka.querySelector('.chapter_img img').getAttribute('src');
// let titleS = loshka.querySelector('.product_title').textContent;
// let priceS = loshka.querySelector('.product_price').textContent;
// let idS = localStorage.getItem('NIndex');
// loshka.innerHTML = generateModalProduct(imgS,titleS,priceS,idS);