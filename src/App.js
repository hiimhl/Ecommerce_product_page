"use strict";

let count = 0;
let id = 0;
let mobileImg = 1;
let selectedImg = "product-1";
let selectedOverlayImg = "product-1";

class List {
  constructor(id, productName, price, ea) {
    this.id = id;
    this.productName = productName;
    this.price = price;
    this.ea = ea;
  }
}
let dataList = [];

const body = document.getElementsByTagName("body")[0];

// cart
let num = document.querySelector(".count_num");
const cartBtn = document.querySelector(".cart_btn");
const addBtn = document.querySelector(".btns_add");
const cart = document.querySelector(".cart_list");

// main
const countMinusBtn = document.querySelector(".count_minus");
const countPlusBtn = document.querySelector(".count_plus");
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

//mobile
const mobileBtns = document.querySelector(".mobile-btns");
const mobileMenu = document.querySelector(".nav_menu");

//toggle the cart visible
function toggleCart() {
  const shoppingCart = document.querySelector(".cart-box");
  shoppingCart.classList.toggle("hidden");
  mobileBtns.classList.toggle("disable");
}

// use the buttons to in/decrease the number
function increaseCount() {
  count++;
  num.innerText = count;
}

function decreaseCount() {
  if (count === 0) {
    return;
  }
  count--;
  num.innerText = count;
}

// add the item list to shopping cart
function makeLi(li, data) {
  return (li.innerHTML = `
  <li class="cart_item" key=${data.id} >
    <div class="item_info">
      <img
        src="images/image-product-1-thumbnail.jpg"
        alt="item_img"
        class="item_img"
      />
      <div class="item_content">
        <span class="item_product">${data.productName}</span>
        <span class="item_price">${data.price}원</span>
      </div>
    </div>
    <div class="cart_btns">
      <button class="count-btn cart_minus">
        <i class="fa-solid fa-minus" data-id=${data.id} data-type="minus"></i>
      </button>
      <span class="cart_num ea_${data.id}" >${data.ea}</span>
      <button class="count-btn cart_plus">
        <i class="fa-solid fa-plus"  data-id=${data.id} data-type="plus"></i>
      </button>
      <button class="count-btn cart_remove">
        <i class="fa-solid fa-trash-can" data-id=${data.id} data-type="remove"></i>
      </button>
    </div>
  </li>
`);
}

function addCart() {
  if (count === 0) {
    return alert("수량을 추가해주세요.");
  }
  if (count > 0 && window.confirm("추가하시겠습니까?")) {
    let cartNum = 0;

    //copy the count
    cartNum += count;

    //hide the empty message
    const empty = document.querySelector(".cart_empty");
    empty.classList.add("hidden");

    // make the cart list and push to array
    const list = new List(id, "Fall Sneakers", "125000", cartNum);
    dataList.push(list);

    //make and append li to cart list
    makeItemList();

    cart.addEventListener("click", cartBtnsHandler);

    // 초기화, 값 출력
    count = 0;
    id++;
    num.innerText = count;
  }
}

function makeItemList() {
  const li = document.createElement("li");
  const cart = document.querySelector(".cart_list");
  if (dataList.length === 0) {
    cart.innerHTML = `
      <li class="cart_empty">
        <strong> Your cart is empty.</strong>
      </li>
    `;
  }
  dataList.forEach((item) => {
    makeLi(li, item);
    cart.appendChild(li);
  });
}

function cartBtnsHandler(e) {
  const dataId = e.target.dataset.id;
  const dataType = e.target.dataset.type;
  // Edit product count
  const div = e.target.parentElement.parentElement;
  const span = div.children[1];

  if (!dataId) {
    return;
  } else if (dataType === "plus") {
    // plus button
    dataList[dataId].ea += 1;
    span.innerText = dataList[dataId].ea;
    //
  } else if (dataType === "minus") {
    // minus button
    if (dataList[dataId].ea === 1) {
      return;
    }
    dataList[dataId].ea -= 1;
    span.innerText = dataList[dataId].ea;
    //
  } else if (dataType === "remove") {
    // remove button
    let array = dataList.filter((item) => item.id !== parseInt(dataId));
    dataList = array;
    if (window.confirm("삭제하시겠습니까?")) {
      makeItemList();
    }
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

function mobileMainImgHandler(e) {
  const type = e.target.dataset.type || 1;
  if (!type) {
    return;
  } else if (type === "left") {
    if (mobileImg === 1) {
      return;
    } else {
      mobileImg -= 1;
      mainImg.style.backgroundImage = `url(images/image-product-${mobileImg}.jpg)`;
    }
  } else if (type === "right") {
    if (mobileImg === 4) {
      return;
    }
    mobileImg += 1;
    mainImg.style.backgroundImage = `url(images/image-product-${mobileImg}.jpg)`;
  }
}

function mobileToggleMenu() {
  const menuBar = document.querySelector(".nav_pages");
  const closeBtn = document.querySelector(".nav_close");

  menuBar.classList.remove("disable");
  mobileBtns.classList.add("disable");

  closeBtn.addEventListener("click", () => {
    menuBar.classList.add("disable");
    mobileBtns.classList.remove("disable");
  });
}

// Event Listener
function addEvent() {
  // cart
  cartBtn.addEventListener("click", toggleCart);

  // main
  countMinusBtn.addEventListener("click", decreaseCount);
  countPlusBtn.addEventListener("click", increaseCount);
  addBtn.addEventListener("click", addCart);
  mainImg.addEventListener("click", overlayHandler);
  thumbForm.addEventListener("click", changeMainImg);

  // overlay
  overlayCloseBtn.addEventListener("click", closeOverlay);
  overlayThumbForm.addEventListener("click", overlayThumbHandler);
  overlayBtns.addEventListener("click", overlaySliderBtnsHandler);

  // mobile
  mobileBtns.addEventListener("click", mobileMainImgHandler);
  mobileMenu.addEventListener("click", mobileToggleMenu);
}

addEvent();

//  prevent the function on mobile
window.onresize = () => {
  const innerWidth = window.innerWidth;
  innerWidth <= "375"
    ? ""
    : mainImg.removeEventListener("click", overlayHandler);
};
