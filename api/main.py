import asyncio

from fastapi import FastAPI
from fastapi.responses import JSONResponse
from sqlalchemy.ext.asyncio import create_async_engine

import config
from routes.auth import router as auth_router
from routes.routes import router
from models.base import Base

app = FastAPI()


@app.on_event("startup")
async def init_tables():
    engine = create_async_engine(config.DB)

    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)
        await conn.run_sync(Base.metadata.create_all)


app.include_router(router, prefix="/api")
app.include_router(auth_router)


@app.get("/", include_in_schema=False)
async def health() -> JSONResponse:
    return JSONResponse({"message": "It worked!!"})
