/* SHOW MENU */
const navMenu = document.getElementById("nav-menu"),
	navToggle = document.getElementById("nav-toggle"),
	navClose = document.getElementById("nav-close");

/* MENU SHOW */
/* Validate if constant exists */
if (navToggle) {
	navToggle.addEventListener("click", () => {
		navMenu.classList.add("show-menu");
	});
}

/* MENU HIDDEN */
/* Validate if constant exists */
if (navClose) {
	navClose.addEventListener("click", () => {
		navMenu.classList.remove("show-menu");
	});
}

/* REMOVE MENU MOBILE */
const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
	const navMenu = document.getElementById("nav-menu");
	// When we click on each nav__link, we remove the show-menu class
	navMenu.classList.remove("show-menu");
}
navLink.forEach((n) => n.addEventListener("click", linkAction));

/* HOME SWIPER */
let homeSwiper = new Swiper(".home-swiper", {
	spaceBetween: 30,
	loop: "true",

	pagination: {
		el: ".swiper-pagination",
		clickable: true
	}
});

let root = document.documentElement;

homeSwiper.on("transitionEnd", function (e) {
	if (this.activeIndex == 1) {
		root.style.setProperty(
			"--body-color",
			"linear-gradient(to right, #E8CAFB, #6A4FB6)"
		);
		root.style.setProperty("--sub", "#303056");
		root.style.setProperty("--title-color", "#303056");
		root.style.setProperty(
			"--container-color",
			"linear-gradient(136deg, #E8CAFB, #6A4FB6)"
		);
	}
// FONDO SLIDER 2
	if (this.activeIndex == 2) {
		root.style.setProperty(
			"--body-color",
			"linear-gradient(to right, #5B874B, #0C3720)"
		);
		root.style.setProperty("--sub", "#ffffff");
		root.style.setProperty("--title-color", "#ffffff");
		root.style.setProperty(
			"--container-color",
			"linear-gradient(136deg, #5B874B, #0C3720)"
		);
	}
// FONDO SLIDER 3
	if (this.activeIndex == 3) {
		root.style.setProperty(
			"--body-color",
			"linear-gradient(to right, #CD5C5C, #200A2B)"
		);
		root.style.setProperty("--sub", "#ff5b79");
		root.style.setProperty("--title-color", "#ffffff");
		root.style.setProperty(
			"--container-color",
			"linear-gradient(136deg, #CD5C5C, #200A2B)"
		);
	}
});

/* CHANGE BACKGROUND HEADER */
function scrollHeader() {
	const header = document.getElementById("header");
	if (this.scrollY >= 50) header.classList.add("scroll-header");
	else header.classList.remove("scroll-header");
}
window.addEventListener("scroll", scrollHeader);

/* NEW SWIPER */
let newSwiper = new Swiper(".new-swiper", {
	centeredSlides: true,
	slidesPerView: "auto",
	loop: "true",
	spaceBetween: 16
});



/* SHOW SCROLL UP */
function scrollUp() {
	const scrollUp = document.getElementById("scroll-up");
	if (this.scrollY >= 460) scrollUp.classList.add("show-scroll");
	else scrollUp.classList.remove("show-scroll");
}
window.addEventListener("scroll", scrollUp);

