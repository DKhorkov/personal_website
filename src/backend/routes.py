from fastapi import APIRouter, Request
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse, JSONResponse
from socket import gethostbyname, gethostname

from request_models import CallFormRequest
from response_models import CallFormResponse
from call_application_bot import CallApplicationBot


main_router = APIRouter()
templates = Jinja2Templates(directory="src/frontend/templates")


@main_router.get("/", response_class=HTMLResponse)
async def read_item(request: Request):
    return templates.TemplateResponse(
        name="index.html",
        context={
            "request": request,
            "main_url": f"{gethostbyname(gethostname())}:8090/"
        }
    )


@main_router.post("/create_call_application", response_class=JSONResponse)
async def create_call_application(request: CallFormRequest):
    try:
        name = request.name
        phone = request.phone
        call_date = request.call_date

        if CallApplicationBot(name=name, phone=phone, call_date=call_date).send_notification():
            return CallFormResponse(call_status=True).get_template()
        else:
            raise Exception
    except Exception as e:
        return CallFormResponse(call_status=False, error=e).get_template()

