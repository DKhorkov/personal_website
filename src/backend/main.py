import uvicorn

from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from socket import gethostname, gethostbyname

from routes import main_router
from response_models import ValidationErrorResponse

app = FastAPI()
app.include_router(main_router)
app.mount("/static", StaticFiles(directory="src/frontend/static"), name="static")
app.mount("/images", StaticFiles(directory="src/frontend/images"), name="images")
app.mount("/scripts", StaticFiles(directory="src/frontend/scripts"), name="scripts")
app.mount("/fonts", StaticFiles(directory="src/frontend/fonts"), name="fonts")


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request, exc) -> JSONResponse:
    return ValidationErrorResponse(exc).get_template()


if __name__ == '__main__':
    uvicorn.run(
        'main:app',
        host=gethostbyname(gethostname()),
        port=8090
    )
