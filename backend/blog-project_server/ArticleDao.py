import pymysql
from User import User

def insert_article_into_table(article):
    connection = None
    cursor = None
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
            INSERT INTO article(article_title, article_content, article_cover, view_count, publish_time, article_author)
            VALUES(%s, %s, %s, %s, %s, %s)
            ''',
            (
                article.articleTitle,
                article.articleContent,
                article.articleCover,
                article.viewCount,
                article.publishTime,
                article.articleAuthor
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


def get_article_list():
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
            select id, article_title, article_content, article_cover, view_count, publish_time, article_author
            from article order by publish_time
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
