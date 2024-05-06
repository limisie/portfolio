function getTheme() {
    if (
        typeof localStorage !== "undefined" &&
        localStorage.getItem("theme")
    ) {
        return localStorage.getItem("theme");
    }
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        return "dark";
    }
    return "light";
};

function changeTheme(newTheme) {
    document.documentElement.dataset.theme = newTheme;
    document.querySelector("#themeIcon").setAttribute("class", newTheme);
}

function handleThemeClick() {
    const theme = document.documentElement.dataset.theme;
    const newTheme = theme == "light" ? "dark" : "light";
    changeTheme(newTheme);
    localStorage.setItem("theme", newTheme);
}

document.addEventListener(
    "astro:page-load",
    () => {
        const theme = getTheme()
        changeTheme(theme);
        localStorage.setItem("theme", theme);
    },
    { once: true },
);

const themeButton = document.querySelector("#themeButton");
themeButton.addEventListener("click", handleThemeClick);
document.addEventListener("astro:after-swap", () => {
    changeTheme(getTheme());
});