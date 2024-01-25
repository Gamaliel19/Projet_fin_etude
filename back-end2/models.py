from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin, LoginManager, login_required, logout_user, current_user, login_user
from datetime import datetime
from datetime import date
from json_tricks import dumps, loads

db = SQLAlchemy()

class User(db.Model, UserMixin):
    __tablename__='users'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), unique=True)
    nom = db.Column(db.String(100), nullable=False)
    prenom = db.Column(db.String(50))
    profil= db.Column(db.String(30))
    password = db.Column(db.String(300), nullable=False)

    utilisateur=db.relationship('Vente', backref='user', lazy=False)
    utilisateur=db.relationship('Commande', backref='user',lazy=False)
    utilisateur=db.relationship('Livraison', backref='user', lazy=False)
    def __init__(self, email, nom, prenom, profil,password,):
        self.email = email
        self.nom = nom
        self.prenom = prenom
        self.profil = profil
        self.password = password
    def json(self):
        return {"email":self.email, "nom":self.nom, "prenom":self.prenom, "password":self.password, "profil":self.profil}

class Product(db.Model):
    __tablename__='produits'
    _id = db.Column(db.Integer, primary_key=True)
    dosage = db.Column(db.String(80))
    nom_com= db.Column(db.String(100))
    description = db.Column(db.String(250))
    prix = db.Column(db.Integer())
    date_ajout = db.Column(db.Date, default=datetime.utcnow)
    date_fab = db.Column(db.Date)
    date_per=db.Column(db.Date)
    qte_stock=db.Column(db.Integer)
    num_lot = db.Column(db.String(80))
    categorie = db.Column(db.String(250))
    user = db.Column(db.String(250))
    image=db.Column(db.LargeBinary)
    #categorie_id = db.Column(db.Integer, db.ForeignKey('categories.id'), nullable=False)
    #cat = db.Column(db.Categorie)
    produit=db.relationship('Commande', backref='produit', lazy=False)
    produit=db.relationship('Inventaire', backref='produit', lazy=False)
    #categorie_id=db.Column(db.Integer, db.ForeignKey('categories.id'), nullable=False)

    def __init__(self,image, dosage,user,categorie, nom_com,description, prix, date_fab:datetime.date, date_per:datetime.date, qte_stock, num_lot):
        self.dosage=dosage
        self.nom_com=nom_com
        self.user=user
        self.categorie=categorie
        self.description=description
        self.prix = prix
        self.date_fab=date_fab
        self.date_per=date_per
        self.qte_stock=qte_stock
        self.num_lot=num_lot
        self.image = image
        
    def json(self):
        return {"image":self.image.decode('utf-8'),"dosage":self.dosage,"categorie":self.categorie,"user":self.user,"description":self.description, "nom_com":self.nom_com, "prix":self.prix, "date_fab":self.date_fab,"date_per":self.date_per, "qte_stock":self.qte_stock, "num_lot":self.num_lot, "date_ajout":self.date_ajout}

class Categorie(db.Model):
    __tablename__='categories'
    id=db.Column(db.Integer, primary_key=True)
    nom = db.Column(db.String(50),nullable=False)
    user = db.Column(db.String(250), nullable=False)
    #categorie=db.relationship('Product', backref='categorie', lazy=False)
    def __init__(self,nom,user):
        self.nom=nom
        self.user = user
    def json(self):
        return {"nom":self.nom, "user":self.nom}

class Vente(db.Model):
    __tablename__='ventes'
    id=db.Column(db.Integer, primary_key=True)
    date=db.Column(db.Date, default=datetime.utcnow)
    designation=db.Column(db.String(250))
    dose=db.Column(db.String(80))
    prix_unit=db.Column(db.Integer)
    prix_total=db.Column(db.Integer)
    qte=db.Column(db.Integer)
    email = db.Column(db.String(250),nullable=False)
    idUser = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('produits._id'), nullable=False)

    def __init__(self,designation,dose,prix_unit,prix_total,qte,product_id,email,idUser):
        self.designation=designation
        self.dose=dose
        self.email=email
        self.idUser=idUser
        self.prix_unit=prix_unit
        self.prix_total=prix_total
        self.qte=qte
        self.product_id=product_id
    def json(self):
        return {"email":self.email,"idUser":self.idUser,"dose":self.dose,"designation":self.designation,"prix_unit":self.prix_unit,"prix_total":self.prix_total, "qte":self.qte, "product_id":self.product_id,"date":self.date}


class Inventaire(db.Model):
    __tablename__='inventaires'
    id=db.Column(db.Integer, primary_key=True)
    libelle=db.Column(db.String(100))
    qte_achete=db.Column(db.Float)
    qte_vendu=db.Column(db.Float)
    qte_stock=db.Column(db.Integer)
    prix_achat=db.Column(db.Float)
    prix_vente=db.Column(db.Float)
    total_vendu=db.Column(db.Integer)
    produit_id=db.Column(db.Integer, db.ForeignKey('produits._id'), nullable=False)

class Commande(db.Model):
    __tablename__='commandes'
    id=db.Column(db.Integer, primary_key=True)
    numero=db.Column(db.Integer)
    qte=db.Column(db.Integer)
    utilisateur_id= db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    prduit_id= db.Column(db.Integer, db.ForeignKey('produits._id'), nullable=False)

class Livraison(db.Model):
    __tablename__='livraisons'
    id=db.Column(db.Integer, primary_key=True)
    numero=db.Column(db.Integer)
    date=db.Column(db.Date)
    utilisateur_id= db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
