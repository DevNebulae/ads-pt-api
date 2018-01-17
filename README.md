# ADS Proftaak API

## To run

To install the Node dependencies, please run one of the following commands. The project has been developed with Yarn, so it has personal preference.

```
$ yarn
$ npm i
```

One other caveat is that there is a `settings.yaml` file which has been ignored via the `.gitignore` file. In this file, you specify the following fields:

```yaml
max_api_call_size: <number>mb
port: <number>
postgres:
  host: <string> # This can either be the name of a docker container or an IP address
  database: <string> # The database name in which you store the RS transaction data
  role: <string> # The username which holds the RS transaction data
  password: <string> # Password of the PostgreSQL database user
mongodb:
  host: <string> # IP address or name of the docker container
  database: <string>
  username: <string>
  password: <string>
  port: <number>
```

This file has been excluded in the current repository, because it is a user-specific file. In our use case, we have one defined in the Docker Compose repository.
