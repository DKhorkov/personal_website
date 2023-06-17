FROM python:3
LABEL authors="dkhorkov"

WORKDIR /app

COPY requirements.txt /app
RUN pip install -r requirements.txt

COPY . /app
CMD [ "python", "./src/backend/main.py" ]