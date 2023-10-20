from fastapi import APIRouter

from app.routes import consultas
from app.routes import usuarios

router = APIRouter()
router.include_router(consultas.router)
router.include_router(usuarios.router)
