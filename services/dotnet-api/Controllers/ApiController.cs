using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("")]
public class ApiController : ControllerBase
{
    [HttpGet("")]
    public IActionResult Index() => Ok(new { message = "Hello from dotnet-api" });

    [HttpGet("health")]
    public IActionResult Health() => Ok("Healthy");

    [HttpGet("alive")]
    public IActionResult Alive() => Ok("Alive");
}
