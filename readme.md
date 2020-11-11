# Express Auth Boilerplate

*create a node app
*.gitignore
install and set up express

--
## How to set up:
1. fork and clone
```
2. Install dependencies
```
npm i 
```
3. Create a `config.json` with the following code:
```json
{
  "development": {
    "database": "express_auth_dev",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "database": "express_auth_test",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "database": "<insert db name here>",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
}

**Note** If your database requires a username and password, you will need to include these fields as we;;