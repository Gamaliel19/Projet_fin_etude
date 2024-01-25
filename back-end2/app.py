import os
from flask import Flask,request,jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_session import Session
from flask_login import LoginManager, login_required, logout_user, current_user, login_user
from models import db, User, Product,Vente, Categorie
from datetime import datetime
import re
from flask_jwt_extended import JWTManager, create_access_token,jwt_required
from datetime import timedelta
from sqlalchemy.sql import text



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


#Commencent les routes pour le user

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
    
            return jsonify({'token' : access_token, 'userId': user.id,'userNom':user.nom + ' ' + user.prenom ,'userEmail':user.email, 'userProfil':user.profil}),200
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
@jwt_required()
def register_user():
    email = request.json['email']
    nom = request.json['nom']
    prenom = request.json['prenom']
    profil = request.json['profil']
    password = request.json['password']

    user_exists=User.query.filter_by(email=email).first() is not None

    if user_exists:
        return ({"error" : "Cet utilisateur existe déjà!"}),408
    
    #admin_exist=User.query.filter_by(profil='admin').first() is not None
    regex_email = r'[a-z-z0-9._%+-]+@[A-Za-z0-9-]+\.[A-Z|a-z]{2,}'
    expression_compile=re.compile(regex_email)
    if not re.match(expression_compile, email):
        return ({"error":"L'email incorrect. Veuillez entrer le format valide!"}),413
    
    if len(password)<8:
        return ({"error":"Le mot de passe est trop court. Veuillez entrer au moins 8 caractères!"}),409
    
    elif not re.search("[0-9]",password):
        return ({"error":"Le mot de passe doit contenir au moins un chiffre!"}),410
    
    elif not re.search("[@#¦¬|¢´~}{)(:;.*-/+ %&ç$£äö><°§ ]",password):
        return ({"error":"Le mot de passe doit contenir au moins un caractère spécial!"}),411
    
    elif not re.search("[A-Z]",password):
        return jsonify({"error":"Le mot de passe doit contenir au moins une lettre majuscule!"}),412
    
    elif not re.search("[a-z]",password):
        return jsonify({"error":"Le mot de passe doit contenir au moins une lettre(minuscule)!"}),413
    

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

#Commencent les routes pour les produits
@app.route('/registerProduct', methods=["POST"])
@jwt_required()
def register_product():
    data = request.get_json()
    dosage = request.json['dosage']
    user = request.json['user']
    nom_com = request.json['nom_com']
    categorie= request.json['categorie']
    description = request.json['description']
    prix =request.json['prix']
    date_fab = request.json['date_fab']
    date_per = request.json['date_per']
    qte_stock = request.json['qte_stock']
    num_lot = request.json['num_lot']
    image = data['image'].encode()
    product = Product.query.filter_by(nom_com=nom_com ,categorie=categorie, dosage=dosage, date_per=date_per).first()
    
    if nom_com == "":
        return jsonify({"error":"Le champ nom du médicament est vide. Veuillez le remplir svp!"}),405
    
    if product:
        product.qte_stock += int(qte_stock)
    else:
    #file=request.files['image']
        product = Product(image=image,dosage=data['dosage'],categorie=data['categorie'],user=data['user'], nom_com=data['nom_com'], description=data['description'], prix=data['prix'], date_fab=datetime.strptime(data['date_fab'], '%Y-%m-%d').strftime('%Y/%m/%d'), date_per=datetime.strptime(data['date_per'], '%Y-%m-%d').strftime('%Y/%m/%d'), qte_stock=data['qte_stock'], num_lot=data['num_lot'])
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
        data['date_ajout'] = product.date_ajout.strftime("%d-%m-%Y")
        data['date_fab'] = product.date_fab.strftime("%d-%m-%Y")
        data['date_per'] = product.date_per.strftime("%d-%m-%Y")
        data['qte_stock'] = product.qte_stock
        data['num_lot'] = product.num_lot

        liste.append(data)
    return jsonify(liste)

@app.route('/listProduct', methods = ['GET'])
def list_product():
    products = Product.query.order_by(Product.nom_com.asc()).all()
    liste=[]
    for product in products:
            data={}
            if (product.qte_stock>0):
                data['_id'] = product._id
                data['dosage'] = product.dosage
                data['nom_com'] = product.nom_com
                data['description'] = product.description
                data['prix'] = product.prix
                data['date_ajout'] = product.date_ajout.strftime("%d-%m-%Y")
                data['date_fab'] = product.date_fab.strftime("%d-%m-%Y")
                data['date_per'] = product.date_per.strftime("%d-%m-%Y")
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
            if (product.qte_stock>0 and product.qte_stock<=15):
                data['_id'] = product._id
                data['dosage'] = product.dosage
                data['nom_com'] = product.nom_com
                data['description'] = product.description
                data['prix'] = product.prix
                data['date_ajout'] = product.date_ajout.strftime("%d-%m-%Y")
                data['date_fab'] = product.date_fab.strftime("%d-%m-%Y")
                data['date_per'] = product.date_per.strftime("%d-%m-%Y")
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
                data['date_ajout'] = product.date_ajout.strftime("%d-%m-%Y")
                data['date_fab'] = product.date_fab.strftime("%d-%m-%Y")
                data['date_per'] = product.date_per.strftime("%d-%m-%Y")
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
            data['categorie'] = product.categorie
            data['prix']=products.prix
            data['num_lot']=products.num_lot
            liste.append(data)
        return (liste)
    return {'message':'Produit non trouvé!'}

@app.route('/expired_products',methods=['GET'])
def produits_expire():
    date_du_jour = datetime.utcnow()
    products = Product.query.filter(Product.date_per <= date_du_jour).all()
    liste=[]
    for product in products:
        data={}
        data['_id'] = product._id
        data['dosage'] = product.dosage
        data['nom_com'] = product.nom_com
        data['description'] = product.description
        data['prix'] = product.prix
        data['date_ajout'] = product.date_ajout.strftime("%d-%m-%Y")
        data['date_fab'] = product.date_fab.strftime("%d-%m-%Y")
        data['date_per'] = product.date_per.strftime("%d-%m-%Y")
        data['qte_stock'] = product.qte_stock
        data['num_lot'] = product.num_lot

        liste.append(data)
    return jsonify(liste)

#Commence les routes pour la vente
@app.route('/vendre', methods=["POST"])
@jwt_required()
def vendre():
    data = request.get_json()
    produit = Product.query.filter_by(nom_com=data['designation'], dosage=data['dose']).first()

    if produit is None:
        return ({"error":"produit non trouve"}), 404
    
    if produit.qte_stock < int(data['qte']):
        return ({"error":"Quantite insuffisante en stock."}),400
        
    if produit.qte_stock==0:
        return ({"error":"Produit en rupture"}),405
    
    total = produit.prix * int(data['qte'])
    vente = Vente(product_id = produit._id,idUser = data['idUser'] ,email = data['email'],designation=produit.nom_com,dose=produit.dosage,prix_unit=produit.prix,prix_total=total, qte = data['qte'])
    produit.qte_stock -= int(data['qte'])
    db.session.add(vente)
    db.session.commit()
    return jsonify({"message": "Vente réussie","idProduit":produit._id,"idUser":data['idUser'],"email":data['email'], "designation":produit.nom_com, "dose":produit.dosage, "Quantité":data['qte'],"prix_unit":produit.prix, "total": total}), 200

@app.route('/ventes', methods = ['GET'])
def get_ventes():
    ventes = Vente.query.order_by(Vente.date.desc(),Vente.designation.asc()).all()
    liste=[]
    for vente in ventes:
        data={}
        data['id'] = vente.id
        data['designation'] = vente.designation
        data['dose'] = vente.dose
        data['prix_unit'] = vente.prix_unit
        data['qte'] = vente.qte
        data['prix_total'] = vente.prix_total
        data['idUser'] = vente.idUser
        data['date'] = vente.date.strftime("%d-%m-%Y")

        liste.append(data)
    return jsonify(liste)  

@app.route('/listSingleVente/<string:id>', methods= ['GET'])
def single_vente(id):
    vente = Vente.query.filter_by(id=id).first()
    if vente:
        return vente.json()
    return ({"error": "Vente non trouvé"})

@app.route('/venteParUser/<string:id>', methods= ['GET'])
def get_vente_par_user(id):
    ventes = Vente.query.filter_by(idUser=id).order_by(Vente.date.desc()).all()
    return jsonify([{'id':vente.id,'dose':vente.dose,'designation':vente.designation,'prix_unit':vente.prix_unit,'qte':vente.qte,'prix_total':vente.prix_total} for vente in ventes])

@app.route('/deleteVente/<string:id>',methods=['DELETE'])
def delete_vente(id):
    vente = Vente.query.filter_by(id=id).first()
    if vente is None:
        return jsonify({"error":"Cette vente n'existe pas!"})
    db.session.delete(vente)
    db.session.commit()

    return jsonify({"message": "Suppression réussie!"})

#Commencent les routes pour la catégories
@app.route("/registerCat", methods=["POST"])
@jwt_required()
def register_cat():
    nom= request.json['nom']
    user= request.json['user']
    cat_exists = Categorie.query.filter_by(nom=nom).first() is not None

    if cat_exists:
        return ({"error":"Cette catégorie existe déjà!"}),408
    if nom=="":
        return ({"error":"Le champs est vide. Veuillez remplir avant d'enregistrer svp!"}),410
    
    new_cat = Categorie(nom=nom,user=user)
    db.session.add(new_cat)
    db.session.commit()

    return jsonify({"message": "Catégorie créée avec succès!"})

@app.route('/listCat', methods=['GET'])
def list_cat():
    cats = Categorie.query.limit(4).all()
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
