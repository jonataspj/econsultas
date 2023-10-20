from typing import Type
from uuid import uuid4

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.db import get_db_session
from app.models.consulta import Consulta, Status, Pauta, Comentario
from app.models.usuario import Usuario
from app.routes.auth import get_current_user
from app.schemas.consulta_schema import ConsultaResponse, ConsultaCreate, PautaResponse, ComentarioResponse, \
    ComentarioCreate
from app.schemas.usuario_schema import UsuarioResponse

router = APIRouter(
    prefix="/consultas"
)


async def pauta_response_from_model(pauta: Type[Pauta]) -> PautaResponse:
    return PautaResponse(
        id=pauta.id,
        texto=pauta.texto,
        comentarios=[ComentarioResponse(
            id=com.id,
            comentario=com.comentario,
            usuario=UsuarioResponse(
                id=com.usuario.id,
                nickname=com.usuario.nickname,
                nome=com.usuario.nome,
                sobrenome=com.usuario.sobrenome,
                cpf=com.usuario.cpf,
                genero=com.usuario.genero,
                cep=com.usuario.cep,
                cidade=com.usuario.cidade,
                uf=com.usuario.uf,
                data_nascimento=com.usuario.data_nascimento
            )
        ) for com in pauta.comentarios],
        votos_sim=pauta.votos_sim,
        votos_nao=pauta.votos_nao
    )


async def consulta_response_from_model(consulta: Consulta) -> ConsultaResponse:
    return ConsultaResponse(
        id=consulta.id,
        titulo=consulta.titulo,
        descricao=consulta.descricao,
        detalhes=consulta.detalhes,
        orgao=consulta.orgao,
        data_inicial=consulta.data_inicial,
        data_termino=consulta.data_termino,
        pautas=[await pauta_response_from_model(pauta) for pauta in consulta.pautas]
    )


@router.get("/")
async def read_all(session: AsyncSession = Depends(get_db_session)) -> list[ConsultaResponse]:
    return [await consulta_response_from_model(consulta) for consulta in await Consulta.read_all(session)]


@router.get("/{consulta_id}")
async def read(consulta_id: str, session: AsyncSession = Depends(get_db_session)) -> ConsultaResponse:
    consulta = await Consulta.read(consulta_id, session)
    if consulta is not None:
        return await consulta_response_from_model(consulta)
    else:
        raise HTTPException(status_code=404, detail="Consulta não encontrada")


@router.post("/criar")
async def create(consulta: ConsultaCreate, session: AsyncSession = Depends(get_db_session)) -> ConsultaResponse:
    nova_consulta = await Consulta.create(
        session=session,
        titulo=consulta.titulo,
        descricao=consulta.descricao,
        detalhes=consulta.detalhes,
        orgao=consulta.orgao,
        data_inicial=consulta.data_inicial,
        data_termino=consulta.data_termino,
        status=Status.emAberto,
        pautas=[Pauta(
            id=uuid4().hex,
            texto=pauta.texto,
            comentarios=[],
            votos_sim=0 if pauta.votacao else None,
            votos_nao=0 if pauta.votacao else None
        ) for pauta in consulta.pautas]
    )

    return await consulta_response_from_model(nova_consulta)


@router.post("/pauta/{pauta_id}/votar")
async def votar(pauta_id: str, voto: bool, usuario: Usuario = Depends(get_current_user),
                session: AsyncSession = Depends(get_db_session)) -> PautaResponse:
    pauta = await session.get(Pauta, pauta_id)
    if pauta is not None:
        if voto:
            if pauta.votos_sim is not None:
                pauta.votos_sim += 1
            else:
                raise HTTPException(status_code=400, detail="Essa pauta não suporta votação")
        else:
            if pauta.votos_nao is not None:
                pauta.votos_nao += 1
            else:
                raise HTTPException(status_code=400, detail="Essa pauta não suporta votação")
        await session.commit()
        await session.refresh(pauta)
        return await pauta_response_from_model(pauta)
    else:
        raise HTTPException(status_code=404, detail="Pauta não encontrada")


@router.post("/pauta/{pauta_id}/comentar")
async def comentar(pauta_id: str, comentario: ComentarioCreate, usuario: Usuario = Depends(get_current_user),
                   session: AsyncSession = Depends(get_db_session)) -> PautaResponse:
    pauta = await session.get(Pauta, pauta_id)
    if pauta is not None:
        pauta.comentarios.append(
            Comentario(
                id=uuid4().hex,
                comentario=comentario.comentario,
                usuario=usuario
            )
        )
    session.add_all(pauta.comentarios)
    await session.commit()
    await session.refresh(pauta)
    for comentario in pauta.comentarios:
        await session.refresh(comentario)

    return await pauta_response_from_model(pauta)
