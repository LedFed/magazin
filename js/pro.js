document.addEventListener('DOMContentLoaded', () => {
    let htmlPage = location.href.match(/[\d\w-]+\.\w+$/)[0];
    console.log(htmlPage);
    let favorites = [];
    let idil = [];
    getProducts();

    $("[data-collapse]").on("click", function (event) {
        event.preventDefault();
        var $this = $(this),
            blockid = $this.data('collapse');
        $(this).toggleClass("active");
        console.log(this);
        $(blockid).slideToggle(500);
    });

  

    // Аккардион описание и.т.д 
    const accoridon = () => {
        const characteristicsList = document.querySelector('.characteristics__list');
        const characteristicsItem = document.querySelectorAll('.characteristics__item');
        const FooterL = document.querySelector('.footer_list')
        const Faccordion = document.querySelectorAll('.accordion')
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
        const ChapterImg = document.querySelector('.chapter_img img');
        console.log(dImg);
        // const cImg =  document.querySelector('.chapter_img img');
        dImg.forEach((img) => {
            img.addEventListener('click', (e) => {
                const target = e.target;
                const zombie = target.getAttribute('src');
                ChapterImg.setAttribute('src', zombie);
                console.log(ChapterImg);
                dImg.forEach((e) => {
                    e.classList.remove('active');
                })
                target.classList.add('active');
            })
        })
    }

    //Считаем количество товаров в качестве аргумента принимает favorites
    const nofy = (array) => {
        let nofy = document.querySelector('.notify');
        if (array.length) {
            nofy.classList.add('active');
            nofy.textContent = array.length;
        } else {
            nofy.classList.remove('active');
            nofy.textContent = '';
        }
    }

    async function getProducts() {
        const response = await fetch('./db/descripton.json');
        const productsArray = await response.json();
        console.log(productsArray);

        switch (htmlPage) {
            case "protein.html": {
                console.log('это протеин');
                completion(productsArray[0]);
                proverka();
                break;
            }
            case "gainer.html": {
                console.log('это протеин');
                completion(productsArray[1]);
                proverka();
                break;
            }
            case "vitamin.html": {
                console.log('это протеин');
                completion(productsArray[2]);
                proverka();
                break;
            }
            case "creatine.html": {
                console.log('это протеин');
                completion(productsArray[3]);
                proverka();
                break;
            }
            case "index.html": {
                $(document).ready(function () { // Для слайдов, работает только после ответа от сервера
                    $("[data-slider]").slick({
                        isFinite: false,
                        fade: false,
                        slideToShow: 1,
                        slideToScroll: 1,
                        arrows: false,
                        dots: true,
                        autoplay: true,
                        autoplaySpeed: 5000
                    });
                    $("[data-slid]").slick({
                        arrows: false,
                        dots: true,
                    })

                });
                threCart(productsArray);
                proverka();
                break;
            }
            case "description.html": {
                console.log('Страница описания');
                descriptionCart(productsArray);
                // proverka();
                break;
            }
            case "favorite.html": {
                console.log('Страница любимых');
                proverka();
                cartF(productsArray);
                loaded();
                Increment(productsArray);
                Allprice(productsArray);
                break;
            }
        }
        // proverka();

    }
    // функция принимает путь массива и заполняет страницу товарами из JSON для(protein, creatine и.т.д)
    const completion = (array) => {
        takeSearch(array)
        const gridContainer = document.querySelector('.products_grid_item');
        array.forEach((e) => {
            const gridper = `
                <aricle class="product" data-id="${e.id}">
                <a href="description.html" class="product_link">
                    <div class="product_img">
                        <img src="${e.img[1]}" alt="${e.name}">
                    </div>                    
                    <h3 class="product_title">${e.name}</h3>
                    <span class="product_price">${e.price}€</span>
                </a>
                <button class="favorite_btn btn">
                    <svg width="21" height="19" viewBox="0 0 21 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.7749 0.999994C13.1219 0.999994 11.5355 1.76798 10.5 2.98159C9.46448 1.76798 7.87798 0.999994 6.22499 0.999994C3.29899 0.999994 1 3.29447 1 6.21469C1 9.79858 4.22999 12.7189 9.12248 17.1561L9.73284 17.7064C10.1681 18.0989 10.8307 18.0977 11.2644 17.7036L11.8775 17.1466C16.7699 12.7189 20 9.79858 20 6.21469C20 3.29447 17.701 0.999994 14.7749 0.999994Z" />
                    </svg>                                                     
                </button>
                </aricle>
                `;
            gridContainer.insertAdjacentHTML('beforeend', gridper);
        })
        const showMOre = document.querySelector('.btn_show');
        let items = 6;
        const productsLenthgItem = document.querySelectorAll('.product').length;
        console.log(productsLenthgItem);
        if (items >= productsLenthgItem) {
            showMOre.style.display = 'none';
        }
        showMOre.addEventListener('click', () => {
            items += 3;
            const arrayLen = Array.from(document.querySelector('.products_grid_item').children);
            const visitItems = arrayLen.slice(0, items);
            visitItems.forEach(el => el.classList.add('is-visible'));
            if (visitItems.length === productsLenthgItem) {
                showMOre.style.display = 'none';
            }
        })
    }
    // функция заполняет главный экран товарами
    const threCart = (array) => {
        takeSearch(array)
        const productam = document.querySelectorAll('.products_flex_item')
        let d = 0;
        for (let k = 0; k < 3; k++) {
            const liEl = productam[d];
            for (let o = 0; o < 3; o++) {
                const productHtml = `
                <aricle class="product" data-id="${array[k][o].id}">
                <a href="description.html" class="product_link">
                    <div class="product_img">
                        <img src="${array[k][o].img[1]}" alt="${array[k][o].name}">
                    </div>                    
                    <h3 class="product_title">${array[k][o].name}</h3>
                    <span class="product_price">${array[k][o].price}€</span>
                </a>
                <button class="favorite_btn btn">
                    <svg width="21" height="19" viewBox="0 0 21 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.7749 0.999994C13.1219 0.999994 11.5355 1.76798 10.5 2.98159C9.46448 1.76798 7.87798 0.999994 6.22499 0.999994C3.29899 0.999994 1 3.29447 1 6.21469C1 9.79858 4.22999 12.7189 9.12248 17.1561L9.73284 17.7064C10.1681 18.0989 10.8307 18.0977 11.2644 17.7036L11.8775 17.1466C16.7699 12.7189 20 9.79858 20 6.21469C20 3.29447 17.701 0.999994 14.7749 0.999994Z" />
                    </svg>                                                     
                </button>
                </aricle>
                `;
                liEl.insertAdjacentHTML('beforeend', productHtml);
            }
            d++;
        }
    }

    //Проверяем наличие LS, помечаем выбранные товары при загрузке стр
    // Возможность их туда добавить
    const proverka = () => {

        const btn = document.querySelectorAll('.favorite_btn');
        if (localStorage.getItem('favorite')) { //Проверяет существование LS
            favorites = JSON.parse(localStorage.getItem('favorite'));
            btn.forEach(fbtn => { //Проходимся по всем кнопкам
                let i = 0;
                fbtn.hasAttribute('data-id') ?
                    i = +fbtn.getAttribute('data-id') :
                    i = +fbtn.closest('.product').getAttribute('data-id');

                favorites.forEach(e => {
                    if (i === e) {  // если у айди кнопки есть совподение c LS то делаем середечко черным
                        fbtn.classList.add('active');
                        fbtn.disabled = true;
                    }
                })
            })
            nofy(favorites);
            // return favorites;
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
                nofy(favorites);
            })
        })

        const productsLinks = document.querySelectorAll('.product_link');
        productsLinks.forEach((e) => {
            e.addEventListener('click', () => {
                let curentP = e.closest('.product');
                localStorage.setItem('curentId', curentP.getAttribute('data-id'));
            })
        })

        return favorites;
    }

    // !!!Функция принимает два значение: 
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

    //Берем данные из бд и грузим на страницу
    const descriptionCart = (array) => {
        // Заводим переменные внутри функции
        const titleProduct = document.querySelector('.product_title');
        const ChapterImg = document.querySelector('.chapter_img img');
        const RandomCart = document.querySelector('.products_flex_itemTwo');
        const productPrice = document.querySelector('.product_price');
        const descriptSlide = document.querySelectorAll('.characteristics__list-description');
        const threeImg = document.querySelector('.descript_imgs');
        const Dr = document.querySelector('.descript_right');
        const orderModalList = document.querySelector('.order-modal__info');
        let a = +localStorage.getItem('curentId');
        Dr.querySelector('.favorite_btn').setAttribute('data-id', a);

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
                        console.log(objPr);
                        createCrosseSellItem(objPr);
                    } else { //иначе вызваем функцию заново
                        randomProperty(objI);
                    }
                }
            };

            //Функция принимает массив и выводит готовую карточку на стр..
            const createCrosseSellItem = (arr) => {
                // console.log(arr.id);
                const liItem = `
                <aricle class="product" data-id="${arr.id}">
                    <a href="description.html" class="product_link">
                        <div class="product_img">
                            <img src="${arr.img[1]}" alt="${arr.name}">
                        </div>                    
                        <h3 class="product_title">${arr.name}</h3>
                        <span class="product_price">${'€' + arr.price}</span>
                    </a>

                    <button class="favorite_btn btn" >
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
        console.log(dates[1]);

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
                    nofy(favorites);
                })
            })
        }
        console.log(dates[0]);
        // productsLinks.forEach((e) => {
        //     e.addEventListener('click', () => {
        //         let curentP = e.closest('.product');
        //         localStorage.setItem('curentId', curentP.getAttribute('data-id'));
        //     })
        // })
        // const currentCLick = (links) =>{
            productsLinks.forEach((e) => {
                e.addEventListener('click', () => {
                    let curentP = e.closest('.product');
                    localStorage.setItem('curentId', curentP.getAttribute('data-id'));
                })
            })
        // }

        // currentCLick(productsLinks)
     
        
        console.log(dates[0].price);
        // Выводим в модальное окно текущию карточку
        const generateModalProduct = (img, title, price, id) => {
            return `
                <li class="order-modal__item">
                    <article class="order-modal__product order-product" data-id="${id}">
                        <img src="${img}" alt="" class="order-product__img">
                        <div class="order-product__text">
                            <h3 class="order-product__title">${title}</h3>
                            <span class="order-product__price">€${price}</span>
                        </div>                  
                    </article>
                </li>
            `;
        };

        proverka();
        accoridon();
        tabe();
        nofy(favorites);
        // Модальное окно для одного товара
        const modal = new GraphModal({
            isOpen: (modal) => { //Открываем
                orderModalList.insertAdjacentHTML('afterbegin',
                    generateModalProduct(dates[0].img[1], dates[0].name, dates[0].price, dates[0].id));
            },
            isClose: () => { //Закрываем
                const ModalItem = document.querySelector('.order-modal__item');
                orderModalList.removeChild(ModalItem);
            }
        });
    }

    // Функция для CartF 
    const generateCartProduct = (img, title, price, id) => {
        return `			
            <aricle class="productik" data-id="${id}">
                <div  class="product_link">
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
                            <a href="description.html" class="product_title">${title}</a>
                            <span class="product_price">${'€' + price}</span>
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

    // Заполняет favorit выбранами товарами
    const cartF = (array) => {
        const here = document.querySelector('.suda');
        const BtnDis = document.querySelector('.Buy')
        BtnDis.classList.add('active');
        BtnDis.disabled = true;
        here.textContent = 'Тут пусто';
        if (favorites.length) {
            here.textContent = '';
            favorites.forEach(e => {
                let searchs = search(array, e);
                here.insertAdjacentHTML('afterbegin',
                    generateCartProduct(searchs[0].img[1], searchs[0].name, searchs[0].price, searchs[0].id));
                BtnDis.classList.remove('active');
                BtnDis.disabled = false;
            })
            nofy(favorites);
        }

        const generateModalProduct = (img, title, price, id) => {
            return `
                <li class="order-modal__item">
                    <article class="order-modal__product order-product" data-id="${id}">
                        <img src="${img}" alt="" class="order-product__img">
                        <div class="order-product__text">
                            <h3 class="order-product__title">${title}</h3>
                            <span class="order-product__price">€${price}</span>
                        </div>                  
                    </article>
                </li>
            `;
        };

        let FavId = document.querySelector('.product_title');
        // Клик для перехода с favorit на descriptionHtml
        FavId.addEventListener('click', () => {
            FavId = +FavId.closest('.productik').getAttribute('data-id');
            localStorage.setItem('curentId', FavId);
        })

        // Модальное окно для нескольких товаров
        const modal = new GraphModal({
            isOpen: (modal) => {
                let Mlength = document.querySelector('.order-modal__quantity span');
                let total = document.querySelector('.total').textContent;
                let MList = document.querySelector('.order-modal__list')
                MList.innerHTML = '';
                let BtnModal = document.querySelector('.order-modal__btn');
                let fliger = 0;
                document.querySelector('.order-modal__summ span').textContent = total;

                BtnModal.addEventListener('click', () => {

                    if (fliger == 0) {
                        BtnModal.classList.add('open');
                        BtnModal.nextElementSibling.style.display = 'block';
                        fliger = 1;
                    } else {
                        BtnModal.classList.remove('open');
                        BtnModal.nextElementSibling.style.display = 'none';
                        fliger = 0;
                    }

                })

                Mlength.textContent = favorites.length + ' шт'
                console.log(array);
                for (let item in favorites) {
                    console.log(favorites[item]);
                    let Mel = search(array, favorites[item]);
                    MList.insertAdjacentHTML('afterbegin',
                        generateModalProduct(Mel[0].img[1], Mel[0].name, Mel[0].price, Mel[0].id));
                }
            },
            isClose: () => {
            }
        });

    }

    // Функция увеличивает или умешьшает кол-во + удаляет и сейвит в LS
    const Increment = (array) => {
        let BtnIncrement = document.querySelectorAll('.plus ');
        let BtnDicriment = document.querySelectorAll('.minus');
        let remove = document.querySelectorAll('.remove');

        BtnIncrement.forEach((e) => {
            e.addEventListener('click', () => {
                let id = +e.closest('.productik').getAttribute('data-id');
                let count = ++e.nextElementSibling.textContent;
                localStorage.setItem('Quanty' + id, count);
                Allprice(array);
            })

        })

        BtnDicriment.forEach((e) => {
            e.addEventListener('click', () => {
                let id = +e.closest('.productik').getAttribute('data-id');
                let count = e.previousElementSibling.textContent;
                console.log(count);
                if (count > 1) {
                    count = --e.previousElementSibling.textContent;
                    localStorage.setItem('Quanty' + id, count);
                    if (count == 1) localStorage.removeItem('Quanty' + id);
                }
                Allprice(array);
            })

        })

        remove.forEach((e) => {
            e.addEventListener('click', () => {
                const here = document.querySelector('.suda');
                const BtnDis = document.querySelector('.Buy')
                let id = +e.closest('.productik').getAttribute('data-id');
                for (let key in favorites) {
                    if (id == Number(favorites[key])) {
                        favorites.splice(key, 1);
                        localStorage.setItem('favorite', JSON.stringify(favorites));
                        document.querySelector(`[data-id='${id}']`).remove();
                        localStorage.removeItem('Quanty' + id)
                        Allprice(array);
                        nofy(favorites);
                    }
                }
                if (favorites.length == 0) {
                    here.textContent = 'Тут пусто';
                    BtnDis.classList.add('active');
                    BtnDis.disabled = true;
                }
            })
        })
    }

    // При загрузке страницы раздает всем кол-во из LS
    let loaded = () => {
        favorites.forEach((e) => {
            console.log(e);
            if (localStorage.getItem('Quanty' + e)) {
                let vas = document.querySelector(`[data-id='${e}']`);
                vas = vas.querySelector('.number').textContent = localStorage.getItem('Quanty' + e);
            }
        })
    }

    // Считает общую цену 
    const Allprice = (array) => {
        const allprice = document.querySelector('.total');
        let suma = 0;
        favorites.forEach((e) => {
            let massiv = search(array, e);
            let Money = parseInt(massiv[0].price);
            if (localStorage.getItem('Quanty' + e)) {
                suma += Money * +localStorage.getItem('Quanty' + e);
            } else { suma += Money; }
        })
        allprice.textContent = '€' + suma;
    }

    let searchs = document.querySelector('.header_search');

    let head = document.querySelector('header');
    let inpit = document.querySelector('#inpit');
    let variabels = document.querySelector('.wrap_variabels');

    document.querySelector('.menu').addEventListener('change', (e) => {
        event.preventDefault();
        document.querySelector('nav').classList.toggle('table');
    });
    searchs.addEventListener('click', () => {
        document.querySelector('.wrap').classList.toggle('active');
        document.querySelector('.search').classList.toggle('active');
        document.querySelector('nav').classList.toggle('active');
        variabels.classList.toggle('active');
        head.classList.toggle('hidden');
        inpit.focus();

       
    });

    function generateSearchItem(title, img, price, id) {
        return `<a  href="description.html" class="variabels_items" data-id="${id}">
                    <img src="${img[1]}" alt="${title}">
                    <div class="variabels_info">
                        <h4 class="variabels_title">${title}</h4>
                        <span class="product_price">${'€' + price}</span>
                    </div>
                </a>`
    }

    const takeSearch = (array) => {
        inpit.addEventListener('keyup', () => {
            if (String(searchs.value).length >= 1) {
                variabels.innerHTML = '';
                array.forEach((e) => {
                    let mas = e.filter(({ name }) => name.toLowerCase().includes(inpit.value.toLowerCase()));
                    if (mas.length) {
                        mas.forEach((e) => {
                            variabels.insertAdjacentHTML('beforeend', generateSearchItem(e.name, e.img, e.price, e.id));
                            let SearchItem = document.querySelectorAll('.variabels_items')
                            console.log(SearchItem);
                            SearchItem.forEach((e) => {
                                e.addEventListener('click', () => {     
                                    localStorage.setItem('curentId', e.getAttribute('data-id'));
                                })
                            })
                        })
                    }
                })
            }
        })
    }
});





