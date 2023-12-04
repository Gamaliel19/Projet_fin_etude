from flask import Flask
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__='users'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String, unique=True)
    nom = db.Column(db.String(100), nullable=True)
    prenom = db.Column(db.String(50))
    password = db.Column(db.String(50), nullable=True)
    profil= db.Column(db.String(30))

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
        return {"nom":self.nom, "prenom":self.prenom, "motPasse":self.motPasse, "profil":self.profil}
class Produit(db.Model):
    __tablename__='produits'
    id = db.Column(db.Integer, primary_key=True)
    dosage = db.Column(db.String(80))
    nom_com= db.Column(db.String)
    description = db.Column(db.String)
    prix = db.Column(db.Integer())
    date_fab = db.Column(db.Date)
    date_per=db.Column(db.Date)
    qte_stock=db.Column(db.Integer)
    num_Lot = db.Column(db.Integer)
    produit=db.relationship('Commande', backref='produit', lazy=False)
    produit=db.relationship('Inventaire', backref='produit', lazy=False)

    def __init__(self, dosage, nom_com, description, prix, date_fab, date_per, qte_stock, num_Lot):
        self.dosage=dosage
        self.nom_com=nom_com
        self.description=description
        self.prix = prix
        self.date_fab=date_fab
        self.date_per=date_per
        self.qte_stock=qte_stock
        self.num_Lot=num_Lot
        
    def json(self):
        return {"dosage":self.dosage, "nom_com":self.nom_com, "prix":self.prix, "date_fab":self.date_fab, "date_per":self.date_per, "qte_stock":self.qte_stock, "num_lot":self.num_Lot}


class Vente(db.Model):
    __tablename__='ventes'
    id=db.Column(db.Integer, primary_key=True)
    numero=db.Column(db.Integer)
    date=db.Column(db.Date)
    utilisateur_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)



class Inventaire(db.Model):
    __tablename__='inventaires'
    id=db.Column(db.Integer, primary_key=True)
    libelle=db.Column(db.String)
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
    id=db.Column(db.String, primary_key=True)
    nom=db.Column(db.String)
    prenom=db.Column(db.String)
    email=db.Column(db.String)
    password=db.Column(db.String, nullable=False)
