import datetime

from sqlalchemy import DateTime

from models.base import Base
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column


class Usuario(Base):
    __tablename__ = "usuario"
    id: Mapped[int] = mapped_column(primary_key=True)
    nome: Mapped[str]
    sobrenome: Mapped[str]
    cpf: Mapped[str]
    data_nascimento: Mapped[datetime.date]
    genero: Mapped[str]
    cep: Mapped[str]
    cidade: Mapped[str]
    uf: Mapped[str]
    senha_hash: Mapped[str]

    __mapper_args__ = {
        "polymorphic_identity": "usuario"
    }
