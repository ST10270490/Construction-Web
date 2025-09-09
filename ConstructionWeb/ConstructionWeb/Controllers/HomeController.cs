using ConstructionWeb.Models;
using Microsoft.AspNetCore.Builder.Extensions;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;






namespace ConstructionWeb.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            
            return View();
        }
        [HttpPost]
public async Task<ActionResult> VerifyToken([FromBody] TokenRequest request)
        {
            var firebaseApp = FirebaseApp.Create(new AppOptions()
            {
                Credential = GoogleCredential.FromFile("path/to/your/serviceAccountKey.json")
            });

            var auth = FirebaseAuth.GetAuth(firebaseApp);
            var decodedToken = await auth.VerifyIdTokenAsync(request.Token);
            string uid = decodedToken.Uid;

            // Now you can use the UID in your backend logic
            return Json(new { userId = uid });
        }

        public class TokenRequest
        {
            public string Token { get; set; }
        }
        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
