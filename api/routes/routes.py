from fastapi import APIRouter

from routes import consultas, auth, usuarios

router = APIRouter()
router.include_router(consultas.router)
router.include_router(usuarios.router)
