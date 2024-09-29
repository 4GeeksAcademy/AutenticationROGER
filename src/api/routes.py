"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager


api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

#-----------------------------GET SIGN UP------------------------------------#
@api.route('/users', methods=['GET'])
def get_users():
    callUsers = User.query.all()
    result= [element.serialize() for element in callUsers]
    response_body = {"Add user"}
    return jsonify(result), 200


#-----------------------------POST SIGN UP------------------------------------#
@api.route('/signup', methods=['POST'])
def createUser():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    is_active = request.json.get("is_active", None)
    
    newUser = User(
        email=email,
        password=password,
        is_active= is_active
    )
    db.session.add(newUser)
    db.session.commit()

    if(newUser == newUser):
        return jsonify({"msgInvalid": "User or password, invalid!"})

    response_body = {"msg": "User create"}
    return jsonify(response_body)



#-----------------------------POST LOGIN------------------------------------#
@api.route('/login', methods=['POST'])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    

    user = User.query.filter_by(email=email, password=password).first()

    if user == None:
        return jsonify({"msg": "User or password, Not exist!"}), 401
    
    access_token = create_access_token(identity=user.email)

    response_body = {
        "msg": "Token create",
        "token": access_token
    }

    return jsonify(response_body), 200 


    #-----------------------------GET PRIVATE------------------------------------#
@api.route("/private", methods=["GET"])
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity
    response_body= {
        "msg": "Permiso concedido",
        "correcto": True,
        "Usuario": get_jwt_identity()
    }
    return jsonify(response_body), 200
    #


