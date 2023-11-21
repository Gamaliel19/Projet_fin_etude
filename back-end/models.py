from flask_sqlalchemy import SQLAlchemy
from uuid import uuid4

db = SQLAlchemy()

def get_uuid():
    return uuid4().hex

class User(db.Model):
    __tablename__="users"
    id = db.Column(db.String(32), primary_key=True, unique=True,default=get_uuid)
    email = db.Column(db.String(345), unique=True)
    nom = db.Column(db.String(255), nullable=False)
    profil = db.Column(db.String(255), nullable=False)
    password = db.Column(db.Text, nullable=False)

class Produit(db.Model):
    __tablename__="produits"
    id = db.Column(db.String(32), primary_key=True, unique=True,default=get_uuid)
    dci = db.Column(db.String(255))
    nom = db.Column(db.String(255))
    dosage = db.Column(db.String(10), nullable=False)
    form = db.Column(db.String(255))
    lot = db.Column(db.String(10))
    date_fab = db.Column(db.String, nullable=False)
    date_peremp = db.Column(db.String, nullable=False)
    prix_unit = db.Column(db.Float)
    qte_en_stock = db.Column(db.Integer)