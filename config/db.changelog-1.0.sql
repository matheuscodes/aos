--liquibase formatted sql

--changeset matheus:0-create-schema
CREATE TABLE IF NOT EXISTS tasks (
	id uuid	PRIMARY KEY
);
--rollback DROP TABLE tasks;