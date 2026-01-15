document.getElementById("contactForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const status = document.getElementById("status");

  const data = {
    name: this.name.value,
    email: this.email.value,
    message: this.message.value
  };

  try {
    const response = await fetch("https://second-backend-kyag.onrender.com/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Server error");
    }

    status.innerText = "✅ " + result.message;
    this.reset();

  } catch (error) {
    status.innerText = "❌ Failed to send message";
    console.error(error);
  }
});
