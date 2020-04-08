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

# App

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.21.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
