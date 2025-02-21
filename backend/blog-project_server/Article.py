class Article:
  def __init__(self, id, articleTitle, articleContent, articleCover, viewCount, publishTime, articleAuthor):
    self.id = id
    self.articleTitle = articleTitle
    self.articleContent = articleContent
    self.articleCover = articleCover
    self.viewCount = viewCount
    self.publishTime = publishTime
    self.articleAuthor = articleAuthor



  def to_dict(self):
    return {
      "id": self.id,
      "articleTitle": self.articleTitle,
      "articleContent": self.articleContent,
      "articleCover": self.articleCover,
      "viewCount": self.viewCount,
      "publishTime": self.publishTime,
      "articleAuthor": self.articleAuthor
    }
