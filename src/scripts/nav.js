const body = document.querySelector("body");
const header = document.querySelector("header");
const nav = document.querySelector("nav");
const burgerButton = document.querySelector("#burgerButton");

function handleMenuClick() {
    body.classList.toggle("no-scroll");
    header.classList.toggle("unfolded");
    nav.classList.toggle("hidden");
    burgerButton.classList.toggle("unfolded");
}

function toggleNav(animate = true) {
    if (
        window.scrollY < 50 &&
        window.matchMedia("(min-width: 40rem)").matches
    ) {
        if (animate) {
            nav.classList.add("animated");
        }
        nav.classList.remove("hidden");
        burgerButton.classList.add("hidden");
        setTimeout(() => {
            nav.classList.remove("animated");
        }, 200);
    } else if (
        window.scrollY >= 50 ||
        !window.matchMedia("(min-width: 40rem)").matches
    ) {
        if (!header.classList.contains("unfolded")) {
            nav.classList.add("hidden");
            burgerButton.classList.remove("hidden");
        }
    }
}

toggleNav(false);
burgerButton.addEventListener("click", handleMenuClick);
window.addEventListener("scroll", () => toggleNav());
window.addEventListener("resize", () => toggleNav());