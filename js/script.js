let cart = [];

let IsSwitch = true;

function opSwitch() {
  if (IsSwitch) {
    newCart();
  } else {
    updateCartUi();
  }

  totAmtUi("total-price");
}

function cartHead() {
  const cart_hed = document.getElementById("cart_hed");
  cart_hed.innerHTML = "";
  cart_hed.textContent = `your cart (${cart.length})`;
}

function totalAmount() {
  var sum = 0;

  cart.forEach((item) => {
    const price = item.price * item.quantity;
    sum += price;
  });

  return sum;
}

function addToCart(productId, productName, price, img) {
  const existingProduct = cart.find((item) => item.productId === productId);
  if (existingProduct) {
    // existingProduct.quantity += 1;
  } else {
    cart.push({ productId, productName, price, img, quantity: 1 });
  }

  cartHead();
  opSwitch();
  confmCartUi();
}

function newCart() {
  const cartContainer = document.getElementById("my-cart");
  cartContainer.innerHTML = "";

  //creating element

  let ul = document.createElement("ul");
  ul.classList.add("list-unstyled");
  ul.id = "my-ul";

  let div_1 = document.createElement("div");
  div_1.classList.add("card-footer");
  div_1.id = "total-price";
  div_1.textContent = "Cart foot";

  let div_2 = document.createElement("div");
  div_2.classList.add("icon_div", "alert", "alert-warning");
  let img = document.createElement("img");
  img.src = "../img/icon-carbon-neutral.svg";

  const cont = document.createTextNode("This is a carbon-nertral delivery");

  div_2.appendChild(img);
  div_2.appendChild(cont);

  let div_3 = document.createElement("div");
  div_3.classList.add("align-self-end");

  let btn = document.createElement("button");
  btn.setAttribute("data-bs-toggle", "modal");
  btn.setAttribute("data-bs-target", "#exampleModal");
  btn.classList.add("btn", "btn-danger");
  btn.id = "my-btn";
  btn.textContent = "Start New Order";

  cartContainer.appendChild(ul);

  cartContainer.appendChild(div_1);

  cartContainer.appendChild(div_2);

  div_3.appendChild(btn);
  cartContainer.appendChild(div_3);

  IsSwitch = false;
  updateCartUi();
}

function updateCartUi() {
  //calling fun
  //selecting ul
  const unorderlist = document.getElementById("my-ul");
  unorderlist.innerHTML = "";

  cart.forEach((item) => {
    const productitem = document.createElement("li");
    productitem.setAttribute("data-id", `${item.productId}`);
    productitem.classList.add(
      "list-item",
      "d-flex",
      "justify-content-between",
      "align-items-center"
    );

    const div_4 = document.createElement("div");
    div_4.classList.add("d-flex", "flex-column");

    const productElement = document.createElement("h6");
    productElement.textContent = item.productName;
    productElement.classList.add("mb-1");

    div_4.appendChild(productElement);

    const div_5 = document.createElement("div");
    div_5.classList.add("d-flex");

    const productitem_2 = document.createElement("span");
    productitem_2.classList.add("mx-2");
    productitem_2.textContent = ` ${item.quantity}x`;

    div_5.appendChild(productitem_2);

    const productitem_3 = document.createElement("span");
    productitem_3.textContent = `@$${item.price}`;

    div_5.appendChild(productitem_3);

    const productitem_4 = document.createElement("span");
    productitem_4.classList.add("mx-2");
    var item_price = item.quantity * item.price;
    productitem_4.textContent = `$${item_price}`;

    div_5.appendChild(productitem_4);

    div_4.appendChild(div_5);

    productitem.appendChild(div_4);

    const btn_1 = document.createElement("button");
    btn_1.ariaLabel = "Close";
    btn_1.classList.add("btn_1", "btn-close");
    btn_1.setAttribute("data-id", `${item.productId}`);

    productitem.appendChild(btn_1);

    unorderlist.appendChild(productitem);

    productBtn(item.productId, item.quantity);
  });
}

function totAmtUi(idname) {
  const total_price = document.getElementById(idname);
  total_price.innerHTML = "";

  //total of the price
  const div = document.createElement("div");
  div.classList.add("d-flex", "justify-content-between");

  const total_txt = document.createElement("h6");
  total_txt.classList.add("m-0");
  total_txt.textContent = "Total";

  div.appendChild(total_txt);

  const total_anmt = document.createElement("h5");
  total_anmt.classList.add("m-0");

  const total = totalAmount(); // calling the total-price

  total_anmt.textContent = `$${total}`;
  div.appendChild(total_anmt);

  total_price.appendChild(div);
}

function confmCartUi() {
  const mainCont = document.getElementById("conf_cart");
  mainCont.innerHTML = "";

  cart.forEach((item) => {
    const itmLi = document.createElement("li");
    itmLi.classList.add("list-group-item", "d-flex", "align-items-start");
    itmLi.innerHTML = `
            <img src="${item.img}" class="img-fluid me-3" style="width:50px;">
            <div class="flex-grow-1">
                <h6 class="mb-1">${item.productName}</h6>
                <div class="mb-1 text-muted">
                        <span class="mx-2">${item.quantity}x</span>
                        <span>@$${item.price}</span>
                                      
                </div> 
            </div>
            <div class="text-end">
                <span class="mx-2">  $${item.price * item.quantity}</span>
            </div>
            `;
    mainCont.appendChild(itmLi);
    totAmtUi("total-price-2");
  });
}

document.querySelectorAll(".add-to-cart").forEach((button) => {
  button.addEventListener("click", function () {
    const productId = parseInt(this.getAttribute("data-id"), 10);
    const productName = this.getAttribute("data-name");
    const price = parseFloat(this.getAttribute("data-price"));
    const img = this.getAttribute("img-data");
    addToCart(productId, productName, price, img);
  });
});

// Event delegation for dynamically added close buttons
document.getElementById("my-cart").addEventListener("click", function (event) {
  if (event.target.classList.contains("btn-close")) {
    const productId = parseInt(event.target.getAttribute("data-id"), 10);
    removeItem(productId);
  }
});

function removeItem(id) {
  const index = cart.findIndex((item) => item.productId == id);
  if (index !== -1) {
    cart.splice(index, 1);
  }

  const liElement = document.querySelector(`li[data-id='${id}']`);
  if (liElement) {
    liElement.remove();
  }

  totAmtUi("total-price-2");
  totAmtUi("total-price");
  cartHead();
  confmCartUi();
}

function productBtn(id, quantity) {
  if (quantity > 0) {
    btnNewUi(id, quantity);
  } else if (quantity == 0) {
    btnOldUi(id);
    removeItem(id);
  } else {
    btnOldUi(id);
  }
}

function btnNewUi(id, quantity) {
  const num = document.querySelector(`button[data-id='${id}']`);
  num.innerHTML = "";
  num.innerHTML = `
        <div  class="d-flex text-center align-items-center justify-content-between" id="bla">
            <a class="btn btn-outline-secondary d-flex justify-content-center align-items-center bla" 
                style="width: 25px; height: 25px; border-radius: 50%; padding: 0; line-height: 25px; font-size: 18px;" 
                data-opp="dec" data-id="${id}">
                -
            </a>
               <span class="mx-2">${quantity}</span>
            <a class="btn btn-outline-secondary d-flex justify-content-center align-items-center bla" 
                style="width: 25px; height: 25px; border-radius: 50%; padding: 0; line-height: 25px; font-size: 18px;" 
                data-opp="inc" data-id="${id}">
                +
            </a>
        </div>
    `;
}

function btnOldUi(id) {
  const num = document.querySelector(`button[data-id='${id}']`);
  num.innerHTML =
    '<img class="m-2" src="./img/icon-add-to-cart.svg" alt="icon">Add to Cart';
}

function quantityNum(id, set) {
  const element = document.getElementById("bla");
  element.classList.remove("add-to-cart");
  const existingProduct = cart.find((item) => item.productId === id);
  if (existingProduct) {
    if (set === "inc") {
      existingProduct.quantity++;
    } else if (set === "dec" && existingProduct.quantity > 0) {
      existingProduct.quantity--;
    }

    totAmtUi("total-price-2");
    totAmtUi("total-price");
    cartHead();
    confmCartUi();
    updateCartUi(); // Update the UI after changing quantity
    totAmtUi("total-price"); // Update total amount
  }
}

// Use document.querySelectorAll to target elements with the class 'bla'
document.querySelectorAll("#bla").forEach(function (button) {
  button.addEventListener("click", function (event) {
    const opp = event.target.getAttribute("data-opp");
    const productId = parseInt(event.target.getAttribute("data-id"), 10);
    quantityNum(productId, opp);
  });
});
