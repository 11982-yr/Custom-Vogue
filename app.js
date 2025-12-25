/* =========================
   Smooth anchor scrolling
   ========================= */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", e => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth" });
  });
});

/* =========================
   Fake subscribe submit
   ========================= */
const subscribeForm = document.querySelector(".subscribe__form");
if (subscribeForm) {
  subscribeForm.addEventListener("submit", e => {
    e.preventDefault();
    const input = subscribeForm.querySelector("input");
    if (!input.value) return;

    input.value = "";
    input.placeholder = "You're on the list ✨";
  });
}

/* =========================
   Page transitions (SAFE)
   ========================= */

// Fade-out only for real page navigation
document.addEventListener("click", (e) => {
  const link = e.target.closest("a");
  if (!link) return;

  const href = link.getAttribute("href");

  // Allow normal behavior for:
  if (
    !href ||
    href.startsWith("#") ||            // anchor links
    link.target === "_blank" ||         // new tabs
    link.hasAttribute("download") ||    // downloads
    /^https?:\/\//i.test(href)           // external
  ) {
    return;
  }

  e.preventDefault();
  document.body.classList.add("is-leaving");

  setTimeout(() => {
    window.location.href = href;
  }, 200);
});
