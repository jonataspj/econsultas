import datetime
from typing import Self
from uuid import uuid4

from fastapi import Depends
from sqlalchemy import select
from sqlalchemy.exc import NoResultFound, MultipleResultsFound
from sqlalchemy.ext.asyncio import AsyncSession
from models.base import Base
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column


class Usuario(Base):
    __tablename__ = "usuario"
    id: Mapped[str] = mapped_column(primary_key=True)
    nickname: Mapped[str] = mapped_column(unique=True)
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

    @classmethod
    async def get_by_id(cls, usuario_id: str, session: AsyncSession) -> Self:
        try:
            transaction = await session.get(cls, usuario_id)
        except NoResultFound:
            return None
        return transaction

    @classmethod
    async def get_by_nick(cls, nickname: str, session: AsyncSession) -> Self:
        try:
            transaction = await session.execute(select(cls).where(Usuario.nickname == nickname))
            result = transaction.one()[0]
        except NoResultFound or MultipleResultsFound:
            return None
        return result

    @classmethod
    async def create(cls, session: AsyncSession, usuario_id=None, **kwargs):
        if not usuario_id:
            usuario_id = uuid4().hex
        transaction = cls(id=usuario_id, **kwargs)
        session.add(transaction)
        await session.commit()
        await session.refresh(transaction)
        return transaction
