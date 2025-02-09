class User:
  def __init__(self, id=None, email="", pwd="", name=""):
    self.id = id
    self.email = email
    self.pwd = pwd
    self.name = name

  def to_dict(self):
    return {
      "id": self.id,
      "email": self.email,
      "pwd": self.pwd,
      "name": self.name,
    }
