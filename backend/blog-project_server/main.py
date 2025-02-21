from flask import Flask, render_template, request, jsonify, send_from_directory
from flask_cors import CORS
from UserDao import select_user, insert_user_into_table, insert_login_time, user_login_count
from User import User
from datetime import datetime
from Article import Article
from ArticleDao import insert_article_into_table, get_article_list
import os
import uuid
import base64
from io import BytesIO
from PIL import Image


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
  result = select_user(user)
  print(result)
  resultUser = None
  if result:
    flag = "success"
    resultUser = User(result[0], result[1], result[2], result[3]) # encapsulate the tuple "result" to class "User"

    # record time of login
    now = datetime.now()
    current_time = now.strftime("%Y-%m-%d %H:%M:%S")
    insert_login_time(result[1], current_time)

    return jsonify({"flag": flag, "user": resultUser.to_dict()}) # transform class "resultUser" to dictionary form
  else:
    flag = "failure"
    return jsonify({"flag": flag, "user": ""})

  # return jsonify({"flag": flag, "result": resultUser.to_dict()}) ---->
  # if return is put here, resultUser.to_dict() will show error if email and pwd are empty (none)

# get login count
@app.route("/getLoginCount")
def getLoginCount():
  results = user_login_count()

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
    insert_user_into_table(user)
    flag = "success"
    return jsonify({"flag": flag, "msg": "Registration successful."})
  except:
    flag = "failure"
    return jsonify({"flag": flag, "msg": "Registration failed."})

# article publishing port
@app.route("/publishArticle", methods=['POST'])
def publishArticle():
  data = request.json

  title = data.get("articleTitle")
  content = data.get("articleContent")
  cover = data.get("articleCover")
  author = data.get("articleAuthor")

  now = datetime.now()
  current_time = now.strftime("%Y-%m-%d %H:%M:%S")

  article = Article("",title,content,cover,0,current_time,author)

  flag = ""
  try:
    insert_article_into_table(article)
    flag = "success"
    return jsonify({"flag": flag, "msg": "Article published successfully."})
  except:
    flag = "failure"
    return jsonify({"flag": flag, "msg": "Article publishment failed."})


BASE_DIR = os.path.dirname(os.path.abspath(__file__)) # os.path.dirname=>得到父目录路径 os.path.abspath(__file__)=>获取当前文件的绝对路径，
UPLOAD_FOLDER = os.path.join(BASE_DIR, 'uploads') # Users/username/projects/blog-project_server + /uploads

if not os.path.exists(UPLOAD_FOLDER):
  os.makedirs(UPLOAD_FOLDER)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# get article list
@app.route("/getArticleList")
def getArticleList():

  results = get_article_list()

  flag = ""
  if results:
    flag = "success"
    print(results)
    return jsonify({"flag": flag, "results": results})
  else:
    flag = "failure"
    return jsonify({"flag": flag, "msg": "System error"})

@app.route('/image/<filename>')
def uplaod_file(filename):
  return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

@app.route('/upload', methods=['POST'])
def upload_image():
    try:
        data = request.json # 获取 JSON 请求体中的数据
        base64_image = data.get('image') # 提取 Base64 字符串

        if not base64_image:
            return jsonify({'error': 'No image data found'}), 400

        header, encoded = base64_image.split(",", 1) # 去除 Base64 前缀 (例如：data:image/png;base64,)

        img_data = base64.b64decode(encoded)  # 解码 Base64 字符串为二进制数据
        img = Image.open(BytesIO(img_data)) # 将二进制数据转换为图片

        # 读取图片格式
        try:
            format_type = img.format.lower()  # 获取格式 (jpg, png, etc.)
        except Exception as e:
            return {"error": f"无法识别图片格式: {str(e)}"}, 400


        new_filename = f"{uuid.uuid4()}.{format_type}" # 生成 UUID 文件名

        # 保存图片
        img_path = os.path.join(app.config['UPLOAD_FOLDER'], new_filename)
        img.save(img_path)

        return jsonify({'message': 'Image uploaded successfully!', 'image_url': f'/image/{new_filename}'}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__=="__main__":
  app.run()
