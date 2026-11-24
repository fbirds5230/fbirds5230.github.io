(() => {
  "use strict";

  const root = document.documentElement;
  const themeToggle = document.querySelector("#theme-toggle");
  const storageKey = "fbirds-theme";

  function applyTheme(theme, remember = false) {
    const isLight = theme === "light";
    root.dataset.theme = isLight ? "light" : "dark";

    if (themeToggle) {
      const label = `Switch to ${isLight ? "dark" : "light"} theme`;
      themeToggle.setAttribute("aria-pressed", String(isLight));
      themeToggle.setAttribute("aria-label", label);
      themeToggle.setAttribute("title", label);
    }

    if (remember) {
      try {
        localStorage.setItem(storageKey, root.dataset.theme);
      } catch {
        // The theme still works when browser storage is unavailable.
      }
    }
  }

  let initialTheme = root.dataset.theme === "light" ? "light" : "dark";
  try {
    const savedTheme = localStorage.getItem(storageKey);
    if (savedTheme === "light" || savedTheme === "dark") {
      initialTheme = savedTheme;
    }
  } catch {
    // Keep the page's default theme.
  }
  applyTheme(initialTheme);

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      applyTheme(root.dataset.theme === "dark" ? "light" : "dark", true);
    });
  }

  const navToggle = document.querySelector("#nav-toggle");
  const navigation = document.querySelector("#primary-nav");

  if (navToggle && navigation) {
    function setNavigationOpen(open, restoreFocus = false) {
      navToggle.setAttribute("aria-expanded", String(open));
      navToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
      navigation.dataset.open = String(open);

      if (restoreFocus) {
        navToggle.focus();
      }
    }

    setNavigationOpen(false);
    navToggle.addEventListener("click", () => {
      setNavigationOpen(navToggle.getAttribute("aria-expanded") !== "true");
    });

    navigation.addEventListener("click", (event) => {
      if (event.target instanceof Element && event.target.closest("a")) {
        setNavigationOpen(false);
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && navToggle.getAttribute("aria-expanded") === "true") {
        event.preventDefault();
        setNavigationOpen(false, true);
      }
    });
  }

  const csvDemo = document.querySelector("#csv-demo");
  const csvOutput = document.querySelector("#csv-output");
  const rowValue = document.querySelector("#row-value");
  const demoStatus = document.querySelector("#demo-status");

  if (csvDemo && csvOutput && rowValue) {
    const modeButtons = csvDemo.querySelectorAll("[data-demo-mode]");

    function setDemoMode(mode) {
      const isAfter = mode === "after";
      csvDemo.dataset.mode = isAfter ? "after" : "before";
      csvOutput.textContent = isAfter ? '""\nvalue\n""' : "value\n";
      rowValue.textContent = isAfter ? "3" : "1";

      modeButtons.forEach((button) => {
        button.setAttribute("aria-pressed", String(button.dataset.demoMode === csvDemo.dataset.mode));
      });

      if (demoStatus) {
        demoStatus.textContent = isAfter
          ? "With the fix: quoted empty fields preserve all three records."
          : "Before the fix: only the nonempty record survives a read-back.";
      }
    }

    modeButtons.forEach((button) => {
      button.addEventListener("click", () => setDemoMode(button.dataset.demoMode));
    });
    setDemoMode(csvDemo.dataset.mode);
  }

  const birdButton = document.querySelector("#bird-button");
  const birdScene = document.querySelector("#bird-scene");
  const birdMessage = document.querySelector("#bird-message");
  let greetingTimer;

  if (birdButton) {
    birdButton.addEventListener("click", () => {
      if (birdMessage) {
        birdMessage.hidden = false;
        birdMessage.textContent = "Hey there. Thanks for stopping by.";
      }

      if (birdScene) {
        clearTimeout(greetingTimer);
        birdScene.classList.add("is-happy");
        greetingTimer = setTimeout(() => birdScene.classList.remove("is-happy"), 1400);
      }
    });
  }

  const copyButton = document.querySelector("#copy-link");
  const copyStatus = document.querySelector("#copy-status");
  const shareUrl = document.querySelector("#share-url");

  function getShareUrl() {
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical && canonical.href) {
      return canonical.href;
    }

    const currentUrl = new URL(window.location.href);
    currentUrl.hash = "";
    return currentUrl.href;
  }

  function offerManualCopy(url) {
    if (shareUrl) {
      shareUrl.value = url;
      shareUrl.hidden = false;
      shareUrl.focus();
      shareUrl.select();
    }

    if (copyStatus) {
      copyStatus.textContent = shareUrl
        ? "The link is selected below. Use your browser's Copy command."
        : "Automatic copying is unavailable. Copy the website address from your browser's address bar.";
    }
  }

  if (copyButton) {
    copyButton.addEventListener("click", async () => {
      const url = getShareUrl();
      copyButton.disabled = true;
      if (copyStatus) copyStatus.textContent = "";

      try {
        if (!navigator.clipboard || typeof navigator.clipboard.writeText !== "function") {
          throw new Error("Clipboard is unavailable.");
        }

        await navigator.clipboard.writeText(url);
        if (copyStatus) copyStatus.textContent = "Website link copied.";
        if (shareUrl) shareUrl.hidden = true;
      } catch {
        offerManualCopy(url);
      } finally {
        copyButton.disabled = false;
      }
    });
  }

  // Only enhance the navigation after its keyboard and pointer controls exist.
  root.classList.add("js");
})();
