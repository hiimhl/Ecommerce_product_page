"use strict";

let count = 0;
let cartNum = 0;
let num = document.querySelector(".count_num");
const cartBtn = document.querySelector(".cart_btn");
const countMinusBtn = document.querySelector(".count_minus");
const countPlusBtn = document.querySelector(".count_plus");
const addBtn = document.querySelector(".btns_add");
const thumbnails = document.querySelector(".thumbnails");

//toggle the cart visible
function toggleCart() {
  const shoppingCart = document.querySelector(".cart-box");
  shoppingCart.classList.toggle("hidden");
}

// use the buttons to in/decrease the number
function increaseCount() {
  count++;
  num.innerText = count;
}

function decreaseCount() {
  if (count > 0) {
    count--;
  }
  num.innerText = count;
}

// add the item list to shopping cart
function makeLi(li, num) {
  return (li.innerHTML = `
  <li class="cart_item">
    <div class="item_info">
      <img
        src="images/image-product-1-thumbnail.jpg"
        alt="item_img"
        class="item_img"
      />
      <span class="item_product">스니커즈</span>
      <span class="item_price">125,000원</span>
    </div>
    <div class="cart_btns">
      <button class="count-btn cart_minus">
        <i class="fa-solid fa-minus"></i>
      </button>
      <span class="cart_num">${num}</span>
      <button class="count-btn cart_plus">
        <i class="fa-solid fa-plus"></i>
      </button>
      <button class="count-btn cart_remove">
        <i class="fa-solid fa-trash-can"></i>
      </button>
    </div>
  </li>
`);
}

function addCart() {
  if (count === 0) {
    alert("수량을 추가해주세요.");
  }
  if (count > 0 && window.confirm("추가하시겠습니까?")) {
    const cart = document.querySelector(".cart_list");
    const empty = document.querySelector(".cart_empty");
    const li = document.createElement("li");

    //copy the count
    cartNum += count;

    //hide the empty message
    empty.classList.add("hidden");

    //eidt ea

    //make and append item list
    makeLi(li, cartNum);

    cart.appendChild(li);

    const minusBtn = document.querySelector(".cart_minus");
    const plusBtn = document.querySelector(".cart_plus");
    const cartEa = document.querySelector(".cart_num");

    minusBtn.addEventListener("click", () => (cartNum -= 1));
    plusBtn.addEventListener("click", () => (cartNum += 1));
    cartEa.innerText = cartNum;
    console.log(cartEa);
    count = 0;
    num.innerText = count;
  }
}

function changeOverlayImg(e) {
  const img = e.target.alt;
  console.log(img);

  const overlay = document.querySelector(".overlay");
  const overlayImg = document.querySelector(".overlay_main");
  const thumbnail = document.querySelector(`.${img}`);

  overlay.classList.toggle("hidden");

  overlayImg.innerHTML = `
      <button class="overlay_btn overlay_left">
        <img src="images/icon-previous.svg" />
      </button>
      <img
      class="overlay_main-img"
      src="images/image-${img}.jpg"
      alt="product-image"
      />
      <button class="overlay_btn overlay_right">
        <img src="images/icon-next.svg" />
      </button>
  `;
  thumbnail.classList.toggle("selected");
}

// Event Listener
function addEvent() {
  cartBtn.addEventListener("click", toggleCart);
  countMinusBtn.addEventListener("click", decreaseCount);
  countPlusBtn.addEventListener("click", increaseCount);
  addBtn.addEventListener("click", addCart);
  thumbnails.addEventListener("click", changeOverlayImg);
}

addEvent();
