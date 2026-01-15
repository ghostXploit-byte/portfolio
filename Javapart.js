 document.addEventListener("DOMContentLoaded", () => {

    // =========================
    // CONTACT FORM
    // =========================
    const form = document.getElementById("contactForm");
    const status = document.getElementById("status");

    if (form) {
        form.addEventListener("submit", async function (e) {
            e.preventDefault();

            const data = {
                name: document.getElementById("name").value,
                email: document.getElementById("email").value,
                message: document.getElementById("message").value
            };

            try {
                const res = await fetch("/contact", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data)
                });

                const result = await res.json();
                status.innerText = result.message;
                form.reset();
            } catch (err) {
                status.innerText = "Server error!";
            }
        });
    }


