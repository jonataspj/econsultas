from __future__ import annotations

import enum
from typing import List

from sqlalchemy import DateTime, ForeignKey

from models.base import Base
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from sqlalchemy.orm import relationship


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
        "polymorphic_identity": "pauta",
        "polymorphic_on": "type",
    }


class Comentario(Base):
    __tablename__ = "comentario"
    id: Mapped[int] = mapped_column(primary_key=True)
    pauta_id: Mapped[int] = mapped_column(ForeignKey("pauta.id"))
    pauta: Mapped[PautaComentario] = relationship(back_populates="comentarios")


class PautaComentario(Pauta):
    __tablename__ = "pautacomentario"
    comentarios: Mapped[List[Comentario]] = relationship(back_populates="pautacomentario")
    __mapper_args__ = {
        "polymorphic_identity": "pautacomentario",
    }


class PautaVotacao(Pauta):
    __tablename__ = "pautavotacao"
    votosSim: Mapped[int]
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
    data_inicial: Mapped[DateTime]
    data_termino: Mapped[DateTime]
    status: Mapped[Status]
    pautas: Mapped[List[Pauta]] = relationship(back_populates="consulta")
