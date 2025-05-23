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
        public IActionResult CompletarPlaneta(string planetName)
        {
            var nivelesStr = HttpContext.Session.GetString("NivelesCompletados") ?? "";
            var niveles = nivelesStr.Split(',').ToList();

            if (!niveles.Contains(planetName) && planetas.Contains(planetName))
            {
                niveles.Add(planetName);
                // Ordenar según la lista original para evitar desorden
                niveles = planetas.Where(p => niveles.Contains(p)).ToList();

                HttpContext.Session.SetString("NivelesCompletados", string.Join(",", niveles));
            }

            // Redirigir al mapa
            return RedirectToAction("Mapa");
        }
        [HttpPost]
[ValidateAntiForgeryToken]
public IActionResult RegistrarVictoriaNeptuno([FromBody] VictoriaRequest request)
{
    if(request == null || !request.gano)
        return Json(new { success = false });

    // Guardar en sesión que desbloqueaste Urano
    HttpContext.Session.SetInt32("NivelMaximo", 7);
    

    return Json(new { success = true });
}

public class VictoriaRequest
{
    public bool gano { get; set; }
}
}
