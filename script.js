(function () {
    "use strict";

    const STORAGE_KEY = "theme";
    const SUN_ICON = "\uf185";
    const MOON_ICON = "\uf186";

    const rootEl = document.documentElement;
    const toggle = document.getElementById("theme-toggle");
    const icon = document.getElementById("theme-icon");
    const themeColor = document.querySelector('meta[name="theme-color"]');

    function applyTheme(theme) {
        const isLight = theme === "light";

        rootEl.classList.toggle("light", isLight);
        icon.textContent = isLight ? MOON_ICON : SUN_ICON;
        icon.classList.toggle("icon-moon", isLight);
        icon.classList.toggle("icon-sun", !isLight);
        toggle.setAttribute("aria-pressed", String(isLight));
        toggle.setAttribute(
            "aria-label",
            isLight ? "Switch to dark mode" : "Switch to light mode"
        );
        toggle.title = toggle.getAttribute("aria-label");

        if (themeColor) {
            themeColor.setAttribute("content", isLight ? "#f5f6f7" : "#1a1b1e");
        }
    }

    toggle.addEventListener("click", function () {
        const next = rootEl.classList.contains("light") ? "dark" : "light";
        try {
            localStorage.setItem(STORAGE_KEY, next);
        } catch (e) {}
        applyTheme(next);
    });

    window
        .matchMedia("(prefers-color-scheme: light)")
        .addEventListener("change", function (event) {
            let saved = null;
            try {
                saved = localStorage.getItem(STORAGE_KEY);
            } catch (e) {}
            if (saved !== "light" && saved !== "dark") {
                applyTheme(event.matches ? "light" : "dark");
            }
        });

    applyTheme(rootEl.classList.contains("light") ? "light" : "dark");
})();
