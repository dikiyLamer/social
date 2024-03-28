CREATE USER social WITH PASSWORD 'social' CREATEDB;
CREATE DATABASE social
    WITH
    OWNER = social
    ENCODING = 'UTF8'
    LC_COLLATE = 'en_US.utf8'
    LC_CTYPE = 'en_US.utf8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;