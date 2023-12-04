import os
from flask import Flask,request,abort,jsonify,session
from flask_bcrypt import Bcrypt
from flask_cors import CORS, cross_origin
from flask_session import Session
from models import db, User

basedir = os.path.abspath(os.path.dirname(__file__))
app= Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] =\
        'sqlite:///' + os.path.join(basedir, 'data.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

bcrypt=Bcrypt(app)
CORS(app, supports_credentials=True)
server_session = Session(app)
db.init_app(app)

with app.app_context():
    db.create_all()




@app.route("/register", methods=["POST"])
def register_user():
    email = request.json['email']
    password = request.json["password"]
    confirmPassword = request.json["confirmPassword"]

    user_exists=User.query.filter_by(email=email).first() is not None

    if user_exists:
        return jsonify({"error":"Cet utilisateur existe déjà!"}),409
    if confirmPassword != password:
        return jsonify({"error":"Veuillez entrer le mot de passe précedant!"}),409
    
    hashed_password = bcrypt.generate_password_hash(password)
    new_user = User(email=email,password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({
     "Message": "Utilisateur créé avec succès!"
    })

#liste des utilisateurs
@app.route('/list', methods=["GET"])
def list(self):
    users = User.query.all()
    liste=[]
    for user in users:
        data={}
        data['id'] = user.id
        data['nom'] = user.nom
        data['prenom'] = user.prenom
        data['password'] = user.password
        data['profil'] = user.profil
        liste.append(data)
    return jsonify({'utilisateur':liste})

#obtenir un seul tilisateur
@app.route('/singleUser', methods= ['GET'])
def singleUser(self,id):
    user = User.query.filter_by(id=id).first()
    if user:
        return user.json()
    return {'message': 'utilisateur non trouve'}
#supprimer un utilisateur 
@app.route('/delete_user/<string:id>', methods=['DELETE'])
def delete_user(self,id):
    user = User.query.filter_by(id=id).first()
    if user:
        db.session.delete(user)
        db.session.commit()
        return {'message': 'utilisateur supprime avec succes'}
    else:
        return {'message': 'utilisateur non trouve'}


#mettre a jour un utilisateur
@app.route('/update_user/<string:id>', methods=['PUT'])
def update_user(self,id):
    data = request.get_json()
    user  = User.query.get(id)
    if data['nom']:
        user.nom = data['nom']
    if data['prenom']:
        user.prenom = data['prenom']
    if data['email']:
        user.email = data['email']
    if data['profil']:
        user.profil = data['profil']
    db.session.add(user)
    db.session.commit()
    return jsonify({'message': 'utilisateur mis a jour avec succes avec succes', 'utilisateur':{'id':utilisateur.id, 'nom':utilisateur.nom, 'prenom':utilisateur.prenom} })

@app.route('/update_password', methods=['PUT'])
def update_password(self,id):
    data = request.get_json()
    user = User.query.get(id)
    if data['password']:
        password = request.json["password"]
        if password != hashed_password:
            return jsonify({'message': 'veuillez entrer votre mot de passe precedent'})
    return jsonify({'message': 'mot de passe modifie avec succes'})
        

@app.route('/login', methods=["POST"])
def login_user():
    email= request.json["email"]
    password=request.json["password"]

    user = User.query.filter_by(email=email).first()

    if user is None:
        return jsonify({"error": "Echec de connexion! Cet utilisateur n\'existe pas."}), 401
    
    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error":  "Echec de connexion! Votre mot de passe est incorrect"}), 401
    

    return jsonify({
        "Message":"Connexion réussie!"
    })

@app.route('/')
def hello():
    return "hello"


if __name__=="__main__":
    app.run(debug=True)