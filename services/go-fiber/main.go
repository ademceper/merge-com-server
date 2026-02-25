package main

import (
	"log"
	"os"

	_ "github.com/example/go-fiber-service/docs"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/swagger"
)

// @title Go Fiber API
// @version 1.0.0
// @host localhost:8081
// @BasePath /

// @Summary Hello
// @Router / [get]
// @Success 200 {object} map[string]string
func handleIndex(c *fiber.Ctx) error {
	return c.JSON(fiber.Map{"message": "Hello from go-fiber"})
}

// @Summary Health check
// @Router /health [get]
// @Success 200 {string} string
func handleHealth(c *fiber.Ctx) error {
	return c.SendString("Healthy")
}

// @Summary Alive check
// @Router /alive [get]
// @Success 200 {string} string
func handleAlive(c *fiber.Ctx) error {
	return c.SendString("Alive")
}

func main() {
	app := fiber.New()

	app.Get("/", handleIndex)
	app.Get("/health", handleHealth)
	app.Get("/alive", handleAlive)
	app.Get("/swagger/*", swagger.HandlerDefault)

	if endpoint := os.Getenv("OTEL_EXPORTER_OTLP_ENDPOINT"); endpoint != "" {
		log.Printf("OTEL_EXPORTER_OTLP_ENDPOINT=%s", endpoint)
	} else {
		log.Println("OTEL_EXPORTER_OTLP_ENDPOINT not set")
	}

	port := os.Getenv("PORT")
	if port == "" {
		port = "8081"
	}
	log.Printf("Starting go-fiber on :%s", port)
	app.Listen(":" + port)
}
