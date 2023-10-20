from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.usuario import Usuario
from app.db import get_db_session
from app.routes.auth import get_password_hash, get_current_user
from app.schemas.usuario_schema import UsuarioCreate, UsuarioResponse

router = APIRouter(
    prefix="/usuarios"
)


@router.post("/")
async def create(usuario: UsuarioCreate, session: AsyncSession = Depends(get_db_session)) -> UsuarioResponse:
    exists = await Usuario.get_by_nick(usuario.nickname, session)
    if exists:
        raise HTTPException(status_code=400, detail="O apelido já está em uso")
    hashed = get_password_hash(usuario.senha)

    novo_usuario = await Usuario.create(
        session=session,
        nickname=usuario.nickname,
        nome=usuario.nome,
        sobrenome=usuario.sobrenome,
        senha_hash=hashed,
        cpf=usuario.cpf,
        genero=usuario.genero,
        cep=usuario.cep,
        cidade=usuario.cidade,
        uf=usuario.uf,
        data_nascimento=usuario.data_nascimento
    )
    return UsuarioResponse(
        id=novo_usuario.id,
        nickname=novo_usuario.nickname,
        nome=novo_usuario.nome,
        sobrenome=novo_usuario.sobrenome,
        cpf=novo_usuario.cpf,
        genero=novo_usuario.genero,
        cep=novo_usuario.cep,
        cidade=novo_usuario.cidade,
        uf=novo_usuario.uf,
        data_nascimento=usuario.data_nascimento
    )


@router.get("/minha_conta")
async def me(usuario: Usuario = Depends(get_current_user)) -> UsuarioResponse:
    return UsuarioResponse(
        id=usuario.id,
        nickname=usuario.nickname,
        nome=usuario.nome,
        sobrenome=usuario.sobrenome,
        cpf=usuario.cpf,
        genero=usuario.genero,
        cep=usuario.cep,
        cidade=usuario.cidade,
        uf=usuario.uf,
        data_nascimento=usuario.data_nascimento
    )

