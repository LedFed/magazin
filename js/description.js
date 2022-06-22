document.addEventListener('DOMContentLoaded', () => {
  'use strict';
  // Объявляем переменные
  const ChapterImg = document.querySelector('.chapter_img img');
  const RandomCart = document.querySelector('.products_flex_itemTwo');
  const Dr = document.querySelector('.descript_right');
  let a = +localStorage.getItem('curentId');
  Dr.querySelector('.favorite_btn').setAttribute('data-id', a);
  // console.log(btnId.length);
  let favorites = [];
  let idil = [];
  //Проверяем наличие избранных товаров на странице в LS

  // Аккардион описание и.т.д 
  const accoridon = () => {
    const characteristicsList = document.querySelector('.characteristics__list');
    const characteristicsItem = document.querySelectorAll('.characteristics__item');
    // Функция принимает кнопку на которую нажал и описание 
    const open = (button, dropDown) => {
      CloseAllDrops();
      dropDown.style.height = dropDown.scrollHeight + 'px'; //Устанавливаем высоту зависима от наполнения 
      button.classList.add('active');
      dropDown.classList.add('active');
    };
    const close = (button, dropDown) => {
      button.classList.remove('active');
      dropDown.classList.remove('active');
      dropDown.style.height = '';
    };
    // Закрываем все элементы кроме того на который нажали не т 
    const CloseAllDrops = (button, dropDown) => {
      characteristicsItem.forEach((elem) => {
        if (elem.children[0] !== button && elem.children[1] !== dropDown) {
          close(elem.children[0], elem.children[1]);
        }
      })
    }
    // Отслиживаем клик
    characteristicsList.addEventListener('click', (event) => {
      const target = event.target; //Помещаем в переменную класс по которому тыкнули(строго внтри list)
      if (target.classList.contains('characteristics__title')) {
        const parent = target.closest('.characteristics__item');
        const disription = parent.querySelector('.characteristics__description')
        disription.classList.contains('active') ?
          close(target, disription) :
          open(target, disription)
      }
    });
    // Если я тыкнул мимо списка, то вызываем функцию которая все закроет
    document.body.addEventListener('click', (event) => {
      const target = event.target;
      if (!target.closest('.characteristics__list')) {
        CloseAllDrops();
      }
    })
  };
  //Табы для выбора картинок
  const tabe = () => {
    const dImg = document.querySelectorAll('.descript_imgs img');
    // const cImg =  document.querySelector('.chapter_img img');
    dImg.forEach((img) => {
      img.addEventListener('click', (e) => {
        const target = e.target;
        const zombie = target.getAttribute('src');
        ChapterImg.setAttribute('src', zombie);
        dImg.forEach((e) => {
          e.classList.remove('active');
        })
        target.classList.add('active');
      })
    })
  }
  
  getProducts2();
  // Ассинхроная функция которая получает данные из Json файла
  async function getProducts2() {
    const response = await fetch('./db/descripton.json');
    const productsArray = await response.json();
    descriptionCart(productsArray);
  }

  //Берем данные из бд и грузим на страницу
  const descriptionCart = (array) => {
    // Заводим переменные внутри функции
    const titleProduct = document.querySelector('.product_title');
    const productPrice = document.querySelector('.product_price');
    const descriptSlide = document.querySelectorAll('.characteristics__list-description');
    const threeImg = document.querySelector('.descript_imgs');


    // Функция принимает два значение: 
    // Массив и Значение, проходиться по циклу и возвращает путь до этого объекта
    const search = (arr, value) => {
      for (let key in arr) {
        for (let keys in arr[key]) {
          for (let ris in arr[key][keys]) {
            if (value == arr[key][keys][ris]) {
              // return  arr[key][keys]; //array уесли что не так
              let massiv = [arr[key][keys], arr[key]]; //Возвращаем массив чтоб получить два значения
              return massiv;
            }
          }
        }
      }
    }

    let dates = search(array, a); //Получаеться массив

    //Функция принимает массив, важно чтоб в массиве было 3+ товара
    //И выводит рандомные товары на страницу 
    const renegads = objI => {
      idil.push(a); //Добавляем в массив id текущей карточки

      const randomProperty = (obj) => {

        const keys = Object.keys(obj);
        const objPr = obj[keys[keys.length * Math.random() << 0]]; // Генерируем рандомное число в диапозоне переданого массива
        // Если длина массив меньше 3 то выполняем 
        while (idil.length <= 3) {
          // Если в массиве нет такого Id то мы добавляем его и выводим на страницу
          if (idil.indexOf(+objPr.id) === -1) {
            idil.push(+objPr.id);
            createCrosseSellItem(objPr);
          } else { //иначе вызваем функцию заново
            randomProperty(objI);
          }
        }
      };

      //Функция принимает массив и выводит готовую карточку на стр..
      const createCrosseSellItem = (arr) => {
        const liItem = `
              <aricle class="product" data-id="${arr.id}">
                  <a href="description.html" class="product_link">
                      <div class="product_img">
                          <img src="${arr.img[1]}" alt="${arr.name}">
                      </div>                    
                      <h3 class="product_title">${arr.name}</h3>
                      <span class="product_price">${'€' + arr.price}</span>
                  </a>

                  <button class="favorite_btn btn">
                      <svg width="21" height="19" viewBox="0 0 21 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M14.7749 0.999994C13.1219 0.999994 11.5355 1.76798 10.5 2.98159C9.46448 1.76798 7.87798 0.999994 6.22499 0.999994C3.29899 0.999994 1 3.29447 1 6.21469C1 9.79858 4.22999 12.7189 9.12248 17.1561L9.73284 17.7064C10.1681 18.0989 10.8307 18.0977 11.2644 17.7036L11.8775 17.1466C16.7699 12.7189 20 9.79858 20 6.21469C20 3.29447 17.701 0.999994 14.7749 0.999994Z" />
                      </svg>                                                     
                  </button>
              </aricle>
              `;
        RandomCart.insertAdjacentHTML('beforeend', liItem);
      }

      randomProperty(objI);// Передаем текущий массив
    }

    renegads(dates[1]);

    console.log(idil);
    // Считаем количество картинок и создаем элементы img и выводим их на страницу
    for (let keye in dates[0].img) {
      let div = document.createElement('img');
      div.setAttribute('src', dates[0].img[keye])
      div.setAttribute('alt', dates[0].name)
      threeImg.append(div);
    }
    // заполняем страницу данными из массива
    titleProduct.textContent = dates[0].name;
    productPrice.textContent = "€" + dates[0].price;
    ChapterImg.setAttribute('src', dates[0].img[1]);
    descriptSlide.forEach((e, i) => {
      if (dates[0].descript && dates[0].descript[i]) {
        e.textContent = dates[0].descript[i];
      }
    })
    // Ищем рание выбранные товары и блокируем кнопки
    const btn = document.querySelectorAll('.favorite_btn');
    const productsLinks = document.querySelectorAll('.product_link');
    const proverka = () => {
      const btn = document.querySelectorAll('.favorite_btn');
      if (localStorage.getItem('favorite')) {
        favorites = JSON.parse(localStorage.getItem('favorite'));
        console.log(favorites);
        console.log(btn);
        btn.forEach(fbtn => {
          let i = 0;
          fbtn.hasAttribute('data-id') ?
            i = +fbtn.getAttribute('data-id') :
            i = +fbtn.closest('.product').getAttribute('data-id');
          favorites.forEach(e => {
            if (i === e) {
              fbtn.classList.add('active');
              fbtn.disabled = true;
            }
          })
        })
      }
      btn.forEach((event) => {
        event.addEventListener('click', () => {
          let add;
          event.hasAttribute('data-id') ?
            add = +event.getAttribute('data-id') :
            add = +event.closest('.product').getAttribute('data-id');
          event.classList.add('active');
          favorites.push(add);
          event.disabled = true;
          localStorage.setItem("favorite", JSON.stringify(favorites));
          // nofy();
        })
      })
    }

    productsLinks.forEach((e) => {
      e.addEventListener('click', () => {
        let curentP = e.closest('.product');
        localStorage.setItem('curentId', curentP.getAttribute('data-id'));
      })
    })

    // }
    // });
    proverka();
    accoridon();
    tabe();
    // listen(Array);
  }

  const listen = (array) => {
    const btn = document.querySelectorAll('.favorite_btn');
    const del = document.querySelectorAll('.del');
    let removeAll = document.querySelector('.remove_all');
    let remove = document.querySelectorAll('.remove');
    let plus = document.querySelectorAll(".plus");
    let minus = document.querySelectorAll(".minus");

    window.addEventListener('click', (e) => {
      //Проверяем существование кнопок btn
      if (btn) {
        btn.forEach((event) => {
          let fvbtn = e.target.closest('.favorite_btn')
          if (event === fvbtn) {
            let add = +fvbtn.closest('[data-id]').getAttribute("data-id");
            fvbtn.classList.add('active')
            // proverka();
            favorites.push(add);
            // if (favorites.length) {
            //   favorites.forEach((e) => {
            //     if (e !== add) {

            //     }
            //   })
            // } else {
            //   favorites.push(add);
            // }
            e.target.disabled = true;

            localStorage.setItem("favorite", JSON.stringify(favorites));
            console.log(favorites);
            // nofy();
          }
        })
      }
      //Проверяем существование кнопок del
      if (del) {
        del.forEach((event) => {
          if (event === e.target) {
            let n = event.closest('.container').getAttribute("id");
            event.disabled = true;
            event.previousElementSibling.disabled = false;
            for (let key in favorite) {
              console.log(favorite[key])
              if (n == favorite[key]) {
                favorite.splice(key, 1);
              }
              nofy();
            }
            if (favorite.length == 0) { //Если массив пустой то удаляем данные из Loacal
              localStorage.clear(favorite)
            } else { //Иначе задаем их
              localStorage.setItem("favorite", favorite);
            }
            console.log(favorite);
          }
        })
      }
      //Страница basket.html
      if (remove) {
        remove.forEach((event) => {
          if (event === e.target) {
            let id = +e.target.closest('.content').getAttribute('data-id');
            for (let key in favorite) {
              if (id == Number(favorite[key])) {
                favorite.splice(key, 1);
                localStorage.setItem('favorite', favorite)
                document.querySelector(`[data-id='${id}']`).remove();
                localStorage.removeItem('Quanty' + id)
                Allprice(array);
              }
            }
          }
        })
      }
      // Увеличить количество товара
      if (plus) {
        plus.forEach((event) => {
          if (event === e.target) {
            let id = +e.target.closest('.content').getAttribute('data-id');
            let count = e.target.nextElementSibling.textContent++;
            count++;
            localStorage.setItem('Quanty' + id, count);
            Allprice(array);
          }
        })
      }
      // Снизить количество товара
      if (minus) {
        minus.forEach((event) => {
          if (event === e.target) {
            let id = +e.target.closest('.content').getAttribute('data-id');
            console.log(id);
            let count = e.target.previousElementSibling.textContent;
            console.log(count);
            if (count > 1) {
              e.target.previousElementSibling.textContent--;
              count--;
              console.log(count);
              localStorage.setItem('Quanty' + id, count);
              if (count == 1) localStorage.removeItem('Quanty' + id);
            }
            Allprice(array);
          }
        })
      }
      // Удалить все
      if (removeAll === e.target) {
        localStorage.clear();
        Allprice(array);
        cart.innerHTML = '';
        document.querySelector('.Allprice').textContent = '0';
        cart.textContent = 'Пуста корзина';
      }
    })
  }

  const modal = new GraphModal({   
		isOpen: (modal) => {
      // orderModalList.innerHTML = '';
			console.log('opened');
			// let array = document.querySelector('.suda').children;
			// let fullprice = localStorage.getItem("price");   
      // let length = array.length; 
			// document.querySelector('.order-modal__quantity span').textContent = `${length} шт`;
			// document.querySelector('.order-modal__summ span').textContent = `${normalPrice(fullprice) +'€'}`;
			// for (item of array) {
			// 	console.log(item)
			// 	let img = document.querySelector('.product_img img').getAttribute('src');
			// 	let title = item.querySelector('.product_title').textContent;
			// 	let priceString = priceWithoutSpaces(item.querySelector('.product_price').textContent);
			// 	let id = document.querySelector('.productik').dataset.id;
			// 	orderModalList.insertAdjacentHTML('afterbegin', generateModalProduct(img, title, priceString, id));
      //   let obj = {};
			// 	obj.title = title;
      //   console.log(obj.title);
			// 	obj.price = priceString;
			// 	productArray.push(obj);
			// }
			// console.log(productArray)    
		},
		isClose: () => {
			console.log('closed');      
		}
	});


})

//При нажатие на кнопку корзина открыть модальное окно с оплатой
//Подправить стили