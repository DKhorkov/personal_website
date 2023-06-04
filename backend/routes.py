from fastapi import APIRouter, Request
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse, JSONResponse

from backend.request_models import CallFormRequest


main_router = APIRouter()
templates = Jinja2Templates(directory="frontend/templates")


@main_router.get("/", response_class=HTMLResponse)
async def read_item(request: Request):
    return templates.TemplateResponse(name="index.html", context={"request": request})


@main_router.post("/create_call_application", response_class=JSONResponse)
async def create_call_application(request: CallFormRequest):
    try:
        name = request.name
        phone = request.phone
        call_date = request.call_date
        return {'status': True, 'msg': 'Call was successfully processed and saved!'}
    except Exception as e:
        return {'status': False, 'msg': f'Error existed during processing call: {e}'}

