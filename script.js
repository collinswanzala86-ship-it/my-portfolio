
document.addEventListener("DOMContentLoaded", function () {

    // =====================================
    // 1. PROJECT FILTERING
    // =====================================

    const filterButtons = document.querySelectorAll(".chip");
    const projects = document.querySelectorAll(".project");

    filterButtons.forEach(button => {

        button.addEventListener("click", function () {

            // Remove active class from all buttons
            filterButtons.forEach(btn => {
                btn.classList.remove("active");
            });

            // Activate selected button
            this.classList.add("active");

            const selectedFilter = this.dataset.filter;

            // Show or hide projects
            projects.forEach(project => {

                const projectType = project.dataset.type;

                if (
                    selectedFilter === "all" ||
                    selectedFilter === projectType
                ) {
                    project.style.display = "flex";

                    project.animate(
                        [
                            { opacity: 0, transform: "translateY(15px)" },
                            { opacity: 1, transform: "translateY(0)" }
                        ],
                        {
                            duration: 400,
                            easing: "ease-out"
                        }
                    );

                } else {
                    project.style.display = "none";
                }

            });

        });

    });


    // =====================================
    // 2. SMOOTH NAVIGATION
    // =====================================

    const navigationLinks = document.querySelectorAll('nav a[href^="#"]');

    navigationLinks.forEach(link => {

        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");
            const targetSection = document.querySelector(targetId);

            if (targetSection) {

                event.preventDefault();

                targetSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });


    // =====================================
    // 3. CONTACT FORM
    // =====================================

    const contactForm = document.getElementById("contact-form");
    const formStatus = document.getElementById("form-status");

    if (contactForm) {

        contactForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const name = contactForm.elements["name"].value.trim();
            const email = contactForm.elements["email"].value.trim();
            const message = contactForm.elements["message"].value.trim();

            // Check empty fields
            if (!name || !email || !message) {

                formStatus.textContent = "Please fill in all fields.";
                formStatus.style.color = "red";

                return;
            }

            // Validate email
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailPattern.test(email)) {

                formStatus.textContent = "Please enter a valid email address.";
                formStatus.style.color = "red";

                return;
            }

            // Prepare email content
            const subject = encodeURIComponent(
                "Portfolio Contact Message from " + name
            );

            const body = encodeURIComponent(
                "Name: " + name + "\n" +
                "Email: " + email + "\n\n" +
                "Message:\n" + message
            );

            // Open user's email application
            const mailtoLink =
                "mailto:collinswanzala86@gmail.com" +
                "?subject=" + subject +
                "&body=" + body;

            formStatus.textContent =
                "Opening your email application...";

            formStatus.style.color = "green";

            window.location.href = mailtoLink;

        });

    }


    // =====================================
    // 4. SCROLL REVEAL ANIMATIONS
    // =====================================

    const sections = document.querySelectorAll("main section");

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            (entries, observerInstance) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observerInstance.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12
            }
        );

        sections.forEach(section => {
            observer.observe(section);
        });

    } else {

        sections.forEach(section => {
            section.classList.add("visible");
        });

    }


    // =====================================
    // 5. CURRENT YEAR IN FOOTER
    // =====================================

    const footer = document.querySelector("footer p");

    if (footer) {

        footer.innerHTML =
            "&copy; " + new Date().getFullYear() +
            " Wanzala Collins. All rights reserved.";

    }


    // =====================================
    // 6. PROFILE PICTURE INTERACTION
    // =====================================

    const profilePicture =
        document.querySelector(".profile-picture");

    if (profilePicture) {

        profilePicture.addEventListener("error", function () {

            console.warn("Profile picture could not be loaded.");

        });

    }


    // =====================================
    // 7. PROJECT CARD INTERACTIONS
    // =====================================

    projects.forEach(project => {

        project.addEventListener("mouseenter", function () {
            this.classList.add("project-hover");
        });

        project.addEventListener("mouseleave", function () {
            this.classList.remove("project-hover");
        });

    });


    console.log("Wanzala Collins Portfolio Loaded Successfully!");

});
