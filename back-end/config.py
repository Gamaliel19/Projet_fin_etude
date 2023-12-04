from dotenv import load_dotenv
import os
import redis

load_dotenv()

class ApplicationConfig:

    SQLALCHEMY_TRACK_MODIFICATIONS=False
    SQLALCHEMY_ECHO=True
    SQLALCHEMY_DATABASE_URI= r"sqlite:///./db.sqlite"