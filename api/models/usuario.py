from sqlalchemy import DateTime

from models.base import Base
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column

class Usuario(Base):
    __tablename__ = "usuario"

