# Readme

## Instructions to run backend
- Run `docker-compose up postgres`
- When DB server is up, adjust IPs accordingly on `config/application.properties`
  - *Hindsight:* should have set this to an environment variable
- Run `docker-compose up api`

## Instructions to run frontend
Choose one of the following:
- Adjust the API Url on `src/app/src/app/task.service.ts`
- Run `docker-compose up app`
  - Note for windows: currently docker container stops right after first compile.
- Run `cd src/app && npm run full-start`
  - Conditions here is to have Node.js & NPM installed with permissions to global install.
- Run `cd src/app && npm install && npm run start`