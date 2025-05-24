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

    public IActionResult Saturno(){
        return View();
    }
    public IActionResult VerificarSaturno()
    {
        HttpContext.Session.SetString("NivelesCompletados", "Jupiter");
        var usados = HttpContext.Session.GetString("NivelesUsados")?.Split(',').ToList() ?? new List<string>();
        usados.Add("Saturno");
        HttpContext.Session.SetString("NivelesUsados", string.Join(",", usados));
        return View("Mapa");
    }
    
    public IActionResult Urano(){
    return View();
    }
    public IActionResult VerificarUrano(string respuesta){
    if (!string.IsNullOrEmpty(respuesta) && respuesta.ToUpper() == "APOLLO11")
    {
        HttpContext.Session.SetString("NivelesCompletados", "Saturno");
        var usados = HttpContext.Session.GetString("NivelesUsados")?.Split(',').ToList() ?? new List<string>();
        usados.Add("Urano");
        HttpContext.Session.SetString("NivelesUsados", string.Join(",", usados));
    }
    return View("Mapa");
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
