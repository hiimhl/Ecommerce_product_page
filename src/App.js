"use strict";

let count = 0;
let cartNum = 0;
let selectedImg = "product-1";
let selectedOverlayImg = "product-1";

// cart
let num = document.querySelector(".count_num");
const cartBtn = document.querySelector(".cart_btn");
const countMinusBtn = document.querySelector(".count_minus");
const countPlusBtn = document.querySelector(".count_plus");
const addBtn = document.querySelector(".btns_add");

// main
const mainImg = document.querySelector(".images_main");
const thumbForm = document.querySelector(".thumbnails");
const thumbRadio = document.querySelectorAll(".thumb-radio");

// overlay
const overlay = document.querySelector(".overlay");
const overlayCloseBtn = document.querySelector(".close_btn");
const overlayMainImg = document.querySelector(".overlay_main-img");
const overlayBtns = document.querySelector(".overlay_main");
const overlayThumbForm = document.querySelector(".overlay_thumbnails");
const overlayThumbs = document.querySelectorAll(".overlay_thumbnail");

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

    //make and append item list
    makeLi(li, cartNum);

    cart.appendChild(li);

    const minusBtn = document.querySelector(".cart_minus");
    const plusBtn = document.querySelector(".cart_plus");
    const cartEa = document.querySelector(".cart_num");

    minusBtn.addEventListener("click", () => (cartNum -= 1));
    plusBtn.addEventListener("click", () => (cartNum += 1));
    cartEa.innerText = cartNum;
    count = 0;
    num.innerText = count;
  }
}

//해당 radio button이 선택되었다면 메인이미지를 변경
function changeMainImg() {
  thumbRadio.forEach((it) => {
    if (it.checked) {
      const targetId = it.id;
      const label = document.querySelector(`.${targetId}`);
      label.classList.add("selected");
      mainImg.classList.add(`main_${targetId}`);
      //to use overlay
      selectedImg = targetId;
    } else {
      const targetId = it.id;
      const label = document.querySelector(`.${targetId}`);
      label.classList.remove("selected");
      mainImg.classList.remove(`main_${targetId}`);
    }
  });
}

// handle the selected css of overlay Thumbnails
function overlaySelectedThumb() {
  overlayThumbs.forEach((thumb) =>
    thumb.getAttribute("data-product") === selectedOverlayImg
      ? thumb.classList.add("selected")
      : thumb.classList.remove("selected")
  );
}

//클릭시 메인 이미지의 정보를 받아오기
function overlayHandler() {
  overlayMainImg.style.backgroundImage = `url(images/image-${selectedImg}.jpg)`;
  overlay.classList.toggle("hidden");

  const productNum = selectedImg.slice(-1);
  const selectedThumb = document.querySelector(`.overlay_${productNum}`);
  selectedThumb.classList.add("selected");
}

//썸네일 클릭시 메인 이미지 변경
function overlayThumbHandler(e) {
  selectedOverlayImg = e.target.value || "product-1";
  overlayMainImg.style.backgroundImage = `url(images/image-${selectedOverlayImg}.jpg)`;

  overlaySelectedThumb();
}

function closeOverlay() {
  overlay.classList.toggle("hidden");

  // remove the selected css
  overlayThumbs.forEach((thumb) => thumb.classList.remove("selected"));
}

// Handle the overlay slider buttons
function overlaySliderBtnsHandler(e) {
  let data = e.target.dataset;
  let value = parseInt(selectedOverlayImg.slice(-1));
  // console.log(value);

  if (data.btn === "left") {
    // click the left button
    if (value === 1) {
      return;
    } else {
      value -= 1;
      selectedOverlayImg = `product-${value}`;
      overlayMainImg.style.backgroundImage = `url(images/image-product-${value}.jpg)`;

      overlaySelectedThumb();
    }
  } else if (data.btn === "right") {
    // click the right button
    if (value === 4) {
      return;
    } else {
      value += 1;
      selectedOverlayImg = `product-${value}`;
      overlayMainImg.style.backgroundImage = `url(images/image-product-${value}.jpg)`;

      overlaySelectedThumb();
    }
  } else {
    // click main image or empty space
    return;
  }
}

// Event Listener
function addEvent() {
  cartBtn.addEventListener("click", toggleCart);
  countMinusBtn.addEventListener("click", decreaseCount);
  countPlusBtn.addEventListener("click", increaseCount);
  addBtn.addEventListener("click", addCart);
  mainImg.addEventListener("click", overlayHandler);
  overlayCloseBtn.addEventListener("click", closeOverlay);
  thumbForm.addEventListener("click", changeMainImg);
  overlayThumbForm.addEventListener("click", overlayThumbHandler);
  overlayBtns.addEventListener("click", overlaySliderBtnsHandler);
}

addEvent();
