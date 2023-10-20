from __future__ import annotations

import enum
from datetime import datetime
from uuid import uuid4

from sqlalchemy import select, ForeignKey
from sqlalchemy.ext.asyncio import AsyncSession

from models.base import Base
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from sqlalchemy.orm import relationship

from models.usuario import Usuario


class Status(enum.Enum):
    emAberto = "Em Aberto"
    encerrada = "Encerrada"


class Consulta(Base):
    __tablename__ = "consulta"
    id: Mapped[str] = mapped_column(primary_key=True)
    titulo: Mapped[str]
    descricao: Mapped[str]
    detalhes: Mapped[str]
    orgao: Mapped[str]
    data_inicial: Mapped[datetime]
    data_termino: Mapped[datetime]
    status: Mapped[Status]
    pautas: Mapped[list[Pauta]] = relationship(back_populates="consulta", lazy=False, enable_typechecks=False)

    @classmethod
    async def read(cls, consulta_id: str, session: AsyncSession):
        return await session.get(cls, consulta_id)

    @classmethod
    async def read_all(cls, session: AsyncSession):
        res = [consulta for consulta in (await session.execute(select(cls))).unique().scalars()]
        return res

    @classmethod
    async def create(cls, session: AsyncSession, **kwargs):
        transaction = cls(id=uuid4().hex, **kwargs)
        session.add(transaction)
        session.add_all(transaction.pautas)
        await session.commit()
        await session.refresh(transaction)
        for pauta in transaction.pautas:
            await session.refresh(pauta)
        return transaction


class Pauta(Base):
    __tablename__ = "pauta"
    id: Mapped[str] = mapped_column(primary_key=True)
    consulta_id: Mapped[int] = mapped_column(ForeignKey("consulta.id"))
    consulta: Mapped[Consulta] = relationship(back_populates="pautas", lazy=False)
    texto: Mapped[str]
    votos_sim: Mapped[int] = mapped_column(nullable=True)
    votos_nao: Mapped[int] = mapped_column(nullable=True)
    comentarios: Mapped[list[Comentario]] = relationship(back_populates="pauta", lazy=False)


class Comentario(Base):
    __tablename__ = "comentario"
    id: Mapped[str] = mapped_column(primary_key=True)
    comentario: Mapped[str]
    pauta_id: Mapped[str] = mapped_column(ForeignKey("pauta.id"), nullable=True)
    pauta: Mapped[Pauta] = relationship(back_populates="comentarios", lazy=False)
    usuario_id: Mapped[int] = mapped_column(ForeignKey("usuario.id"))
    usuario: Mapped[Usuario] = relationship(lazy=False)
