from flask import Flask, request, jsonify, send_from_directory
import sqlite3
import os

app = Flask(__name__)

def init_db():
    conn = sqlite3.connect("messages.db")
    c = conn.cursor()
    c.execute("""
        CREATE TABLE IF NOT EXISTS messages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            email TEXT,
            message TEXT
        )
    """)
    conn.commit()
    conn.close()

init_db()

@app.route("/")
def home():
    return send_from_directory(".", "index.html")

@app.route("/<path:file>")
def static_files(file):
    return send_from_directory(".", file)

@app.route("/contact", methods=["POST"])
def contact():
    data = request.json
    conn = sqlite3.connect("messages.db")
    c = conn.cursor()
    c.execute(
        "INSERT INTO messages (name, email, message) VALUES (?, ?, ?)",
        (data["name"], data["email"], data["message"])
    )
    conn.commit()
    conn.close()
    return jsonify({"message": "Message sent successfully!"})

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
