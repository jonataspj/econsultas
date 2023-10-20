from fastapi import FastAPI
from fastapi.responses import JSONResponse
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker

import app.config as config
import app.dados_exemplo as dados_exemplo
from app.routes.auth import router as auth_router
from app.routes.routes import router
from app.models.base import Base

app = FastAPI()


@app.on_event("startup")
async def init_tables():
    engine = create_async_engine(config.DB)

    async with engine.begin() as conn:
        if config.DROP_ON_CREATE:
            await conn.run_sync(Base.metadata.drop_all)
        await conn.run_sync(Base.metadata.create_all)
    async with async_sessionmaker(engine)() as session:
        await dados_exemplo.popular_banco(session)


app.include_router(router, prefix="/api")
app.include_router(auth_router)