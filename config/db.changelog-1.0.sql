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

--changeset matheus:5-adding-postpone-column
	ALTER TABLE tasks
		ADD COLUMN remind_at TIMESTAMP;

--changeset matheus:6-adding-test-data
INSERT INTO tasks (id, due_date, resolved_at, title, description, priority, status, remind_at)
VALUES
 ('269ae666-e6ed-4641-a628-2695a317588a', '2018-12-10 01:00:00', null, 'Review code', null, 'normal', 'open', null),
 ('2fdd228d-f441-4c57-a852-9555768edd4a', '2018-12-11 01:00:00', null, 'Run code', 'Postponed already yesterday', 'important', 'postponed', '2018-12-09 01:00:00'),
 ('2ecadfa5-2f6a-4c4f-af72-04b000eb8874', '2018-12-12 01:00:00', null, 'Give feedback', null, 'normal', 'open', null),
 ('aea06681-dac0-4870-a3f9-1618e529cac7', '2018-12-13 01:00:00', '2018-12-10 01:00:00', 'Forward data', null, 'trivial', 'done', null),
 ('de84dba6-8b07-4c1c-bd5d-0d022eaf79ce', '2018-12-21 01:00:00', null, 'Schedule meeting', 'Postponed till friday', 'critical', 'postponed', '2018-12-14 01:00:00'),
 ('171d1172-8273-4f70-9955-9bf83c73a289', '2018-12-14 01:00:00', null, 'Go home', null, 'trivial', 'open', null),
 ('1da97c49-e9e6-4aa1-9417-95a5a54a6a54', null, null, 'Rest', null, 'important', 'open', null);
