from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from UserDao import selectUser, insertIntoTable, insertLoginTime, userLoginCount
from User import User
from datetime import datetime


app = Flask(__name__)
CORS(app)

@app.route("/")
def index():
  return render_template("index.html", terminal_output="", listing_data={})

@app.route("/login")
def login():
  data = request.args # get the keys and values after "?"" in URL (only GET method)
  email = data.get("email")
  pwd = data.get("pwd")
  user = User("", email, pwd, "")
  print(data)
  print(email)
  print(pwd)

  flag = ""
  result = selectUser(user)
  print(result)
  resultUser = None
  if result:
    flag = "success"
    resultUser = User(result[0], result[1], result[2], result[3]) # encapsulate the tuple "result" to class "User"

    # record time of login
    now = datetime.now()
    current_time = now.strftime("%Y-%m-%d %H:%M:%S")
    insertLoginTime(result[1], current_time)

    return jsonify({"flag": flag, "user": resultUser.to_dict()}) # transform class "resultUser" to dictionary form
  else:
    flag = "failure"
    return jsonify({"flag": flag, "user": ""})

  # return jsonify({"flag": flag, "result": resultUser.to_dict()}) ---->
  # if return is put here, resultUser.to_dict() will show error if email and pwd are empty (none)

# get login count
@app.route("/getLoginCount")
def getLoginCount():
  results = userLoginCount()

  flag = ""
  if results:
    flag = "success"
    print(results)
    return jsonify({"flag": flag, "results": results})
  else:
    flag = "failure"
    return jsonify({"flag": flag, "results": ""})

@app.route("/register", methods=['POST'])
def register():
  data = request.json
  email = data.get("email")
  pwd = data.get("pwd")
  name = data.get("name")
  user = User("",email,pwd,name)

  flag = ""
  try:
    insertIntoTable(user)
    flag = "success"
    return jsonify({"flag": flag, "msg": "Registration successful."})
  except:
    flag = "failure"
    return jsonify({"flag": flag, "msg": "Registration failed."})



if __name__=="__main__":
  app.run()
