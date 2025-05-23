using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using APOLLO11.Models;

namespace APOLLO11.Controllers;

public class HomeController : Controller
{
    private readonly ILogger<HomeController> _logger;

    public HomeController(ILogger<HomeController> logger)
    {
        _logger = logger;
    }

    private readonly List<string> planetas = new List<string>
        {
            "Mercurio", "Venus", "Marte", "Jupiter", "Saturno", "Urano", "Neptuno"
        };
    public IActionResult Index()
    {
        return View();
    }
    public IActionResult Mapa()
    {
        if (string.IsNullOrEmpty(HttpContext.Session.GetString("NivelesCompletados")))
        {
            HttpContext.Session.SetString("NivelesCompletados", "Neptuno");
        }
        return View();
    }
    public IActionResult Mercurio() => View("Home", "Mercurio");
    public IActionResult Venus() => View("Home", "Venus");
    public IActionResult Marte() => View("Home", "Marte");
    public IActionResult Jupiter() => View("Home", "Jupiter");
    public IActionResult Saturno() => View("Home", "Saturno");
    public IActionResult Urano(){
        return View();
    }
    public IActionResult Neptuno(){
        return View();
    }
    [HttpPost]
    public IActionResult GanarNeptuno()
    {
    HttpContext.Session.SetString("NivelesCompletados", "Urano");
    HttpContext.Session.SetString("NivelesUsados", "Neptuno");
    return View("Mapa");
    }


public class VictoriaRequest
{
    public bool gano { get; set; }
}
}
