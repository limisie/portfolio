const nav = document.querySelector("nav");
const burgerButton = document.querySelector("#burgerButton");

function handleMenuClick() {
    document.querySelector("body").classList.toggle("no-scroll");
    nav.classList.toggle("unfolded");
    nav.classList.toggle("hidden");
    burgerButton.classList.toggle("unfolded");
}

function foldNav() {
    nav.classList.remove("unfolded");
    nav.classList.remove("hidden");
    burgerButton.classList.remove("unfolded");
}

function animateNav(animate = true) {
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
        if (!nav.classList.contains("unfolded")) {
            nav.classList.add("hidden");
            burgerButton.classList.remove("hidden");
        }
    }
}

function highlightActiveLink() {
    const activePage = window.location.href;
    const links = nav.querySelectorAll("a");
    links.forEach(link => {
        link.classList.toggle("active", link.href.split("/")[3] === activePage.split("/")[3])
    })
}

burgerButton.addEventListener("click", handleMenuClick);
window.addEventListener("scroll", () => animateNav());
window.addEventListener("resize", () => animateNav());

document.addEventListener("astro:page-load", () => {
    foldNav();
    animateNav(false);
    highlightActiveLink();
});