from flask import request, g
from flask_restful import Resource
from flask_httpauth import HTTPBasicAuth
from werkzeug import secure_filename
import traceback
import models

auth = HTTPBasicAuth()

class OCILogin(Resource):
    @auth.login_required
    def get(self):
        return g.user.__tablename__

    @auth.verify_password
    def verify_password(username, password):
        admin = models.Admin.query.filter_by(username = username).first()
        user = models.User.query.filter_by(username = username).first()
        print(user)
        if admin and admin.verify_password(password):
            return True
        if user and user.verify_password(password):
            return True

        return False


class OCIRegister(Resource):

    def post(self):
        data = request.get_json(force=True)
        try:
            path = '/home/opc/.oci'
            f = request.files['file']
            path = os.path.join(path, secure_filename(f.filename))
            f.save(path)
            new_user = models.Admin(data['u_ocid'], data['fingerprint'], data['tenancy'],data['compartment'], path)
            if new_user.insert():
                return 'OK', 201
            return 'User Create Failed', 400
        except BaseException as e:
            print('Exception: ', str(e))
            return str(e), 400