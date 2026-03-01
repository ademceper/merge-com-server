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

var redis = builder.AddRedis("redis")
    .WithEndpoint("tcp", e => e.Port = 6379);

var mongo = builder.AddMongoDB("mongodb")
    .WithEndpoint("tcp", e => e.Port = 27017);

builder.AddBunApp("notification", "../src/services/notification", "src/main.ts")
    .WithHttpEndpoint(port: 3001, env: "PORT")
    .WithUrl("/openapi", "Swagger")
    .WaitFor(redis)
    .WaitFor(mongo);

builder.Build().Run();
