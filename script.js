/* =====================================================
   MUHAMMAD ASIM WEB AGENCY
   Main JavaScript
   ===================================================== */


/* ================= PAGE READY ================= */

document.addEventListener("DOMContentLoaded", function () {


    /* ================= MOBILE MENU ================= */

    const menuBtn = document.getElementById("menuBtn");
    const mainNav = document.getElementById("mainNav");


    if (menuBtn && mainNav) {

        menuBtn.addEventListener("click", function () {

            mainNav.classList.toggle("show");

        });


        /* Close menu after clicking a link */

        const navLinks =
            mainNav.querySelectorAll("a");


        navLinks.forEach(function (link) {

            link.addEventListener("click", function () {

                mainNav.classList.remove("show");

            });

        });

    }


    /* ================= CURRENT YEAR ================= */

    const year =
        document.getElementById("year");


    if (year) {

        year.textContent =
            new Date().getFullYear();

    }


    /* ================= BUTTON CLICK EFFECT ================= */

    const buttons =
        document.querySelectorAll(".btn");


    buttons.forEach(function (button) {

        button.addEventListener("click", function () {

            button.style.transform =
                "scale(0.97)";


            setTimeout(function () {

                button.style.transform =
                    "";

            }, 120);

        });

    });


    /* ================= CONTACT FORM ================= */

    const contactForm =
        document.getElementById("contactForm");


    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const name =
                    document.getElementById("name").value;

                const email =
                    document.getElementById("email").value;

                const project =
                    document.getElementById("project").value;

                const message =
                    document.getElementById("message").value;


                const subject =
                    encodeURIComponent(
                        "New Website Project - " + project
                    );


                const body =
                    encodeURIComponent(
                        "Hello Muhammad Asim Web Agency,\n\n" +

                        "Name: " + name + "\n" +

                        "Email: " + email + "\n" +

                        "Project: " + project + "\n\n" +

                        "Project Details:\n" +

                        message + "\n\n" +

                        "Sent from the agency website."
                    );


                window.location.href =
                    "mailto:sanjarkhanabbasi786@gmail.com" +
                    "?subject=" +
                    subject +
                    "&body=" +
                    body;

            }
        );

    }


    /* ================= WHATSAPP EFFECT ================= */

    const whatsappButton =
        document.querySelector(".whatsapp-btn");


    if (whatsappButton) {

        setInterval(function () {

            whatsappButton.style.transform =
                "scale(1.03)";


            setTimeout(function () {

                whatsappButton.style.transform =
                    "";

            }, 200);

        }, 4000);

    }

});
