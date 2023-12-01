from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS  

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:3110@localhost/database project'
db = SQLAlchemy(app)
CORS(app)

favorites_association = db.Table(
    'favorites_association',
    db.Column('game_id', db.Integer, db.ForeignKey('game.gameid')),
    db.Column('user_id', db.Integer, db.ForeignKey('user.userid'))
)

class Game(db.Model):
    gameid = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), nullable=False)
    developer = db.Column(db.String(50), nullable=False)
    genre = db.Column(db.String(20), nullable=False)

    # Updated reviews and favorites relationships
    reviews = db.relationship('Review', back_populates='game', lazy=True)

    # Many-to-many relationship with favorites
    favorites = db.relationship('User', secondary=favorites_association, back_populates='favorite_games')


class User(db.Model):
    userid = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), nullable=False, unique=True)
    email = db.Column(db.String(120), nullable=False, unique=True)
    password = db.Column(db.String(60), nullable=False)

    # Updated reviews and favorites relationships
    reviews = db.relationship('Review', back_populates='user', lazy=True)

    # Many-to-many relationship with favorites
    favorite_games = db.relationship('Game', secondary=favorites_association, back_populates='favorites')

class Review(db.Model):
    reviewid = db.Column(db.Integer, primary_key=True)
    comments = db.Column(db.Text)
    rating = db.Column(db.Integer, nullable=False)  # Added rating field

    gameid = db.Column(db.Integer, db.ForeignKey('game.gameid'), nullable=False)
    userid = db.Column(db.Integer, db.ForeignKey('user.userid'), nullable=False)

    # Updated game and user relationships
    game = db.relationship('Game', back_populates='reviews')
    user = db.relationship('User', back_populates='reviews')

class Favorites(db.Model):
    favoriteid = db.Column(db.Integer, primary_key=True)
    gameid = db.Column(db.Integer, db.ForeignKey('game.gameid'), nullable=False)
    userid = db.Column(db.Integer, db.ForeignKey('user.userid'), nullable=False)

# Endpoint for Creating Games
@app.route('/games', methods=['POST'])
def create_game():
    try:
        data = request.get_json()
        new_game = Game(
            title=data['title'],
            developer=data['developer'],
            genre=data['genre']
        )
        db.session.add(new_game)
        db.session.commit()
        return jsonify({'message': 'Game created successfully'}), 201
    except Exception as e:
        print(f"Error creating game: {e}")
        return jsonify({'error': 'Internal Server Error'}), 500   

# Endpoint for Deleting Games
@app.route('/games/<int:game_id>', methods=['DELETE'])
def delete_game(game_id):
    game = Game.query.get(game_id)
    if game:
        db.session.delete(game)
        db.session.commit()
        return jsonify({'message': 'Game deleted successfully'})
    else:
        return jsonify({'message': 'Game not found'}), 404

# Endpoint for Getting All Games
@app.route('/games', methods=['GET'])
def get_all_games():
    try:
        games = Game.query.all()
        if not games:
            return jsonify({'games': []})

        game_list = []
        for game in games:
            game_list.append({
                'gameid': game.gameid,
                'title': game.title,
                'developer': game.developer,
                'genre': game.genre
            })
        return jsonify({'games': game_list})
    except Exception as e:
        print(f"Error fetching games: {e}")
        return jsonify({'error': 'Internal Server Error'}), 500

# Endpoint for Getting Games by ID
@app.route('/games/<int:game_id>', methods=['GET'])
def get_game_by_id(game_id):
    game = Game.query.get(game_id)
    if game:
        return jsonify({
            'gameid': game.gameid,
            'title': game.title,
            'developer': game.developer,
            'genre': game.genre
        })
    else:
        return jsonify({'message': 'Game not found'}), 404

@app.route('/users', methods=['POST'])
def create_user():
    try:
        data = request.get_json()
        new_user = User(username=data['username'], email=data['email'], password=data['password'])
        db.session.add(new_user)
        db.session.commit()
        print(f"User created: {new_user.username}")
        return jsonify({'message': 'User created successfully'}), 201
    except Exception as e:
        print(f"Error creating user: {e}")
        return jsonify({'error': 'Internal Server Error'}), 500


# Endpoint for Getting Users by ID
@app.route('/users/<int:user_id>', methods=['GET'])
def get_user_by_id(user_id):
    user = User.query.get(user_id)
    if user:
        return jsonify({'id': user.userid, 'username': user.username, 'email': user.email})
    else:
        return jsonify({'message': 'User not found'}), 404
    
# Endpoint for Getting All Users
@app.route('/users', methods=['GET'])
def get_all_users():
    users = User.query.all()
    user_list = [{'id': user.userid, 'username': user.username, 'email': user.email} for user in users]
    return jsonify({'users': user_list})

# Endpoint for Creating Reviews
@app.route('/reviews', methods=['POST'])
def create_review():
    data = request.get_json()
    new_review = Review(
        rating=data['rating'],
        comments=data['comments'],
        game_id=data['game_id'],
        user_id=data['user_id']
    )
    db.session.add(new_review)
    db.session.commit()
    return jsonify({'message': 'Review created successfully'}), 201

# Endpoint for Getting All Reviews
@app.route('/reviews', methods=['GET'])
def get_all_reviews():
    reviews = Review.query.all()
    review_list = [{'id': review.reviewid, 'rating': review.rating, 'comments': review.comments,
                    'game_id': review.game_id, 'user_id': review.user_id} for review in reviews]
    return jsonify({'reviews': review_list})

# Endpoint for Adding to Favorites
@app.route('/favorites', methods=['POST'])
def add_to_favorites():
    data = request.get_json()
    new_favorite = Favorites(game_id=data['game_id'], user_id=data['user_id'])
    db.session.add(new_favorite)
    db.session.commit()
    return jsonify({'message': 'Game added to favorites successfully'}), 201

# Endpoint for Getting All Favorites
@app.route('/favorites', methods=['GET'])
def get_all_favorites():
    favorites = Favorites.query.all()
    favorites_list = [{'id': favorite.favoriteid, 'game_id': favorite.game_id, 'user_id': favorite.user_id} for favorite in favorites]
    return jsonify({'favorites': favorites_list})

# Endpoint for Deleting Reviews by ID
@app.route('/reviews/<int:review_id>', methods=['DELETE'])
def delete_review(review_id):
    review = Review.query.get(review_id)
    if review:
        db.session.delete(review)
        db.session.commit()
        return

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)