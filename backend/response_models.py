from fastapi import status
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError


class ValidationErrorResponse:

    def __init__(self, exception: RequestValidationError) -> None:
        self.__exception = exception.errors()

    def get_template(self) -> JSONResponse:
        return JSONResponse(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            content={
                'validation_error': True,
                'status': False,
                'msg': self.__parse_exception()
            }
        )

    def __parse_exception(self) -> str:
        parsed_exception = f"Field: {self.__exception[0]['loc'][-1]}; Error: {self.__exception[0]['msg']}"
        return parsed_exception


class CallFormResponse:

    def __init__(self, call_status: bool, error: Exception = None) -> None:
        self.__call_status = call_status
        self.__error = error

    def get_template(self) -> JSONResponse:
        if self.__call_status:
            msg = 'Call was successfully processed and saved!'
            status_code = status.HTTP_200_OK
        else:
            msg = f'Error existed during processing call: {self.__error}'
            status_code = status.HTTP_422_UNPROCESSABLE_ENTITY

        return JSONResponse(
            status_code=status_code,
            content={
                'validation_error': not self.__call_status,
                'status': self.__call_status,
                'msg': msg
            }
        )
