from fastapi import FastAPI
from sqlalchemy import create_engine

from models.base import Base
from models import consulta, usuario

app = FastAPI()
db_engine = create_engine("sqlite:///db.sqlite", echo=True)

Base.metadata.create_all(db_engine)

@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/hello/{name}")
async def say_hello(name: str):
    return {"message": f"Hello {name}"}
