// LIST

const data = [
    {
        link: '#chair.html',
        title: 'Slim PRO',
        desc: 'Cтул Slim PRO предназначено не только для работы за компьютером, но и для дополнения антуража помещения. Красиво выполненная конструкция не только изысканно смотрится.',
        price: '83000',
        img: 'images/stul_kresla/SlimPRO.png',
        code: '6702',
        parent: 'computer',
        category: 'computer_chair',
    },
    {
        link: '#chair.html',
        title: 'Slim',
        desc: 'Изящные, легкие, универсальные и эргономичные кресла Slim подойдут для кабинета руководителя. А различные модификации этой серии позволят оформить в едином стиле различные зоны офиса.',
        price: '79000',
        img: 'images/stul_kresla/slim.png',
        code: '6101',
        parent: 'computer',
        category: 'computer_chair',
    },
    {
        link: '#chair.html',
        title: 'Slim DC',
        desc: 'Кресло Slim DC - это офисное кресло для руководителя спинка и сидение которого выполнена из из мягкой сетки.',
        price: '134100',
        img: 'images/stul_kresla/GloryDC.png',
        code: '6987',
        parent: 'computer',
        category: 'computer_chair',
    },
    {
        link: '#chair.html',
        title: 'Hi-tech',
        desc: 'Модель Hi-tech изготовлена в модном дизайне, а значит, будет отлично смотреться в любом современном интерьере.',
        price: '95500',
        img: 'images/stul_kresla/Hi-tech.png',
        code: '6203',
        parent: 'computer',
        category: 'computer_chair',
    },
    {
        link: '#chair.html',
        title: 'Hi-tech PRO',
        desc: 'Профилированная спинка – спинка, имеет анатомически правильную форму, повторяющую естественный изгиб позвоночника.',
        price: '125000',
        img: 'images/stul_kresla/Hi-techPRO.png',
        code: '6057',
        parent: 'computer',
        category: 'computer_chair',
    },
    {
        link: '#chair.html',
        title: 'Prestige DC',
        desc: 'Утонченность и функциональность, высокое качество обивочных материалов и комплектующих – сочетание, достойное современного офисного кресла.',
        price: '122000',
        img: 'images/stul_kresla/PrestigeDC.png',
        code: '6041',
        parent: 'computer',
        category: 'computer_chair',
    },
    {
        link: '#chair.html',
        title: 'Comfort DC',
        desc: 'Многоцелевое кресло нового поколения, олицетворяет новые стандарты простоты, универсальной применимости, качества и комфорта.',
        price: '97610',
        img: 'images/stul_kresla/ComfortDC.png',
        code: '6807',
        parent: 'computer',
        category: 'computer_chair',
    },
];

// SHOW
function getElement(objectOfData){
    return `<a class="product_item_content" href="${objectOfData.link}">
            <img class="product_item_img" src="${objectOfData.img}" alt="Product">
            <div class="product_item_text">
                <h5>${objectOfData.title} | code: ${objectOfData.code}</h5>
                <p>${objectOfData.desc}</p>
            </div>
        </a>
        <div class="product_item_price">
            <span class="product_item_price_text">Цена:</span>
            <br>
            <span class="product_item_price_cost">${formatter(objectOfData.price)} <span class="product_item_price_par">₸</span> </span>
            <a class="product_item_price_btn" data-code="${objectOfData.code}">В корзину</a>
        </div>
        `
}

function formatter(priceSum){
    let price = priceSum.toString();
    let formattedPrice = '';
    for (let i = 0; i < price.length; i++) {
        if (i > 0 && i % 3 === 0) {
            formattedPrice = ' ' + formattedPrice;
        }
        formattedPrice = price[price.length - 1 - i] + formattedPrice;
    }
    return formattedPrice;
}

let computerChairList = document.getElementById('computerChairList_____SHOW');
let busket = document.querySelector(".jqcart_manage_order");
let lstItems = [];

displayList(data, computerChairList);

function displayList(array, uniqId) {
    
    uniqId.innerHTML = "";

    array.map((a) => {

        let productItem = document.createElement('div');

        productItem.classList.add("product_item");

        productItem.innerHTML = getElement(a);

        uniqId.appendChild(productItem);

    });
    lstItems = document.getElementsByClassName("product_item");
}
document.querySelector('.sorting_option').addEventListener('click', function(e){
    
    var li = e.target.closest('li');
    var nodes = Array.from(document.querySelector('.sorting_option').children); 
    var index = nodes.indexOf(li); 
    switch (index) {
        case 0: 
            displayList(data.sort((a,b) => b.price - a.price), computerChairList);
            break;
        case 1: 
            displayList(data.sort((a,b) => a.price - b.price), computerChairList);
            break;
        case 2: 
            displayList(data.sort((a,b) => b.code - a.code), computerChairList);
            break;
        case 3: 
            displayList(data.sort((a,b) => a.title.localeCompare(b.title)), computerChairList);
            break;
        default:
            displayList(data, computerChairList)
      }
      
 }); 
 var btns = document.getElementsByClassName("product_item_price_btn");
 for(let i = 0; i < btns.length; i++){
    btns[i].addEventListener("click", toBusket(btns[i]));
 }
let listBusket = [];
function toBusket(obj){
    return function() {
        localStorage.clear(); 
        document.querySelector('.open_cart_number').textContent = listBusket.length +1
        listBusket.push(data.find(x => x.code === obj.dataset.code))  
        localStorage.setItem('listBusket',JSON.stringify(listBusket))
    };
 }