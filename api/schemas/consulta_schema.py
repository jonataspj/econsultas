from __future__ import annotations

import enum
from datetime import datetime
from typing import Optional, List

from pydantic import BaseModel
from schemas.usuario_schema import UsuarioResponse


class ComentarioBase(BaseModel):
    comentario: str


class ComentarioCreate(ComentarioBase):
    pass


class ComentarioResponse(ComentarioBase):
    id: str
    usuario: UsuarioResponse


class ConsultaBase(BaseModel):
    titulo: str
    descricao: str
    detalhes: str
    orgao: str
    data_inicial: datetime
    data_termino: datetime


class PautaBase(BaseModel):
    texto: str


class PautaCreate(PautaBase):
    votacao: bool


class ConsultaCreate(ConsultaBase):
    pautas: List[PautaCreate]


class PautaResponse(PautaBase):
    id: str
    comentarios: List[ComentarioResponse]
    votos_sim: Optional[int]
    votos_nao: Optional[int]


class ConsultaResponse(ConsultaBase):
    id: str
    pautas: List[PautaResponse]
