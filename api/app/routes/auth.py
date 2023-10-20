import datetime
from datetime import datetime, timedelta
from typing import Annotated

from fastapi import Depends, HTTPException, status, APIRouter
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from passlib.context import CryptContext
from sqlalchemy.ext.asyncio import AsyncSession

from app import config
from app.db import get_db_session
from app.models.usuario import Usuario
from app.schemas.auth_schema import AuthenticationForm
from app.schemas.usuario_schema import TokenData, Token

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

router = APIRouter()


def verify_password(plain, hashed):
    return pwd_context.verify(plain, hashed)


def get_password_hash(password):
    return pwd_context.hash(password)


async def auth(nickname: str, password: str, session: AsyncSession):
    user = await Usuario.get_by_nick(nickname=nickname, session=session)

    if not user:
        return False
    if not verify_password(password, user.senha_hash):
        return False
    return user


def create_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=120)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, config.SECRET_KEY, algorithm="HS256")
    return encoded_jwt


async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)], session: AsyncSession = Depends(get_db_session)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, config.SECRET_KEY, algorithms=["HS256"])
        nickname: str = payload.get("sub")
        if nickname is None:
            raise credentials_exception
        token_data = TokenData(nickname=nickname)
    except JWTError:
        raise credentials_exception
    user = await Usuario.get_by_nick(nickname=token_data.nickname, session=session)
    if user is None:
        raise credentials_exception
    return user


@router.post("/token", response_model=Token)
async def login(
        form_data: Annotated[AuthenticationForm, Depends()],
        session: AsyncSession = Depends(get_db_session)
):
    user = await auth(nickname=form_data.username, password=form_data.password, session=session)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = create_token(
        data={"sub": user.nickname}
    )

    return {"access_token": access_token, "token_type": "bearer"}
