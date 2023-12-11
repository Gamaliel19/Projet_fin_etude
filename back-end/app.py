import os
from flask import Flask,request,abort,jsonify,session
from flask_bcrypt import Bcrypt
from flask_cors import CORS, cross_origin
from flask_session import Session
from flask_login import UserMixin, LoginManager, login_required, logout_user, current_user, login_user
from config import ApplicationConfig
from models import db, User, Product

basedir = os.path.abspath(os.path.dirname(__file__))
app= Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] =\
        'sqlite:///' + os.path.join(basedir, 'data.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config.from_object(ApplicationConfig)

bcrypt=Bcrypt(app)
CORS(app, supports_credentials=True)
server_session = Session(app)
db.init_app(app)
login_manager = LoginManager()
login_manager.init_app(app)
with app.app_context():
    db.create_all()


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))
@app.route('/loginUser', methods=['POST'])
def adminLogin():
    email = request.json["email"]
    password=request.json["password"]
    user = User.query.filter_by(email=email).first()
    if user:
        if bcrypt.check_password_hash(user.password, password):
            
            login_user(user)
    
            return 'vous etes connecte'
        return ({"message":"mot de passe incorrect, reessayez"}),401
    return ({"message":"ce utilisateur n\'existe pas, reessaye"}),401

@app.route('/logout', methods=['POST'])
@login_required
def logout():
    logout_user()
    return redirect(url_for('adminLogin'))

@app.route('/home')
@login_required
def adminPage():
    return 'l\'utilisateur actuel est' + current_user.nom

@app.route("/registerUser", methods=["POST"])
def register_user():
    email = request.json['email']
    nom = request.json['nom']
    prenom = request.json['prenom']
    profil = request.json['profil']
    password = request.json['password']

    user_exists=User.query.filter_by(email=email).first() is not None
    admin_exist=User.query.filter_by(profil='admin').first() is not None

    if user_exists:
        return ({"error":"Cet utilisateur existe déjà!"}),409

    """if confirmPassword != password:
        return ({"error":"Veuillez entrer le mot de passe précedant!"}),409"""
    
    hashed_password = bcrypt.generate_password_hash(password)
    new_user = User(email=email, nom=nom, prenom=prenom, profil=profil, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({
     "Message": "Utilisateur créé avec succès!"
    })
"""
@app.route('/loginUser', methods=["POST"])
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
"""


#Liste test
@app.route('/liste')
def liste():
    data = ['élément 1', 'élément 2', 'élément 3']
    return jsonify(data)



#liste des utilisateurs
@app.route('/listUser', methods=["GET"])
def list():
    users = User.query.all()
    liste=[]
    for user in users:
        data={}
        data['email'] = user.email
        data['nom'] = user.nom
        data['prenom'] = user.prenom
        data['password'] = user.password.decode('utf-8')
        data['profil'] = user.profil
        liste.append(data)
    return jsonify({'utilisateur':liste})

#obtenir un seul tilisateur
@app.route('/listSingleUser', methods= ['GET'])
def singleUser(self,id):
    user = User.query.filter_by(id=id).first()
    if user:
        return user.json()
    return {'message': 'utilisateur non trouve'}
#supprimer un utilisateur 
@app.route('/deleteUser/<string:id>', methods=['DELETE'])
def delete_user(self,id):
    user = User.query.filter_by(id=id).first()
    if user:
        db.session.delete(user)
        db.session.commit()
        return {'message': 'utilisateur supprime avec succes'}
    else:
        return {'message': 'utilisateur non trouve'}


#mettre a jour un utilisateur
@app.route('/updateUser/<string:id>', methods=['PUT'])
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

@app.route('/updatePasswordUser/<string:id>', methods=['PUT'])
def update_password(self,id):
    password=request.json["password"]
    newPassword= request.json["newPassword"]
    confirmNewPassword= request.json['confirmNewPassword']

    user = User.query.filter_by(password=password).first()
    users = User.query.all()
    for user in users:
        data={}
        data['email']
        data['nom'] = user.nom
        data['prenom'] = user.prenom
        data['password'] = user.password
        data['profil'] = user.profil
    if password != password:
        return jsonify({"error":"Veuillez entrer le mot de passe précedant!"}),409
        
    hashed_password = bcrypt.generate_password_hash(newPassword)
    new_user = User(email=data['email'], nom=data['nom'], prenom=data['prenom'], profil=data['profil'], password=hashed_password,)
    db.session.add(new_user)
    db.session.commit()

    
    return jsonify({'message': 'mot de passe modifie avec succes'})

@app.route('/registerProduct', methods=["POST"])
def register_product():
    data = request.get_json()
    new_product = Product(dosage=data['dosage'], nom_com=data['nom_com'], description=data['description'], prix=data['prix'], date_fab=data['date_fab'], date_per=data['date_per'], qte_stock=data['qte_stock'], num_lot=data['num_lot'])
    db.session.add(new_product)
    db.session.commit()
    db.session.flush()
    return new_product.json(),201


@app.route('/deleteProduct', methods=['DELETE'])
def delete_product(self,id):
    product = Product.query.filter_by(id=id).first()
    if product:
        db.session.delete(product)
        db.session.commit()
        return ({'message': 'produit supprime avec succes'})
    else:
        return jsonify({'message': 'produit non trouve'})

@app.route('/updateProduct/<string:id>', methods = ['PUT'])
def update_product(self,id):
    data = request.get_json()
    product = Product.query.get(id)
    if data['dosage']:
        product.dosage = data['dosage']
    if data['nom_com']:
        product.nom_com = data['nom_com']
    if data['description']:
        product.description = data['description']
    if data['prix']:
        product.prix = data['prix']
    if data['date_fab']:
        product.date_fab = data['date_fab']
    if data['date_per']:
        product.date_per = data['date_per']
    if data['qte_stock']:
        product.qte_stock = data['qte_stock']
    if data['num_lot']:
        product.lot = data['num_lot']
    db.session.add(product)
    db.session.commit()
    return jsonify ({'message':'produit mis a jour avec succes'})


@app.route('/listProduct', methods = ['GET'])
def list_product():

    products = Product.query.all()
    liste=[]
    for product in products:
        data={}
        data['dosage'] = product.dosage
        data['nom_com'] = product.nom_com
        data['description'] = product.description
        data['prix'] = product.prix
        data['date_fab'] = product.date_fab
        data['date_per'] = product.date_per
        data['qte_stock'] = product.qte_stock
        data['num_lot'] = product.num_lot

        liste.append(data)
    return jsonify({'liste des produits':liste})
if __name__=="__main__":
    app.run(debug=True)
