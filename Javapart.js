document.getElementById("contactForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
        document.getElementById("status").innerText = "All fields are required!";
        return;
    }

    const data = { name, email, message };
    console.log("Sending:", data);

    const res = await fetch("https://portfolio-backend-xc96.onrender.com/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    const result = await res.json();
    document.getElementById("status").innerText = result.message;

    this.reset();
});
