from datetime import datetime

from pydantic import BaseModel

from schemas.pauta import Pauta


class ConsultaBase(BaseModel):
    titulo: str
    descricao: str
    orgao: str
    data_inicial: datetime
    data_termino: datetime


class ConsultaCreate(ConsultaBase):
    pass


class Consulta(ConsultaBase):
    id: int
    pautas: list[Pauta]
