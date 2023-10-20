from fastapi import APIRouter

from routes import usuarios, consultas

router = APIRouter()
router.include_router(consultas.router)
router.include_router(usuarios.router)
