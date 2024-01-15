import os
from flask import Flask,request,abort,jsonify,session,make_response
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_cors import CORS, cross_origin
from flask_session import Session
from flask_login import UserMixin, LoginManager, login_required, logout_user, current_user, login_user
from config import ApplicationConfig
from models import db, User, Product,Vente, Categorie
from datetime import datetime
from datetime import date
from json_tricks import dumps, loads
import re
import jwt
from functools import wraps
from flask_jwt_extended import JWTManager, create_access_token, jwt_required
from datetime import timedelta



basedir = os.path.abspath(os.path.dirname(__file__))
app= Flask(__name__)


app.config["SECRET_KEY"] = "secret_key1234"
app.config['SESSION_TYPE'] = 'filesystem'
app.config['SQLALCHEMY_DATABASE_URI'] ='mysql://root:''@localhost/flaskdb'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
jwt = JWTManager(app)
#app.config.from_object(ApplicationConfig)

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
def userLogin():
    email = request.json["email"]
    password=request.json["password"]
    user = User.query.filter_by(email=email).first() 
    if user:
        if bcrypt.check_password_hash(user.password, password):
            
            login_user(user)
            access_token = create_access_token(identity = user.id,expires_delta=timedelta(hours=1))
    
            return jsonify({'token' : access_token, 'userId': user.id, 'userNom':user.nom + ' ' + user.prenom, 'userProfil':user.profil}),200
        return ({"error":"Le mot de passe est incorrect! Renseigner bien le champ puis réessayer!"}),400
    return ({"error":"ce utilisateur n'existe pas! Bien vouloir contacter l'administrateur pour créer un compte."}),401

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
    #admin_exist=User.query.filter_by(profil='admin').first() is not None
    regex_email = r'[a-z-z0-9._%+-]+@[A-Za-z0-9-]+\.[A-Z|a-z]{2,}'
    expression_compile=re.compile(regex_email)
    if not re.match(expression_compile, email):
        return ({"error":"L'email incorrect. Veuillez entrer le format valide!"}),413
    if user_exists:
        return ({"error":"Cet utilisateur existe déjà!"}),408
    if len(password)<8:
        return ({"error":"Le mot de passe est trop court. Veuillez entrer au moins 8 caractères!"}),409
    elif not re.search("[0-9]",password):
        return ({"error":"Le mot de passe doit contenir au moins un chiffre!"}),410
    elif not re.search("[@#¦¬|¢´~}{)(:;.*-/+ %&ç$£äö><°§ ]",password):
        return ({"error":"Le mot de passe doit contenir au moins un caractère spécial!"}),411
    elif not re.search("[A-Z]",password):
        return ({"error":"Le mot de passe doit contenir au moins une lettre majuscule!"}),412
    

    hashed_password = bcrypt.generate_password_hash(password)
    new_user = User(email=email, nom=nom, prenom=prenom, profil=profil, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({
     "Message": "Utilisateur créé avec succès!"
    })

#liste des utilisateurs
@app.route('/listUser', methods=["GET"])
def list():
    users = User.query.all()
    liste=[]
    for user in users:
        data={}
        data['id']=user.id
        data['email'] = user.email
        data['nom'] = user.nom
        data['prenom'] = user.prenom
        data['profil'] = user.profil
        liste.append(data)
    return jsonify(liste)

#obtenir un seul tilisateur
@app.route('/listSingleUser/<string:id>', methods= ['GET'])
def singleUser(id):
    user = User.query.filter_by(id=id).first()
    if user:
        return user.json()
    return {'message': 'utilisateur non trouve'}
#supprimer un utilisateur 
@app.route('/deleteUser/<string:id>', methods=['DELETE'])
def delete_user(id):
    user = User.query.filter_by(id=id).first()
    if user:
        db.session.delete(user)
        db.session.commit()
        return {'message': 'utilisateur supprime avec succes'}
    else:
        return {'message': 'utilisateur non trouve'}

#mettre a jour un utilisateur
@app.route('/updateUser/<string:id>', methods=['PUT'])
def update_user(id):
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
    return jsonify({'message': 'utilisateur mis a jour avec succes avec succes'})

@app.route('/updatePasswordUser/<string:id>', methods=['PUT'])
def update_password(id):
    password=request.json["password"]
    newPassword= request.json["newPassword"]
    confirmNewPassword= request.json['confirmNewPassword']

    user = User.query.filter_by(password=password).first()
    users = User.query.all()
    for user in users:
        data={}
        data['email']=user.email
        data['nom'] = user.nom
        data['prenom'] = user.prenom
        data['password'] = user.password
        data['profil'] = user.profil
    if password != password:
        return jsonify({"error":"Veuillez entrer le mot de passe précedant!"}),409
        
    hashed_password = bcrypt.generate_password_hash(newPassword)
    new_user = User(email=data['email'], nom=data['nom'], prenom=data['prenom'], profil=data['profil'], password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    
    return jsonify({'message': 'mot de passe modifie avec succes'})

@app.route('/registerProduct', methods=["POST"])
def register_product():
    data = request.get_json()
    dosage = request.json['dosage']
    nom_com = request.json['nom_com']
    description = request.json['description']
    prix =request.json['prix']
    date_fab = request.json['date_fab']
    date_per = request.json['date_per']
    qte_stock = request.json['qte_stock']
    num_lot = request.json['num_lot']
    product = Product.query.filter_by(nom_com=nom_com, dosage=dosage, date_per=date_per).first()
    if product:
        product.qte_stock += qte_stock
    else:
    #file=request.files['image']
        product = Product(dosage=data['dosage'], nom_com=data['nom_com'], description=data['description'], prix=data['prix'], date_fab=datetime.strptime(data['date_fab'], '%Y-%m-%d').strftime('%Y/%m/%d'), date_per=datetime.strptime(data['date_per'], '%Y-%m-%d').strftime('%Y/%m/%d'), qte_stock=data['qte_stock'], num_lot=data['num_lot'])
    db.session.add(product)
    db.session.commit()
    db.session.flush()
    return product.json(),201

@app.route('/deleteProduct/<string:_id>', methods=['DELETE'])
def delete_product(_id):
    product = Product.query.filter_by(_id = _id).first()
    if product:
        db.session.delete(product)
        db.session.commit()
        return ({'message': 'produit supprime avec succes'})
    else:
        return jsonify({'message': 'produit non trouve'})

@app.route('/updateProduct/<string:id>', methods = ['PUT'])
def update_product(id):
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
        product.num_lot = data['num_lot']
    db.session.add(product)
    db.session.commit()
    return jsonify ({'message':'produit mis a jour avec succes'})

@app.route('/productNotification', methods = ['GET'])
def ProductNotification():
    products = Product.query.all()
    liste=[]
    for product in products:
        data={}
        data['_id'] = product._id
        data['dosage'] = product.dosage
        data['nom_com'] = product.nom_com
        data['description'] = product.description
        data['prix'] = product.prix
        data['date_ajout'] = product.date_ajout
        data['date_fab'] = product.date_fab
        data['date_per'] = product.date_per
        data['qte_stock'] = product.qte_stock
        data['num_lot'] = product.num_lot

        liste.append(data)
    return jsonify(liste)

@app.route('/listProduct', methods = ['GET'])
def list_product():
    products = Product.query.all()
    liste=[]
    for product in products:
            data={}
            if (product.qte_stock>0):
                data['_id'] = product._id
                data['dosage'] = product.dosage
                data['nom_com'] = product.nom_com
                data['description'] = product.description
                data['prix'] = product.prix
                data['date_ajout'] = product.date_ajout
                data['date_fab'] = product.date_fab
                data['date_per'] = product.date_per
                data['qte_stock'] = product.qte_stock
                data['num_lot'] = product.num_lot

                liste.append(data)
    return jsonify(liste)

@app.route('/productEnCoursRup',methods=['GET'])
def productEnCoursRup():
    products = Product.query.all()
    liste=[]
    for product in products:
            data={}
            if (product.qte_stock<=15):
                data['_id'] = product._id
                data['dosage'] = product.dosage
                data['nom_com'] = product.nom_com
                data['description'] = product.description
                data['prix'] = product.prix
                data['date_ajout'] = product.date_ajout
                data['date_fab'] = product.date_fab
                data['date_per'] = product.date_per
                data['qte_stock'] = product.qte_stock
                data['num_lot'] = product.num_lot

                liste.append(data)
    return jsonify(liste)

@app.route('/productEnRup',methods=['GET'])
def productEnRup():
    products = Product.query.all()
    liste=[]
    for product in products:
            data={}
            if(product.qte_stock==0):
                data['_id'] = product._id
                data['dosage'] = product.dosage
                data['nom_com'] = product.nom_com
                data['description'] = product.description
                data['prix'] = product.prix
                data['date_ajout'] = product.date_ajout
                data['date_fab'] = product.date_fab
                data['date_per'] = product.date_per
                data['qte_stock'] = product.qte_stock
                data['num_lot'] = product.num_lot

                liste.append(data)
    return jsonify(liste)
    

@app.route('/listSingleProduct/<string:_id>', methods= ['GET'])
def singleProduct(_id):
    product = Product.query.filter_by(_id=_id).first()
    if product:
        return product.json()
    return {'message': 'produit non trouve'}

@app.route('/searchProduct/<string:nom_com>', methods=['GET'])
def searchProduct(nom_com):
    product = Product.query.filter_by(nom_com=nom_com)
    liste = []
    if product:
        for products in product:
            data={}
            data['nom_com']=products.nom_com
            data['description']=products.description
            data['prix']=products.prix
            data['num_lot']=products.num_lot
            liste.append(data)
        return (liste)
    return {'message':'Produit non trouvé!'}

@app.route('/vente', methods = ['POST'])
def create_sale():
    designation = request.json['designation']
    utilisateur_id = request.json['utilisateur_id']
    product_id = request.json['product_id']
    qte = request.json['qte']
    product = Product.query.get(product_id)
    prix_total=product.prix*qte
    if product.qte_stock < qte:
        return {"error": "La quantité que vous voulez est supérieure à celle en stock."},401
    product.qte_stock -= qte
    db.session.add(Vente(utilisateur_id=utilisateur_id, product_id=product_id, qte=qte,prix_total=prix_total,designation=designation))
    db.session.commit()
    return {'success': True}

@app.route('/ventes/<int:utilisateur_id>', methods = ['GET'])
def get_sales(utilisateur_id):
    sales = Vente.query.filter_by(utilisateur_id).all()
    total_prix = sum(vente.product.prix * vente.qte for vente in ventes)
    return {"total_prix": total_prix}

@app.route("/registerCat", methods=["POST"])
def register_cat():
    nom= request.json['nom']

    cat_exists = Categorie.query.filter_by(nom=nom).first() is not None

    if cat_exists:
        return ({"error":"Cette catégorie existe déjà!"}),408
    
    new_cat = Categorie(nom=nom)
    db.session.add(new_cat)
    db.session.commit()

    return jsonify({
     "Message": "Catégorie créée avec succès!"
    })

@app.route('/listCat', methods=['GET'])
def list_cat():
    cats = Categorie.query.all()
    liste = []
    for cat in cats:
        data = {}
        data['id'] = cat.id
        data['nom'] = cat.nom

        liste.append(data)
    return jsonify(liste)

@app.route('/deleteCat/<string:id>', methods=['DELETE'])
def delete_cat(id):
    cat = Categorie.query.filter_by(id = id).first()
    if cat:
        db.session.delete(cat)
        db.session.commit()
        return ({'message': 'Catègorie supprime avec succès!'})
    else:
        return jsonify({'message': 'Catégorie non trouvée!'})

if __name__=="__main__":
    
    app.run(debug=True)
