import pymysql
from User import User

def create_table():
  connection = None
  cursor = None
  try:
    connection = pymysql.connect(
      user = "root",
      password = "a1031806",
      database = "blog_data_base",
      host = "localhost",
      port = 3306
    )

    cursor = connection.cursor()

    cursor.execute(
      '''
      create table if not exists user(
        id int auto_increment primary key,
        email varchar(30) UNIQUE,
        pwd varchar(30),
        name varchar(30)
      )
      '''
    )

    connection.commit()

  except (Exception) as error:
    print(error)

  finally:
    if cursor:
      cursor.close()
    if connection:
      connection.close()

def insertIntoTable(user):
    connection = None
    cursor = None
    try:
        if not user.email or not user.pwd or not user.name:
            print("Invalid user data.")
            return

        connection = pymysql.connect(
            user="root",
            password="a1031806",
            database="blog_data_base",
            host="localhost",
            port=3306
        )

        cursor = connection.cursor()

        cursor.execute(
            '''
            INSERT INTO user(email, pwd, name)
            VALUES(%s, %s, %s)
            ''',
            (
                user.email,
                user.pwd,
                user.name
            )
        )

        connection.commit()
        print("User inserted successfully.")

    except pymysql.MySQLError as error:
        print(f"MySQL Error: {error}")

    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()

# insert login time
def insertLoginTime(email, loginTime):
    connection = None
    cursor = None
    try:
        if not email:
            print("Invalid user data.")
            return

        connection = pymysql.connect(
            user="root",
            password="a1031806",
            database="blog_data_base",
            host="localhost",
            port=3306
        )

        cursor = connection.cursor()

        cursor.execute(
            '''
            INSERT INTO user_login(email, login_time)
            VALUES(%s, %s)
            ''',
            (
                email,
                loginTime
            )
        )

        connection.commit()
        print("User inserted successfully.")

    except pymysql.MySQLError as error:
        print(f"MySQL Error: {error}")

    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()


# count login times
def userLoginCount():
    connection = None
    cursor = None
    results = None
    try:
        connection = pymysql.connect(
            user="root",
            password="a1031806",
            database="blog_data_base",
            host="localhost",
            port=3306
        )

        cursor = connection.cursor()

        cursor.execute(
            '''
            select count(id) as login_count, SUBSTR(login_time,1,10) as login_time from user_login
            GROUP BY SUBSTR(login_time,1,10) ORDER BY login_time
            '''
        )

        results = cursor.fetchall()

    except pymysql.MySQLError as error:
        print(f"MySQL Error: {error}")

    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()

    return results # tuple as its type

def selectUser(user):
    connection = None
    cursor = None
    result = None
    try:
        if not user.email or not user.pwd:
            print("Invalid user data.")
            return

        connection = pymysql.connect(
            user="root",
            password="a1031806",
            database="blog_data_base",
            host="localhost",
            port=3306
        )

        cursor = connection.cursor()

        cursor.execute(
            '''
            select * from user where email=%s and pwd=%s
            ''',
            (
                user.email,
                user.pwd
            )
        )

        result = cursor.fetchone() # fetchone() returns a "tuple" of the first line of the data fetched

    except pymysql.MySQLError as error:
        print(f"MySQL Error: {error}")

    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()

    return result # tuple as its type

if __name__ == "__main__":
    create_table()

    user = User("", "test03@gmail.com", "1234567890a", "test03")
    insertIntoTable(user)

    result = selectUser(user)
    if result:
      print(result)
      print("Login succeeded")
    else:
      print("Login failed")
