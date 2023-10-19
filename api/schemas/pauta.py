from typing import Optional

from pydantic import BaseModel

from schemas.comentario import Comentario
from schemas.consulta import Consulta


class PautaBase(BaseModel):
    consulta: Consulta
    text: str


class PautaCreate(PautaBase):
    consulta_id: int
    votacao: bool
    comentarios: bool


class Pauta(PautaBase):
    id: int
    comentarios: Optional[list[Comentario]]
    votos_sim: Optional[int]
    votos_nao: Optional[int]
