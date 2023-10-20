import datetime

from sqlalchemy.ext.asyncio import AsyncSession

from models.usuario import Usuario
from routes.auth import get_password_hash


async def popular_banco(session: AsyncSession):
    usuario1 = Usuario(
        id="usuario1",
        nickname="joao",
        nome="João",
        sobrenome="Silva",
        cpf="123.456.789-01",
        data_nascimento=datetime.date(1990, 5, 15),
        genero="Masculino",
        cep="12345-678",
        cidade="São Paulo",
        uf="SP",
        senha_hash=get_password_hash("joao123")
    )

    usuario2 = Usuario(
        id="usuario2",
        nickname="maria",
        nome="Maria",
        sobrenome="Santos",
        cpf="987.654.321-02",
        data_nascimento=datetime.date(1985, 8, 25),
        genero="Feminino",
        cep="54321-987",
        cidade="Rio de Janeiro",
        uf="RJ",
        senha_hash=get_password_hash("maria123")
    )

    session.add_all([usuario1, usuario2])
    await session.commit()


