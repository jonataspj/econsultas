from fastapi.params import Form
from typing_extensions import Annotated


class AuthenticationForm:
    def __init__(
            self,
            username: Annotated[
                str,
                Form()
            ],
            password: Annotated[
                str,
                Form()
            ]
                 ):
        self.username = username
        self.password = password