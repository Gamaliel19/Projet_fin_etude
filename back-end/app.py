
from flask import Flask,request,abort,jsonify,session
from flask_bcrypt import Bcrypt
from flask_cors import CORS, cross_origin
from flask_session import Session
from config import ApplicationConfig
from models import db, User, Produit

app= Flask(__name__)
app.config.from_object(ApplicationConfig)

bcrypt=Bcrypt(app)
CORS(app, supports_credentials=True)
server_session = Session(app)
db.init_app(app)

with app.app_context():
    db.create_all()




@app.route("/register", methods=["POST"])
def register_user():
    email = request.json['email']
    nom = request.json["nom"]
    profil = request.json['profil']
    password = request.json["password"]
    confirmPassword = request.json["confirmPassword"]

    user_exists=User.query.filter_by(email=email).first() is not None

    if user_exists:
        return jsonify({"error":"Cet utilisateur existe déjà!"}),409
    if confirmPassword != password:
        return jsonify({"error":"Veuillez entrer le mot de passe précedant!"}),409
    
    hashed_password = bcrypt.generate_password_hash(password)
    new_user = User(email=email,nom=nom,profil=profil,password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({
     "Message": "Utilisateur créé avec succès!"
    })


@app.route('/login', methods=["POST"])
def login_user():
    nom= request.json["nom"]
    password=request.json["password"]

    user = User.query.filter_by(nom=nom).first()

    if user is None:
        return jsonify({"error": "Echec de connexion! Cet utilisateur n\'existe pas."}), 401
    
    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error":  "Echec de connexion! Votre mot de passe est incorrect"}), 401
    

    return jsonify({
        "Message":"Connexion réussie!"
    })

@app.route('/creerProd', methods=["POST"])
def creerProd():
    dci= request.json["dci"]
    nom= request.json["nom"]
    dosage = request.json["dosage"]
    form = request.json['form']
    lot = request.json["lot"]
    date_fab= request.json["date_fab"]
    date_peremp = request.json["date_peremp"]
    prix_unit = request.json["prix_unit"]
    qte_en_stock = request.json["qte_en_stock"]
    

    new_produit = Produit(dci=dci,nom=nom,dosage=dosage,form=form,lot=lot,date_fab=date_fab,date_peremp=date_peremp,prix_unit=prix_unit,qte_en_stock=qte_en_stock)
    db.session.add(new_produit)
    db.session.commit()

    return jsonify("Le produit a été ajouté avec succès!")

@app.route('/listProd', methods=['GET'])
def listProd():
    listProd = Produit('SELECT * FROM produits').fetchall()
    return jsonify(listProd)


if __name__=="__main__":
    app.run(debug=True)