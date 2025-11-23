# frontend/app.py
from flask import Flask, render_template, request, redirect, url_for, flash
import requests
import os
from flask import Flask, render_template, request, redirect, url_for, flash
import os, requests

app = Flask(__name__)
app.secret_key = os.environ.get('FLASK_SECRET', 'dev_secret')

BACKEND_BASE = os.environ.get('BACKEND_BASE', 'http://localhost:4000/api')

def fetch_json(url, params=None, timeout=5):
    try:
        r = requests.get(url, params=params, timeout=timeout)
        if r.status_code == 200:
            return r.json()
    except Exception as e:
        print("fetch_json error:", e)
    return {}

@app.route('/movie/<movie_id>')
def movie_detail(movie_id):
    movie = fetch_json(f"{BACKEND_BASE}/movies/{movie_id}")
    if not movie:
        flash("Película no encontrada", "danger")
        return redirect(url_for("index"))

    reviews = fetch_json(f"{BACKEND_BASE}/reviews/{movie_id}")

    return render_template("movie.html", movie=movie, reviews=reviews)

# IMPORTANTE: esta ruta ya existe en tu index
@app.route('/')
def index():
    hero = fetch_json(f"{BACKEND_BASE}/movies", {'random': 'true', 'limit': 5})
    return render_template("index.html", hero=hero)

if __name__ == '__main__':
    app.run(debug=True, port=5000)

@app.route('/register', methods=['GET'])
def register_page():
    return render_template('register.html')

@app.route('/login', methods=['GET'])
def login_page():
    return render_template('login.html')

@app.route('/perfil')
def profile_page():
    return render_template('profile.html')

@app.route('/mi-lista')
def my_list_page():
    return render_template('watchlist.html')

@app.route('/buscar')
def search_page():
    q = request.args.get('q', '')
    return render_template('search.html', q=q)

@app.route('/explorar')
def explorar_page():
    return render_template('explorar.html')
