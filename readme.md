SETUP:
    In backend map:
        1. Create .env - file
        2. Insert into .env:
            PGURI=postgres://postgres:supersecretpassword@host.docker.internal:5432/postgresdb
            JWT_SECRET=5528e3c76252bf69614cf5090ad62dd441841c57e291cc1da61ce0303cc60e1b

START:
    In frialansen map:
        1. open terminal
        2. docker-compose up --build

WEBPAGE:
    existing testuser:
        Tomas@mail.com
        password