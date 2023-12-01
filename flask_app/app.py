from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS  

app = Flask(__name__)
# app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://boxi:3110@localhost:5432/database project'
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:100901huds@localhost/database project'
db = SQLAlchemy(app)
CORS(app)

favorites_association = db.Table(
    'favorites_association',
    db.Column('game_id', db.Integer, db.ForeignKey('game.id')),
    db.Column('user_id', db.Integer, db.ForeignKey('user.id'))
)

class Game(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), nullable=False)
    developer = db.Column(db.String(50), nullable=False)
    release_date = db.Column(db.Date, nullable=False)
    genre = db.Column(db.String(20), nullable=False)
    platform = db.Column(db.String(20), nullable=False)

    # Updated reviews and favorites relationships
    reviews = db.relationship('Review', back_populates='game', lazy=True)

    # Many-to-many relationship with favorites
    favorites = db.relationship('User', secondary=favorites_association, back_populates='favorite_games')


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), nullable=False, unique=True)
    email = db.Column(db.String(120), nullable=False, unique=True)
    password = db.Column(db.String(60), nullable=False)

  # Updated reviews and favorites relationships
    reviews = db.relationship('Review', back_populates='user', lazy=True)

    # Many-to-many relationship with favorites
    favorite_games = db.relationship('Game', secondary=favorites_association, back_populates='favorites')

class Review(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Integer, nullable=False)
    comments = db.Column(db.Text)

    game_id = db.Column(db.Integer, db.ForeignKey('game.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    # Updated game and user relationships
    game = db.relationship('Game', back_populates='reviews')
    user = db.relationship('User', back_populates='reviews')

class Favorites(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    game_id = db.Column(db.Integer, db.ForeignKey('game.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

@app.route('/games', methods=['POST'])
def create_game():
    try:
        # Get JSON data from the request
        data = request.get_json()

        # Create a new game object
        new_game = Game(
            title=data['title'],
            developer=data['developer'],
            release_date=data['release_date'],
            genre=data['genre'],
            platform=data['platform']
        )

        # Add the new game to the database
        db.session.add(new_game)
        db.session.commit()

        return jsonify({'message': 'Game created successfully'}), 201
    except Exception as e:
        # Log the error for debugging purposes
        print(f"Error creating game: {e}")
        return jsonify({'error': 'Internal Server Error'}), 500   

# Delete a game by ID
@app.route('/games/<int:game_id>', methods=['DELETE'])
def delete_game(game_id):
    game = Game.query.get(game_id)
    if game:
        db.session.delete(game)
        db.session.commit()
        return jsonify({'message': 'Game deleted successfully'})
    else:
        return jsonify({'message': 'Game not found'}), 404

# API endpoint to get all games
@app.route('/games', methods=['GET'])
def get_all_games():
    try:
        games = Game.query.all()

        if not games:
            # If no games found, return an empty array or a custom message
            return jsonify({'games': []})

        game_list = []
        for game in games:
            game_list.append({
                'id': game.id,
                'title': game.title,
                'developer': game.developer,
                'release_date': game.release_date,
                'genre': game.genre,
                'platform': game.platform
            })
        return jsonify({'games': game_list})
    except Exception as e:
        # Log the error for debugging purposes
        print(f"Error fetching games: {e}")
        return jsonify({'error': 'Internal Server Error'}), 500


# API endpoint to get a specific game by ID
@app.route('/games/<int:game_id>', methods=['GET'])
def get_game_by_id(game_id):
    game = Game.query.get(game_id)
    if game:
        return jsonify({
            'id': game.id,
            'title': game.title,
            'developer': game.developer,
            'release_date': game.release_date,
            'genre': game.genre,
            'platform': game.platform
        })
    else:
        return jsonify({'message': 'Game not found'}), 404

#crude operation for second table users
# API endpoint to create a new user
@app.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()
    new_user = User(username=data['username'], email=data['email'], password=data['password'])
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'User created successfully'}), 201

# API endpoint to get all users
@app.route('/users', methods=['GET'])
def get_all_users():
    users = User.query.all()
    user_list = [{'id': user.id, 'username': user.username, 'email': user.email} for user in users]
    return jsonify({'users': user_list})

# API endpoint to get a specific user by ID
@app.route('/users/<int:user_id>', methods=['GET'])
def get_user_by_id(user_id):
    user = User.query.get(user_id)
    if user:
        return jsonify({'id': user.id, 'username': user.username, 'email': user.email})
    else:
        return jsonify({'message': 'User not found'}), 404
    
# Crude operation for table review
# API endpoint to create a new review
@app.route('/reviews', methods=['POST'])
def create_review():
    # print("reached: get all games")
    data = request.get_json()
    new_review = Review(rating=data['rating'], comments=data['comments'], game_id=data['game_id'], user_id=data['user_id'])
    db.session.add(new_review)
    db.session.commit()
    return jsonify({'message': 'Review created successfully'}), 201

# API endpoint to get all reviews
@app.route('/reviews', methods=['GET'])
def get_all_reviews():
    reviews = Review.query.all()
    review_list = [{'id': review.id, 'rating': review.rating, 'comments': review.comments,
                    'game_id': review.game_id, 'user_id': review.user_id} for review in reviews]
    return jsonify({'reviews': review_list})

#crude operation for table favorite
# API endpoint to add a game to favorites
@app.route('/favorites', methods=['POST'])
def add_to_favorites():
    data = request.get_json()
    new_favorite = Favorites(game_id=data['game_id'], user_id=data['user_id'])
    db.session.add(new_favorite)
    db.session.commit()
    return jsonify({'message': 'Game added to favorites successfully'}), 201

# API endpoint to get all favorites
@app.route('/favorites', methods=['GET'])
def get_all_favorites():
    favorites = Favorites.query.all()
    favorites_list = [{'id': favorite.id, 'game_id': favorite.game_id, 'user_id': favorite.user_id} for favorite in favorites]
    return jsonify({'favorites': favorites_list})

# Delete a review by ID
@app.route('/reviews/<int:review_id>', methods=['DELETE'])
def delete_review(review_id):
    review = Review.query.get(review_id)
    if review:
        db.session.delete(review)
        db.session.commit()
        return jsonify({'message': 'Review deleted successfully'})
    else:
        return jsonify({'message': 'Review not found'}), 404
    
# Delete a favorite by ID
@app.route('/favorites/<int:favorite_id>', methods=['DELETE'])
def delete_favorite(favorite_id):
    favorite = Favorites.query.get(favorite_id)
    if favorite:
        db.session.delete(favorite)
        db.session.commit()
        return jsonify({'message': 'Favorite deleted successfully'})
    else:
        return jsonify({'message': 'Favorite not found'}), 404
    
# Delete a user by ID
@app.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    user = User.query.get(user_id)
    if user:
        db.session.delete(user)
        db.session.commit()
        return jsonify({'message': 'User deleted successfully'})
    else:
        return jsonify({'message': 'User not found'}), 404



if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)