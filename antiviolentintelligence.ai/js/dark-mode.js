(() => {
  const toggle = document.getElementById("theme-toggle");

  if (!toggle) {
    return;
  }

  function currentTheme() {
    return document.documentElement.dataset.theme === "dark"
      ? "dark"
      : "light";
  }

  function setTheme(theme) {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);

    const nextTheme = theme === "dark" ? "light" : "dark";
    toggle.setAttribute("aria-label", `Switch to ${nextTheme} mode`);
    toggle.setAttribute("title", `Switch to ${nextTheme} mode`);
  }

  setTheme(currentTheme());

  toggle.addEventListener("click", () => {
    setTheme(currentTheme() === "dark" ? "light" : "dark");
  });
})();
