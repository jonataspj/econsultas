from typing import Optional

from pydantic import BaseModel


class ComentarioBase(BaseModel):
    comentario: str


class ComentarioCreate(ComentarioBase):
    pauta_id: int


class Comentario(ComentarioBase):
    id: int
    usuario: Usuario
