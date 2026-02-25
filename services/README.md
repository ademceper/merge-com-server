Services folder with three example microservices:

- dotnet-api: Minimal .NET 10 Web API (Minimal APIs)
- actix-web: Rust Actix Web example
- go-fiber: Go Fiber example

Run each service:

- dotnet-api:
  dotnet run --project services/dotnet-api/Server.Api.csproj

- actix-web:
  cargo run --manifest-path services/actix-web/Cargo.toml

- go-fiber:
  cd services/go-fiber && go run main.go

