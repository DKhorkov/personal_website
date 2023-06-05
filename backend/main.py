import uvicorn

from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from socket import getfqdn

from backend.routes import main_router
from backend.response_models import ValidationErrorResponse

app = FastAPI()
app.include_router(main_router)
app.mount("/static", StaticFiles(directory="frontend/static"), name="static")
app.mount("/images", StaticFiles(directory="frontend/images"), name="images")
app.mount("/scripts", StaticFiles(directory="frontend/scripts"), name="scripts")
app.mount("/fonts", StaticFiles(directory="frontend/fonts"), name="fonts")


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request, exc) -> JSONResponse:
    return ValidationErrorResponse(exc).get_template()


if __name__ == '__main__':
    uvicorn.run(
        'main:app',
        host=getfqdn(),
        port=8090
    )
