from flask import Flask, render_template, send_from_directory
from flask_cors import CORS
import os

app = Flask(__name__, static_folder="static", template_folder="templates")
CORS(app)

# Ruta principal (HOME)
@app.route("/")
def index():
    return render_template("index.html")

# Detalle de libro
@app.route("/detalle-libro/<id>")
def detalle_libro(id):
    return render_template("detalle-libro.html")

# Carrito
@app.route("/carrito")
def carrito():
    return render_template("carrito.html")

# Servir archivos estáticos (JS, CSS, imágenes)
@app.route("/static/<path:path>")
def send_static(path):
    return send_from_directory("static", path)

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    print(f"Frontend corriendo en http://127.0.0.1:{port}")
    app.run(debug=True, port=port)
