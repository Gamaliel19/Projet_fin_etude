import os
from flask import Flask,request,abort,jsonify,session,redirect,url_for
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import func
from flask_bcrypt import Bcrypt
from flask_cors import CORS, cross_origin
from flask_session import Session
from flask_login import UserMixin, LoginManager, login_required, logout_user, current_user, login_user
from config import ApplicationConfig
from models import db, User, Product, Categorie, Vente
from datetime import datetime, date
from json_tricks import dumps, loads
import re

basedir = os.path.abspath(os.path.dirname(__file__))
app= Flask(__name__)


app.config["SECRET_KEY"] = "secret_key1234"
app.config['SESSION_TYPE'] = 'filesystem'
app.config['SQLALCHEMY_DATABASE_URI'] ='mysql://root:''@localhost/flask' #+ os.path.join(basedir, 'data.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
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
def adminLogin():
    email = request.json["email"]
    password=request.json["password"]
    profil = request.json["profil"]
    user = User.query.filter_by(email=email).first() 
    if user:
        if bcrypt.check_password_hash(user.password, password):
            
            login_user(user)
            if profil=="admin":
                return redirect(url_for('admin'))
    
            return redirect(url_for('/client'))
        return ({"message":"mot de passe incorrect, reessayez"})
    return ({"message":"ce utilisateur n\'existe pas, reessaye"})
@app.route('/logout', methods=['POST'])
@login_required
def logout():
    logout_user()
    return redirect(url_for('adminLogin'))

@app.route('/admin')
@login_required
def admin():
    return 'l\'utilisateur actuel est' + current_user.email

@app.route("/registerUser", methods=["POST"])
def register_user():
    email = request.json['email']
    nom = request.json['nom']
    prenom = request.json['prenom']
    profil = request.json['profil']
    password = request.json['password']
    user_exists=User.query.filter_by(email=email).first() is not None
    admin_exist=User.query.filter_by(profil='admin').first() is not None
    regex_email = r'[a-z-z0-9._%+-]+@[A-Za-z0.9-]+\.[A-Z|a-z]{2,}'
    expression_compile=re.compile(regex_email)
    if not re.match(expression_compile, email):
        return ({"error":"email incorrect! veuillez entrer entrer le format valide"}),409
    if user_exists:
        return ({"error":"Cet utilisateur existe déjà!"}),410
    if len(password) < 8:
        return "le mot de doit contenir au moins 8 caracteres",411
    elif not re.search("[A-Z]", password):
        return "le mot de passe doit contenir au moins une majuscule",412
    elif not re.search("[0-9]", password):
        return "le mot de passe doit contenir au moins un chiffre!",413
    elif not re.search("[@_!#$%^*()<>?/|}{~:]", password):
        return ({"error":"le mot de passe doit contenir au moins un caractere special"}),414
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
        data['id'] = user.id
        data['email'] = user.email
        data['nom'] = user.nom
        data['prenom'] = user.prenom
        data['profil'] = user.profil
        data['password'] = user.password
        liste.append(data)
    return (liste)

#obtenir un seul tilisateur
@app.route('/listSingleUser', methods= ['GET'])
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
    return jsonify({'message': 'utilisateur mis a jour avec succes avec succes', 'utilisateur':{'id':user.id, 'nom':user.nom, 'prenom':user.prenom} })

@app.route('/updatePasswordUser/<string:id>', methods=['PUT'])
def update_password(id):
    data = request.get_json()
    password=request.json["password"]
    newPassword= request.json["newPassword"]
   
    user = User.query.filter_by(password=password).first()
    
    if password != newPassword:
        return jsonify({"error":"Veuillez entrer le mot de passe précedant!"}),409
    if data['password']:
        user.password=data['newPassword']
        
    hashed_password = bcrypt.generate_password_hash(newPassword)
    db.session.add(user)
    db.session.commit()

    
    return jsonify({'message': 'mot de passe modifie avec succes'})

@app.route('/registerProduct', methods = ['POST'])
def register_product():
    data = request.get_json()
    dosage = request.json['dosage']
    nom_com = request.json['nom_com']
    description = request.json['description']
    prix = request.json['prix']
    date_fab = request.json['date_fab']
    date_per = request.json['date_per']
    qte_stock = request.json['qte_stock']
    num_lot = request.json['num_lot']
    product = Product.query.filter_by(nom_com=nom_com).first()
    if product:
        product.qte_stock += qte_stock
    else:
        product = Product(dosage=data['dosage'], nom_com=data['nom_com'], description=data['description'], prix=data['prix'], date_fab=datetime.strptime(data['date_fab'], '%Y-%m-%d').strftime('%Y/%m/%d'), date_per=datetime.strptime(data['date_per'], '%Y-%m-%d').strftime('%Y/%m/%d'), qte_stock=data['qte_stock'], num_lot=data['num_lot'])
    db.session.add(product)
    db.session.commit()
    return product.json(),201


@app.route('/deleteProduct/<string:id>', methods=['DELETE'])
def delete_product(id):
    product = Product.query.filter_by(id=id).first()
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
        data['date_ajout'] = product.date_ajout
        data['date_fab'] = product.date_fab
        data['date_per'] = product.date_per
        data['qte_stock'] = product.qte_stock
        data['num_lot'] = product.num_lot

        liste.append(data)
    return (liste)

@app.route('/recherche/<string:nom>', methods = ['GET'])
def recherche_poduit(nom):
    product = Categorie.query.filter_by(nom=nom)
    if product:
        return product.json()
    return {'message': 'produit non trouve'}

@app.route('/product_counts')
def product_counts():
    product_counts = db.session.query(Product.nom_com, func.count(Product.id)).group_by(Product.nom_com).all()
    product_counts_dict = {nom_com: count for nom_com, count in product_counts}
    return product_counts_dict

@app.route('/register_cat', methods = ['POST'])
def register_cat():
    data = request.get_json()
    new_cat= Categorie(nom=data['nom'])
    db.session.add(new_cat)
    db.session.commit()
    db.session.flush()
    return new_cat.json()

@app.route('/rechercheP/<string:nom_com>', methods = ['GET'])
def rechercheP(nom_com):
    products = Product.query.filter_by(nom_com=nom_com)
    
    if products:
        liste = []
        for product in products:
            data = {}
            data['nom_com']=product.nom_com
            data['description']=product.description
            data['prix']=product.prix
            data['num_lot']=product.num_lot
            liste.append(data)
        return (liste)
    return {'message': 'produit non trouve'}

'''@app.route('/rechercheP/<string:nom_com>', methods = ['GET'])
def rechercheP(nom_com):
    products = Product.query.filter_by(nom_com=nom_com)
    liste=[]
    for product in products:
        data = {}
        data['nom_com']=product.nom_com
        data['description']=product.description
        data['prix']=product.prix
        data['num_lot']=product.num_lot
        data['dosage']=product.dosage
        
    
        liste.append(data)
    return (liste)

    return {'message': 'produit non trouve'}'''






#Enregistrement des ventes
'''@app.route('/vente', methods=['POST'])
def ajouter_vente():
    data = request.get_json()
    product_id = data["product_id"]
    qte = data["qte"]
    product = Product.query.filter_by(prduit_id = product_id).first
    if product:
        if product.qte_stock >= qte:
            product.qte_stock -= qte
            db.session.commit()
            return "vente effectue avec succes"
        else:
            return "stock insuffisant pour effectuer la vente"
    else:
        return "produit non trouve"'''

'''@app.route('/sell/<int:product_id>', methods=['POST'])
def sell_product(product_id):
    data = request.get_json()
    qte = data['qte']
    product = Product.query.get(product_id)
    if not product:
        return {"error": "Product not found"}, 404
    if product.qte_stock < qte:
        return {"error": "Out of stock"}, 400
    product.qte_stock -= qte
    db.session.commit()
    return {"message": f" {qte} {product.nom_com} Vendus. Total price: {product.prix*qte}"}'''
@app.route('/vente', methods = ['POST'])
def create_sale():
    utilisateur_id = request.json['utilisateur_id']
    product_id = request.json['product_id']
    qte = request.json['qte']
    product = Product.query.get(product_id)
    if product.qte_stock < qte:
        return {"error": "pas assez de produit en stock"}
    product.qte_stock -= qte
    db.session.add(Vente(utilisateur_id=utilisateur_id, product_id=product_id, qte=qte))
    db.session.commit()
    return {'success': True}
@app.route('/ventes/<int:utilisateur_id>', methods = ['GET'])
def get_sales(utilisateur_id):
    sales = Vente.query.filter_by(utilisateur_id).all()
    total_prix = sum(vente.product.prix * vente.qte for vente in ventes)
    return {"total_prix": total_prix}

    
  


if __name__=="__main__":
    
    app.run(debug=True)
