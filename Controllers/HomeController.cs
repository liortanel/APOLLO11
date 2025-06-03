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
    public IActionResult SpaceGame()
    {
        return View();
    }
    public IActionResult Final()
    {
        return View();
    }
    public IActionResult Index()
    {
        return View();
    }
    public IActionResult Mapa()
    {
        if (string.IsNullOrEmpty(HttpContext.Session.GetString("ProximoNivel")))
        {
            HttpContext.Session.SetString("ProximoNivel", "Neptuno");
        }
        return View();
    }
    public IActionResult Luna(){
        return View();
    }
    public IActionResult VerificarLuna()
    {
        var usados = HttpContext.Session.GetString("NivelesUsados")?.Split(',').ToList() ?? new List<string>();
        usados.Add("Luna");
        HttpContext.Session.SetString("NivelesUsados", string.Join(",", usados));
        return View("Mapa");
    }
    public IActionResult Mercurio(){
        return View();
    }
    public IActionResult ValidarMercurio()
    {
        HttpContext.Session.SetString("ProximoNivel", "Venus");
        var usados = HttpContext.Session.GetString("NivelesUsados")?.Split(',').ToList() ?? new List<string>();
        usados.Add("Mercurio");
        HttpContext.Session.SetString("NivelesUsados", string.Join(",", usados));
        return View("Mapa");
    }
    public IActionResult Venus(){
        return View();
    }
    public IActionResult VerificarVenus()
    {
        return RedirectToAction("Luna", "Home");
    }
    public IActionResult Marte(){
        return View();
    }
    public IActionResult VerificarMarte(){
        HttpContext.Session.SetString("ProximoNivel", "Mercurio");
        var usados = HttpContext.Session.GetString("NivelesUsados")?.Split(',').ToList() ?? new List<string>();
        usados.Add("Marte");
        HttpContext.Session.SetString("NivelesUsados", string.Join(",", usados));
        return RedirectToAction("TierraF", "Home");
    }
    public IActionResult TierraF()
    {
        return View();
    }
    public IActionResult Jupiter(){
    var mailEnviado = HttpContext.Session.GetString("MailEnviado");

    if (mailEnviado == "true")
    {
        ViewBag.EnviarMail = false;
    }
    else
    {
        ViewBag.EnviarMail = true;
        HttpContext.Session.SetString("MailEnviado", "true");
    }
        return View();
    }
    public IActionResult VerificarJupiter()
{   
    HttpContext.Session.SetString("ProximoNivel", "Marte");
    var usados = HttpContext.Session.GetString("NivelesUsados")?.Split(',').ToList() ?? new List<string>();
    usados.Add("Jupiter");
    HttpContext.Session.SetString("NivelesUsados", string.Join(",", usados));
    return RedirectToAction("Mapa", "Home");
}
    public IActionResult Saturno(){
        return View();
    }
    public IActionResult VerificarSaturno()
    {
        HttpContext.Session.SetString("ProximoNivel", "Jupiter");
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
        HttpContext.Session.SetString("ProximoNivel", "Saturno");
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
    HttpContext.Session.SetString("ProximoNivel", "Urano");
    HttpContext.Session.SetString("NivelesUsados", "Neptuno");
    return View("Mapa");
    }

public class VictoriaRequest
{
    public bool gano { get; set; }
}

[HttpPost]
public IActionResult GuardarNombre([FromBody] NombreModel model)
{
    HttpContext.Session.SetString("NombreUsuario", model.Nombre);
    return Ok();
}

[HttpPost]
public IActionResult GuardarEmail([FromBody] EmailModel model)
{
    HttpContext.Session.SetString("EmailUsuario", model.Email);
    return Ok();
}
}
