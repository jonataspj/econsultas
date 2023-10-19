from __future__ import annotations

import enum
from datetime import datetime
from typing import List

from sqlalchemy import ForeignKey, Table, Column

from models.base import Base
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from sqlalchemy.orm import relationship

from models.usuario import Usuario


class Status(enum.Enum):
    emAberto = "Em Aberto"
    encerrada = "Encerrada"


class Pauta(Base):
    __tablename__ = "pauta"
    id: Mapped[int] = mapped_column(primary_key=True)
    consulta_id: Mapped[int] = mapped_column(ForeignKey("consulta.id"))
    consulta: Mapped[Consulta] = relationship(back_populates="pautas")
    texto: Mapped[str]

    __mapper_args__ = {
        "polymorphic_identity": "pauta"
    }


class Comentario(Base):
    __tablename__ = "comentario"
    id: Mapped[int] = mapped_column(primary_key=True)
    pauta_id: Mapped[int] = mapped_column(ForeignKey("pauta.id"))
    pauta: Mapped[PautaComentario] = relationship(back_populates="comentarios")
    usuario_id: Mapped[int] = mapped_column(ForeignKey("usuario.id"))
    usuario: Mapped[Usuario] = relationship()


class PautaComentario(Pauta):
    comentarios: Mapped[List[Comentario]] = relationship(back_populates="pautacomentario")

    __mapper_args__ = {
        "polymorphic_identity": "pautacomentario",
    }


class PautaVotacao(Pauta):
    votosSim: Mapped[int] = mapped_column(nullable=True)
    votosNao: Mapped[int]

    __mapper_args__ = {
        "polymorphic_identity": "pautavotacao",
    }


class Consulta(Base):
    __tablename__ = "consulta"
    id: Mapped[int] = mapped_column(primary_key=True)
    titulo: Mapped[str]
    descricao: Mapped[str]
    orgao: Mapped[str]
    data_inicial: Mapped[datetime]
    data_termino: Mapped[datetime]
    status: Mapped[Status]
    pautas: Mapped[List[Pauta]] = relationship(back_populates="consulta")
