// counting to the end of promotions //
(function () {
    const second = 1000,
        minute = second * 60,
        hour = minute * 60,
        day = hour * 24;

    let promotion = "Sep 09, 2021 23:59:59",
        countDown = new Date(promotion).getTime(),
        x = setInterval(function () {

            let now = new Date().getTime(),
                time = countDown - now;

            document.querySelector(".days").innerText = Math.floor(time / (day)),
                document.querySelector(".hours").innerText = Math.floor((time % (day)) / (hour)),
                document.querySelector(".minutes").innerText = Math.floor((time % (hour)) / (minute)),
                document.querySelector(".seconds").innerText = Math.floor((time % (minute)) / second);
        }, 0)

}());

// add produstcs by JSON //

let productsContainer = document.querySelector('.in_row');


let url = "http://localhost:3000";
const getProduct = (id) => {
    $.ajax({
        method: "GET",
        url: url + `/list/${id}/`,
        dataType: "json",
        success: addProduct,
    });
};

const mapResponce = (response) => {
    return {
        id: response.id,
        productQuantity: response.unit.name + response.availability.name,
        saving: response.price.gross.base_float - response.price.gross.promo_float + "zł",
        productImage: response.main_image,
        productNewPrice: response.price.gross.final,
        productOldPrice: response.price.gross.base,
        companyName: response.producer.name,
        name: response.name,
    };
};
const createProduct = ({ id, productQuantity, saving, productImage, productNewPrice, productOldPrice, name, companyName }) => {
    return `
      <div class="product- ${id}">
          <div class="head">
            <div class="quantity"><img src="pictures/Inteligentny_obiekt_wektorowy_kopia_17.png">${productQuantity}</div>
            <div class="save">
              <p>oszczędzasz:<span>${saving}<span></p>
            </div>
          </div>
          <div class="image"><img src=" https://outletmeblowy.pl/environment/cache/images/300_300_productGfx_${productImage}.jpg"></div>
          <div class="description">
            <div class="prices">
              <span id="new-price">${productNewPrice}</span>
              <span id="old-price">${productOldPrice}</span>
            </div>
            <div class="desc-text">
              <span id="name">${name}</span><br>
              <span id="company">${companyName}</span>
            </div>
          </div>
        </div>
      `;
};
const addProduct = (response) => {
    const productParams = mapResponce(response);
    const productElement = createProduct(productParams);
    $(productsContainer).append(productElement)
};
const productIds = [1641, 1764, 1723, 1827];
productIds.forEach(id => {
    getProduct(id)
})

// buttons show 2/4/8 items on site//

let buttonTwo = document.querySelector('#two_products');
let buttonFour = document.querySelector('#four_products');
let buttonEight = document.querySelector('#eight_products');

buttonTwo.addEventListener('click', twoProducts)
function twoProducts() {
    $(productsContainer).empty(productsContainer);
    const productIds = [1641, 1764];
    productIds.forEach(id => {
        getProduct(id)
   
    })
    productsContainer.style.justifyContent='space-around'
}
buttonFour.addEventListener('click', fourProducts)
function fourProducts() {
    $(productsContainer).empty(productsContainer);
    const productIds = [1641, 1764, 1723, 1827];
    productIds.forEach(id => {
        getProduct(id)
    })
}

buttonEight.addEventListener('click', eightProducts)
function eightProducts() {
    $(productsContainer).empty(productsContainer);
    const productIds = [1641, 1764, 1723, 1827,1834,1641,1764,1723];
    productIds.forEach(id => {
        getProduct(id)
    })
}
