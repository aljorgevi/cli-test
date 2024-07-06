# Trac loading CLI

This is a CLI for loading data into the Trac database.

## Commands

| Command            | Description                            |
| ------------------ | -------------------------------------- |
| `npm install`      | Install the CLI dependencies.          |
| `npm docker:build` | create an image with trac-loading name |
| `npm docker:start` | run the image in it mode               |
| `npm run build`    | Build the CLI for production.          |

## other docker commands

| Command                          | Description                                          |
| -------------------------------- | ---------------------------------------------------- |
| `docker run -it <image>`         | create new container from image container & run cli. |
| `docker start -a -i <container>` | re-start a container                                 |
| `npm test`                       | Run the test suite.                                  |
| `npm run build`                  | Build the CLI for production.                        |
