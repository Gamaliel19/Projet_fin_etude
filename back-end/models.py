from flask_sqlalchemy import SQLAlchemy
from uuid import uuid4

db = SQLAlchemy

def get_uuid():
    return uuid4().hex

class Utilisateur(db.Model):
    __tablename__="users"
    id = db.Column(db.String(32), primary_key=True, unique=True,default=get_uuid)
<<<<<<< HEAD
    nom = db.Column(db.String(255), nullable=False)
    profil = db.Column(db.String(255), nullable=False)
=======
    email = db.Column(db.String(345), unique=True)
>>>>>>> fd1759c5480da96d4b553d32cfd22c10b0cd5dc0
    password = db.Column(db.Text, nullable=False)

    