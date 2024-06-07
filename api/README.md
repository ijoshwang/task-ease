### Backend Setup

Create a `.env` file in the api directory and add the following:

```
MONGODB_CONNECTION_STRING=
MONGODB_DATABASE_NAME==
JWT_KEY=
JWT_ISSUER=
JWT_AUDIENCE=
```

```
dotnet restore
dotnet build
dotnet watch run
```

API documentation can be accessed at https://localhost:5008/swagger
