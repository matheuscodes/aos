--liquibase formatted sql

--changeset matheus:0-create-schema
CREATE TABLE IF NOT EXISTS tasks (
	id uuid	PRIMARY KEY
);
--rollback DROP TABLE tasks;

--changeset matheus:1-creating-types
CREATE TYPE status_type AS ENUM ('open', 'postponed', 'done');
CREATE TYPE priority_type AS ENUM ('trivial', 'normal', 'important', 'critical');
--rollback DROP TYPE status_type, priority_type

--changeset matheus:2-altering-schema
ALTER TABLE tasks
	ADD createdAt TIMESTAMP,
	ADD updatedAt TIMESTAMP,
	ADD dueDate TIMESTAMP,
	ADD resolvedAt TIMESTAMP,
	ADD title VARCHAR(70),
	ADD description VARCHAR(140),
	ADD priority priority_type,
	ADD status status_type;
	
--changeset matheus:3-fixing-naming-hibernate
ALTER TABLE tasks
	RENAME COLUMN createdAt TO created_at;
ALTER TABLE tasks
	RENAME COLUMN updatedAt TO updated_at;
ALTER TABLE tasks
	RENAME COLUMN dueDate TO due_date;
ALTER TABLE tasks
	RENAME COLUMN resolvedAt TO resolved_at;

	
--changeset matheus:4-setting-mandatory-defaults
ALTER TABLE tasks
	ALTER COLUMN priority SET NOT NULL;
ALTER TABLE tasks
	ALTER COLUMN status SET NOT NULL;
ALTER TABLE tasks
	ALTER COLUMN created_at SET DEFAULT now();	
ALTER TABLE tasks
	ALTER COLUMN updated_at SET DEFAULT now();