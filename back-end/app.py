import os
from flask import Flask,request,abort,jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import func
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_session import Session
from flask_login import LoginManager, login_required, logout_user, current_user, login_user
#from flask_uploads import UploadSet, configure_uploads, IMAGES
from models import db, User, Product, Categorie, Vente
from datetime import datetime, date
from json_tricks import dumps, loads
import re
import jwt
from functools import wraps

basedir = os.path.abspath(os.path.dirname(__file__))
app= Flask(__name__)


app.config["SECRET_KEY"] = "WxJN3pke:HmtE9fat>sy:<9vfW7?N~Q=yvG>/f?sGrGx!jC_pk"
app.config['SESSION_TYPE'] = 'filesystem'
app.config['SQLALCHEMY_DATABASE_URI'] ='mysql://root:''@localhost/flaskdb' #+ os.path.join(basedir, 'data.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
#app.config['UPLOADED_IMAGES_DEST'] = ''
#app.config.from_object(ApplicationConfig)

bcrypt=Bcrypt(app)
CORS(app, supports_credentials=True)
server_session = Session(app)
db.init_app(app)
#images = UploadSet('images', IMAGES)
#configure_uploads(app, images)
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
            token = jwt.encode({"email":user.email,"nom":user.nom, "prenom":user.prenom, "profil":user.profil}, app.config["SECRET_KEY"],algorithm="HS256")
            return jsonify({"Message":"Connexion réussie!", "id":user.id, "token":token})
            
            if profil=="admin":
                return redirect(url_for('admin'))

        return ({"message":"mot de passe incorrect, reessayez"})
    return ({"message":"ce utilisateur n\'existe pas, reessaye"})
@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('adminLogin'))

@app.route('/admin')
@login_required
def admin():

    return 'l\'utilisateur actuel est' ' '+ current_user.email

def token_required(f):
    @wraps(f)
    def decorator(*args, **kwargs):
        token=None
        if not request.headers['Authorization']:
            return jsonify({"message": "veillez vous authentifier"}),401
        token=request.headers['Authorization'].split(' ')[1]
        if not token:
            return jsonify({"message":"pas de token"})
        try:
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithm='HS256')
            user_actuel = User.query.filter_by(email=data['email']).first()
            if user_actuel:
                return user_actuel
        except:
            return jsonify({'message':'token invalide'}),401
        return f(user_actuel, *args, **kwargs)
    return decorator

'''@app.route('/loginUser', methods=["POST"])
def login_user():
    data=request.get_json()
    email = request.json['email']
    password=request.json["password"]
    if not data['email'] or not data['password']:
        return ({"authentification echouee!"})
    user = User.query.filter_by(email=email).first()

    if user is None:
        return ({"error": "Echec de connexion! Cet utilisateur n\'existe pas."}), 401
    
    if not bcrypt.check_password_hash(user.password, password):
        return ({"error":  "Echec de connexion! Votre mot de passe est incorrect"}), 401
    
    token = jwt.encode({"email":user.email,"nom":user.nom, "prenom":user.prenom, "profil":user.profil}, app.config["SECRET_KEY"],algorithm="HS256")
    return jsonify({"Message":"Connexion réussie!","token":token})'''
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
@token_required
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
#@login_required  
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
    image = data['image'].encode()
    product = Product.query.filter_by(nom_com=nom_com,date_per=date_per, dosage=dosage).first()
    #product = Product.query.filter_by(date_per=date_per)
    if product:
        product.qte_stock += qte_stock
    else:
        product = Product(dosage=data['dosage'], nom_com=data['nom_com'], description=data['description'], prix=data['prix'], date_fab=datetime.strptime(data['date_fab'], '%Y-%m-%d').strftime('%Y/%m/%d'), date_per=datetime.strptime(data['date_per'], '%Y-%m-%d').strftime('%Y/%m/%d'), qte_stock=data['qte_stock'], num_lot=data['num_lot'], image=image)
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
@login_required
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
        data['date_ajout'] = str(product.date_ajout)
        data['date_fab'] = str(product.date_fab)
        data['date_per'] = str(product.date_per)
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

#liste des produits expires
@app.route('/expired_products')
def produits_expire():
    date_du_jour = datetime.now()
    produits = Product.query.filter(Product.date_per <= date_du_jour).all()
    result = []
    for produit in produits:
        result.append({'nom': produit.nom_com, 'dosage':produit.dosage, 'date expiration': produit.date_per, 'id':produit.id})
    return {'produits': result}


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
@app.route('/vendre', methods=['POST'])
def vendre():
    data = request.get_json()
    date_test=datetime.now()
    produit = Product.query.filter_by(nom_com=data['nom_com'], dosage=data['dosage']).first()
    if produit is None:
        return {"error":"produit non trouve"}, 404
    if produit.qte_stock< data['qte']:
        return {"error":"Quantite insuffisante en stock"},400
    '''if produit.date_per<date_test:
        return {"error":"le produit est expire et donc ne peut etre vendu"}'''
    total = produit.prix * data['qte']
    vente = Vente(product_id=produit.id, qte=data['qte'], nom_com=produit.nom_com,dosage=produit.dosage,utilisateur_id=data['utilisateur_id'], prix=produit.prix, prix_total=total)
    produit.qte_stock -= data['qte']
    
    db.session.add(vente)
    db.session.commit()
    return {"id":produit.id, "nom du produit":produit.nom_com, "description":produit.description, "dosage":produit.dosage, "total": total}, 200
@app.route('/ventes', methods = ['GET'])
def get_ventes():
    ventes = ventes = Vente.query.order_by(Vente.date.desc()).all()
    return {"Ventes": [{"id":vente.id, "produit_id":vente.product_id, "qte":vente.qte, "date":vente.date} for vente in ventes]} 

@app.route('/venteJr/<string:dateE>', methods=['GET'])
def  venteJr(dateE):
    ventesJr= Vente.query.filter_by(date=dateE).all()
    if ventesJr:
        return jsonify([{'id': vente.id, 'produit': vente.nom_com, 'quantite': vente.qte, 'date_enregistrement': vente.date} for vente in ventesJr])
    else:
        return jsonify({"message":"Aucune vente n'a ete effectuee a cette date"})

@app.route('/quantite_vendue', methods=['GET'])
def quantite_vendue():
    date_ver=datetime.utcnow
    venter=Vente.query.filter_by(date=date_ver).first
    if venter:
        ventes = db.session.query(Product.nom_com, Product.dosage, Product.date_per, db.func.sum(Vente.qte), Product.prix*db.func.sum(Vente.qte), Vente.date).join(Vente).group_by(Product.nom_com, Product.dosage, Product.date_per, Product.prix, Vente.date).all()
        quantite_vendue = [{'nom_com': vente[0], 'dosage': vente[1], 'date_per': str(vente[2]), 'quantite': vente[3], 'prix_total': vente[4], 'date': str(vente[5])} for vente in ventes]
        return jsonify(quantite_vendue)
    else:
        return "aucune vente"

@app.route('/vente/<id>', methods=['PUT'])
def update_vente(id):
    data = request.get_json()
    vente = Vente.query.get(id)
    if data['nom_com']:
        vente.nom_com = data['nom_com']
        vente.qte = data['qte']
        vente.dosage = data['dosage']
        vente.prix = data['prix']
    db.session.add(vente)
    db.session.commit()

    return jsonify({'message':"vente mis a jou avec succes"})


@app.route('/ventes/<int:utilisateur_id>')
def get_ventes_U(utilisateur_id):
    ventes = Vente.query.filter_by(utilisateur_id=utilisateur_id).all()
    return jsonify([{'id': vente.id, 'nom_com': vente.nom_com, 'quantite': vente.qte, 'prix':vente.prix, 'prix_total':vente.prix_total} for vente in ventes])



@app.route('/ventes/grouped', methods=['GET'])
def get_ventes_grouped():
    #ventes = db.session.query(Vente.date, db.func.group_concat(Vente.nom_com), db.func.group_concat(Vente.qte), Product.prix*db.func.sum(Vente.prix)).group_by(Vente.date).all()
    ventes = db.session.query(Vente.date, Product.nom_com, Product.dosage, Product.date_per, db.func.sum(Vente.qte), Product.prix*db.func.sum(Vente.qte)).join(Vente).group_by(Product.nom_com, Product.dosage, Product.date_per, Product.prix, Vente.date).all()
    return jsonify([{'date':str(vente[0]), 'produit': vente[1],'dosage':vente[2], 'date_per': vente[3],'quantite': vente[4],'prix_total': vente[5]} for vente in ventes])


@app.route('/ventes/somme_date', methods=['GET'])
def get_somme_date():
    prix_total = Vente.qte*Vente.prix
    ventes = db.session.query(Vente.date, db.func.sum(prix_total)).group_by(Vente.date).all()
    return jsonify([{'date': vente[0],'prix':vente[1]}for vente in ventes])

if __name__=="__main__":
    
    app.run(debug=True)
