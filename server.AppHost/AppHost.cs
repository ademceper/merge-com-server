var builder = DistributedApplication.CreateBuilder(args);

builder.AddProject<Projects.Server_Api>("dotnet-api")
    .WithUrl("/swagger/", "Swagger" );

builder.AddRustApp("actix-service", "../src/services/actix-web")
    .WithHttpEndpoint(port: 8080, env: "PORT")
    .WithUrl("/swagger/","Swagger");

builder.AddGolangApp("go-fiber", "../src/services/go-fiber")
    .WithHttpEndpoint(port: 8081, env: "PORT")
    .WithUrl("/swagger/", "Swagger" );

builder.AddBunApp("nestjs-api", "../src/services/nestjs-api", "src/main.ts")
    .WithHttpEndpoint(port: 3000, env: "PORT")
    .WithUrl("/swagger", "Swagger" );

var realmImportPath = Path.GetFullPath(Path.Combine(builder.AppHostDirectory, "..", "src", "services", "notification", "keycloak"));

var keycloak = builder.AddContainer("keycloak", "quay.io/keycloak/keycloak", "latest")
    .WithHttpEndpoint(port: 8180, targetPort: 8080)
    .WithEnvironment("KC_BOOTSTRAP_ADMIN_USERNAME", "admin")
    .WithEnvironment("KC_BOOTSTRAP_ADMIN_PASSWORD", "admin")
    .WithBindMount(realmImportPath, "/opt/keycloak/data/import", isReadOnly: true)
    .WithArgs("start-dev", "--import-realm");

var redis = builder.AddRedis("redis")
    .WithEndpoint("tcp", e => e.Port = 6379);

var mongo = builder.AddMongoDB("mongodb")
    .WithEndpoint("tcp", e => e.Port = 27017);

builder.AddBunApp("notification", "../src/services/notification", "src/main.ts")
    .WithHttpEndpoint(port: 3010, env: "PORT")
    .WithEnvironment("NODE_ENV", "dev")
    .WithEnvironment("KEYCLOAK_URL", "http://localhost:8180")
    .WithEnvironment("KEYCLOAK_REALM", "notification")
    .WithEnvironment("KEYCLOAK_CLIENT_ID", "notification-api")
    .WithUrl("http://localhost:3010/openapi", "Swagger")
    .WaitFor(keycloak)
    .WaitFor(redis)
    .WaitFor(mongo);

builder.Build().Run();
