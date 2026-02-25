var builder = DistributedApplication.CreateBuilder(args);

builder.AddProject<Projects.Server_Api>("dotnet-api")
    .WithUrl("/swagger/", "Swagger" );

builder.AddRustApp("actix-service", "../services/actix-web")
    .WithHttpEndpoint(port: 8080, env: "PORT")
    .WithUrl("/swagger/","Swagger");

builder.AddGolangApp("go-fiber", "../services/go-fiber")
    .WithHttpEndpoint(port: 8081, env: "PORT")
    .WithUrl("/swagger/", "Swagger" );

builder.AddBunApp("nestjs-api", "../services/nestjs-api", "src/main.ts")
    .WithHttpEndpoint(port: 3000, env: "PORT")
    .WithUrl("/swagger", "Swagger" );

builder.Build().Run();
