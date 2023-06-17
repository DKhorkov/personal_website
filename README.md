# "Khorkov Dmitriy Personal Website"

This is src of my personal webpage with info about me and
my projects. Also, there are my contact information and form to
create an application for call at time, which is convenient for you.

### LOCAL RUN:

Before local run you should create a
<b><i>call_application_bot_configs.py</i></b> file in
<b><i>src/backend</i></b> directory and put two variables
into it:<br>

1. <b><i>TOKEN=[your telegram bot token]</i></b>
2. <b><i>CHAT_ID=[your chat id with bot, from which notifications
   will be received]</i></b>

There are two ways to run this application locally: run docker
container or run source file main.py.

To run project via docker do next steps:<br>

1. Install docker: https://docs.docker.com/engine/install/
2. In CMD in directory of project run next commands:<br>
   <i><b>sudo docker build . -t [name of image]></b></i><br>
   <i><b>sudo docker run [name of image]></b></i>

To run project using source files do next steps:<br>

1. In CMD in directory of project run next command:<br>
   <i><b>python src/backend/main.py</b></i><br>

### PROJECT STRUCTURE:

    backend/             backend files to run server
    frontend/            HTML, CSS, JS, Images, Fonts

### REQUIREMENTS:

    pip install -r /path/to/requirements.txt
