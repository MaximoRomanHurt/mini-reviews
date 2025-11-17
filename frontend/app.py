
from flask import Flask, render_template, request, redirect
import requests

app = Flask(__name__)
API = "http://localhost:4000/api/reviews"

movies = [
    {"id": "1", "title": "Inception"},
    {"id": "2", "title": "Interstellar"},
    {"id": "3", "title": "Matrix"},
]

@app.route("/")
def index():
    return render_template("index.html", movies=movies)

@app.route("/movie/<id>")
def movie(id):
    res = requests.get(f"{API}/{id}").json()
    movie = next(m for m in movies if m["id"] == id)
    return render_template("movie.html", movie=movie, reviews=res)

@app.route("/add/<id>", methods=["POST"])
def add(id):
    movie = next(m for m in movies if m["id"] == id)
    data = {
        "movieId": id,
        "movieTitle": movie["title"],
        "username": request.form["username"],
        "text": request.form["text"],
        "rating": int(request.form["rating"])
    }
    requests.post(API, json=data)
    return redirect(f"/movie/{id}")

if __name__ == "__main__":
    app.run(port=5000, debug=True)
