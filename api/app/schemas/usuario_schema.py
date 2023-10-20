import datetime

from pydantic import BaseModel


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    nickname: str | None = None


class UsuarioBase(BaseModel):
    nickname: str
    nome: str
    sobrenome: str
    cpf: str
    genero: str
    cep: str
    cidade: str
    uf: str
    data_nascimento: datetime.date


class UsuarioCreate(UsuarioBase):
    senha: str


class UsuarioResponse(UsuarioBase):
    id: str




