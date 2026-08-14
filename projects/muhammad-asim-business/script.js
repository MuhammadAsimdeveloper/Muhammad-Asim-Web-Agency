/* Portfolio demo JavaScript — mobile navigation, active portfolio link and enquiry form. */
document.addEventListener("DOMContentLoaded", function () {
  const menuBtn = document.getElementById("menuBtn");
  const mainNav = document.getElementById("mainNav");

  if (menuBtn && mainNav) {
    menuBtn.addEventListener("click", function () {
      const open = mainNav.classList.toggle("show");
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    mainNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mainNav.classList.remove("show");
        menuBtn.setAttribute("aria-expanded", "false");
      });
    });
  }

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  document.querySelectorAll(".btn").forEach(function (button) {
    button.addEventListener("click", function () {
      button.style.transform = "scale(.97)";
      setTimeout(function () { button.style.transform = ""; }, 120);
    });
  });

  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const project = document.getElementById("project").value;
      const message = document.getElementById("message").value.trim();
      const subject = encodeURIComponent("Business Website Enquiry - " + project);
      const body = encodeURIComponent(
        "Hello Muhammad Asim Web Agency,\n\n" +
        "Name: " + name + "\n" +
        "Email: " + email + "\n" +
        "Business Need: " + project + "\n\n" +
        "Details:\n" + message + "\n\nSent from the portfolio business website demo."
      );
      window.location.href = "mailto:sanjarkhanabbasi786@gmail.com?subject=" + subject + "&body=" + body;
    });
  }
});
