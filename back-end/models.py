from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin, LoginManager, login_required, logout_user, current_user, login_user
from datetime import datetime
from flask_marshmallow import Marshmallow
from json_tricks import dumps, loads

db = SQLAlchemy()
#j'ai ajouté
ma = Marshmallow()

class User(UserMixin, db.Model):
    __tablename__='users'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(200),nullable=False, unique=True)
    nom = db.Column(db.String(100), nullable=False)
    prenom = db.Column(db.String(50))
    password = db.Column(db.String(100), nullable=False)
    profil= db.Column(db.String(30),nullable=False)

    utilisateur=db.relationship('Vente', backref='user', lazy=False)
    utilisateur=db.relationship('Commande', backref='user',lazy=False)
    utilisateur=db.relationship('Livraison', backref='user', lazy=False)
    def __init__(self, email, nom, prenom, password, profil):
        self.email = email
        self.nom = nom
        self.prenom = prenom
        self.password = password
        self.profil = profil
    def json(self):
        return {"email":self.email, "nom":self.nom, "prenom":self.prenom, "motPasse":self.motPasse, "profil":self.profil}
#j'ai ajouté
class UserSchema(ma.Schema):
    class Meta:
        fields = ('id','email','nom','prenom','profil','password')


user_schema = UserSchema()
users_schema = UserSchema(many=True)


class Product(db.Model):
    __tablename__='produits'
    id = db.Column(db.Integer, primary_key=True)
    dosage = db.Column(db.String(80))
    nom_com= db.Column(db.String(100))
    description = db.Column(db.String(100))
    prix = db.Column(db.Integer())
    date_ajout = db.Column(db.DateTime, default=datetime.utcnow)
    date_fab = db.Column(db.Date)
    date_per=db.Column(db.Date)
    qte_stock=db.Column(db.Integer)
    num_lot = db.Column(db.Integer)
    produit=db.relationship('Commande', backref='produit', lazy=False)
    produit=db.relationship('Inventaire', backref='produit', lazy=False)

    def __init__(self, dosage, nom_com, description, prix, date_fab, date_per, qte_stock, num_lot):
        self.dosage=dosage
        self.nom_com=nom_com
        self.description=description
        self.prix = prix
        self.date_fab=date_fab
        self.date_per=date_per
        #self.date_per=date_per
        self.qte_stock=qte_stock
        self.num_lot=num_lot
        
    def json(self):
        return {"dosage":self.dosage, "nom_com":self.nom_com, "prix":self.prix, "date_fab":self.date_fab.isoformat(),"date_per":self.date_per.isoformat(), "qte_stock":self.qte_stock, "num_lot":self.num_lot, "date_ajout":self.date_ajout.isoformat()}


class Vente(db.Model):
    __tablename__='ventes'
    id=db.Column(db.Integer, primary_key=True)
    numero=db.Column(db.Integer)
    date=db.Column(db.Date)
    utilisateur_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)



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
    produit_id=db.Column(db.Integer, db.ForeignKey('produits.id'), nullable=False)


class Commande(db.Model):
    __tablename__='commandes'
    id=db.Column(db.Integer, primary_key=True)
    numero=db.Column(db.Integer)
    qte=db.Column(db.Integer)
    utilisateur_id= db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    prduit_id= db.Column(db.Integer, db.ForeignKey('produits.id'), nullable=False)

class Livraison(db.Model):
    __tablename__='livraisons'
    id=db.Column(db.Integer, primary_key=True)
    numero=db.Column(db.Integer)
    date=db.Column(db.Date)
    utilisateur_id= db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

class Client(db.Model):
    __tablename__='clients'
    id=db.Column(db.String(100), primary_key=True)
    nom=db.Column(db.String(100))
    prenom=db.Column(db.String(100))
    email=db.Column(db.String(100))
    password=db.Column(db.String(100), nullable=False)
