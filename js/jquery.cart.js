
let btnLocation = document.getElementById('open_cart_btn');

function formatterCart (priceSum) {
    let price = priceSum.toString();
    let formattedPrice = '';
    for (let i = 0; i < price.length; i++) {
        if (i > 0 && i % 3 === 0) {
            formattedPrice = ' ' + formattedPrice;
        }
        formattedPrice = price[price.length - 1 - i] + formattedPrice;
    }
    return formattedPrice;
};
function getUniqueObjects(arr) {
    const seen = new Set(); 
    const uniqueObjects = []; 
    for (const item of arr) {
        const stringifiedItem = JSON.stringify(item); 

        if (!seen.has(stringifiedItem)) {
            seen.add(stringifiedItem); 
            uniqueObjects.push(item);
        }
    }

    return uniqueObjects;
}
function updateTotalSum() {
    let totalSum = 0;
    document.querySelectorAll(".jqcart_tbody").forEach(row => {
        let sumElement = row.querySelector(".jqcart_sum");
        let sumValue = parseInt(sumElement.textContent, 10) || 0;
        totalSum += sumValue;
    });
    document.querySelector(".jqcart_total").textContent = totalSum;
}
function getSumOfDuplicatePrices(items, targetName) {
    let totalSum = 0;
    let count = 0;
    
    for (const item of items) {
        if (item.title == targetName) {
            totalSum += parseInt(item.price);
            count++;
        }
    }
    
    return totalSum;
}
function getDuplicateCount(items, targetName) {
    let count = 0;
    
    for (const item of items) {
        if (item.title == targetName) {
            count++;
        }
    }
    
    return count;
}
function getElement(busket){
 
    let uniqLst =  getUniqueObjects(busket);
    let element = ""
    for(let i = 0; i < uniqLst.length; i++){
        element += `<ul class="jqcart_tbody" data-id="${uniqLst[i].code}">
                        <li class="jqcart_small_td">
                            <img src="${uniqLst[i].img}" alt="Img">
                        </li>
                        <li>
                            <div class="jqcart_nd">
                                <a href="${uniqLst[i].link}">${uniqLst[i].title}</a>
                            </div>
                        </li>
                        <li></li>
                        <li class="jqcart_price">${uniqLst[i].price}</li>
                        <li>
                            <div class="jqcart_pm">
                                <input type="text" class="jqcart_amount" value="${getDuplicateCount(busket, uniqLst[i].title)}">
                                <span class="jqcart_incr" data-incr="1"}">
                                    <i class="fa fa-angle-up" aria-hidden="true"></i>
                                </span>
                                <span class="jqcart_incr" data-incr="-1">
                                    <i class="fa fa-angle-down" aria-hidden="true"></i>
                                </span>
                            </div>
                        </li>
                        <li class="jqcart_sum">${getSumOfDuplicatePrices(busket,uniqLst[i].title)} тг</li>
                    </ul>` 
    }
    return element;
}

function getSum(busket){
    let sum = 0;
    for(let i = 0; i < busket.length; i++){
        sum += parseInt(busket[i].price);
    }
    return sum;
}
btnLocation.addEventListener('click', function () {

    const divElement = document.createElement('div');
    let busket = JSON.parse(localStorage.getItem("listBusket")); 
    divElement.classList.add('jqcart_layout');
    console.log(busket)
    divElement.innerHTML = `
        <div class="jqcart_content">
            <div class="jqcart_table_wrapper">
                <div class="jqcart_manage_order">
                
                    <ul class="jqcart_thead">
                        <li></li>
                        <li>ТОВАР</li>
                        <li></li>
                        <li>ЦЕНА</li>
                        <li>КОЛИЧЕСТВО </li>
                        <li>СТОИМОСТЬ</li>
                    </ul>
                    ${ 
                        getElement(busket)   
                    }
                </div>
            </div>
            
            <div class="jqcart_manage_block">
                <div class="jqcart_btn">
                    <button class="jqcart_open_form_btn">Оформить заказ</button>
                    <form class="jqcart_order_form" style="opacity: 0">
                        <input class="jqcart_return_btn" type="reset" value="Продолжить покупки">
                    </form>
                </div>
                <div class="jqcart_subtotal">Итого: <strong class="jqcart_total">${formatterCart(getSum(busket))}</strong> тг</div>
            </div>
            
        </div>
    `;

    document.body.appendChild(divElement);
    document.querySelectorAll(".jqcart_incr").forEach(button => {
        button.addEventListener("click", function() {
            let row = this.closest("ul.jqcart_tbody");
            let input = row.querySelector(".jqcart_amount");
            let priceElement = row.querySelector(".jqcart_price");
            let sumElement = row.querySelector(".jqcart_sum");
            let price = parseInt(priceElement.textContent, 10) || 0;
            let allSumm = row.querySelector(".jqcart_sum");
            let currentValue = parseInt(input.value, 10) || 0;
            let increment = parseInt(this.getAttribute("data-incr"), 10);
            let newValue = Math.max(1, currentValue + increment);
            input.value = newValue;
            
            sumElement.textContent = (newValue * price) + " тг";
            updateTotalSum();
        });
    });
     
    // document.querySelector('.jqcart_layout').addEventListener('click', function () {
    //     document.querySelector('.jqcart_layout').remove();
    // });

});