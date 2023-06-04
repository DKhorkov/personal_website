from pydantic import BaseModel


class CallFormRequest(BaseModel):
    name: str
    phone: int
    call_date: str
