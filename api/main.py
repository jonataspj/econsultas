import uvicorn
from fastapi import FastAPI
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker
from starlette.middleware.cors import CORSMiddleware

import config
import dados_exemplo
from routes.auth import router as auth_router
from routes.routes import router
from models.base import Base

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:1776",
    "http://127.0.0.1:1776"
    "http://127.0.0.1"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def init_tables():
    engine = create_async_engine(config.DB)

    async with engine.begin() as conn:
        if config.DROP_ON_CREATE:
            await conn.run_sync(Base.metadata.drop_all)
        await conn.run_sync(Base.metadata.create_all)
    async with async_sessionmaker(engine)() as session:
        await dados_exemplo.popular_banco(session)


app.include_router(router)
app.include_router(auth_router)


if __name__ == "__main__":
    uvicorn.run("main:app", port=8000, reload=True)
