use actix_web::{get, App, HttpServer, Responder, HttpResponse};
use std::env;
use utoipa::OpenApi;
use utoipa_swagger_ui::SwaggerUi;

#[utoipa::path(
    get,
    path = "/",
    responses((status = 200, description = "Hello message", body = String))
)]
#[get("/")]
async fn index() -> impl Responder {
    HttpResponse::Ok().body("Hello from actix-web")
}

#[utoipa::path(
    get,
    path = "/health",
    responses((status = 200, description = "Health check", body = String))
)]
#[get("/health")]
async fn health() -> impl Responder {
    HttpResponse::Ok().body("Healthy")
}

#[utoipa::path(
    get,
    path = "/alive",
    responses((status = 200, description = "Alive check", body = String))
)]
#[get("/alive")]
async fn alive() -> impl Responder {
    HttpResponse::Ok().body("Alive")
}

#[derive(OpenApi)]
#[openapi(
    paths(index, health, alive),
    info(title = "Actix Web API", version = "1.0.0")
)]
struct ApiDoc;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let filter = tracing_subscriber::EnvFilter::try_from_default_env()
        .unwrap_or_else(|_| tracing_subscriber::EnvFilter::new("info"));
    tracing_subscriber::fmt().with_env_filter(filter).init();

    if let Ok(endpoint) = env::var("OTEL_EXPORTER_OTLP_ENDPOINT") {
        tracing::info!(otel_endpoint = %endpoint, "OTEL exporter configured");
    } else {
        tracing::info!("OTEL_EXPORTER_OTLP_ENDPOINT not set");
    }

    let port: u16 = env::var("PORT")
        .unwrap_or_else(|_| "8080".to_string())
        .parse()
        .unwrap_or(8080);

    tracing::info!("Starting actix-web on 0.0.0.0:{}", port);
    HttpServer::new(|| {
        App::new()
            .service(
                SwaggerUi::new("/swagger/{_:.*}")
                    .url("/api-docs/openapi.json", ApiDoc::openapi()),
            )
            .service(index)
            .service(health)
            .service(alive)
    })
    .bind(("0.0.0.0", port))?
    .run()
    .await
}
