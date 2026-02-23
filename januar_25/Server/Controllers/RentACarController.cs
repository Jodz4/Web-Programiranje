using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RentACarServer.Models;

namespace RentACarServer.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RentACarController : ControllerBase
    {
        private readonly RentContext _context;

        public RentACarController(RentContext context)
        {
            _context = context;
        }

        [HttpGet("VratiSve")]
        public async Task<ActionResult> VratiSve()
        {
            return Ok(await _context.Automobili.ToListAsync());
        }

        [HttpGet("Filtriraj")]
        public async Task<ActionResult> Filtriraj(int? km, int? sedista, double? cena, string? model)
        {
            var query = _context.Automobili.AsQueryable();

            if (km.HasValue) query = query.Where(x => x.KM <= km);
            if (sedista.HasValue) query = query.Where(x => x.Sedista == sedista);
            if (cena.HasValue) query = query.Where(x => x.Cena <= cena);
            if (!string.IsNullOrEmpty(model) && model != "Svi") query = query.Where(x => x.Model == model);

            return Ok(await query.ToListAsync());
        }

        [HttpPost("Iznajmi/{id}")]
        public async Task<ActionResult> Iznajmi(int id, [FromBody] KorisnikPodaci podaci)
        {
            var auto = await _context.Automobili.FindAsync(id);
            if (auto == null || auto.Iznajmljen) return BadRequest("Auto nije dostupan.");

            // Čuvanje novog korisnika u bazu (evidencija)
            var noviKorisnik = new Korisnik {
                Ime = podaci.Ime,
                JMBG = podaci.JMBG,
                BrojVozacke = podaci.BrojVozacke
            };
            _context.Korisnici.Add(noviKorisnik);

            // Update statusa automobila
            auto.Iznajmljen = true;

            await _context.SaveChangesAsync();
            return Ok();
        }
    }

    public class KorisnikPodaci {
        public string Ime { get; set; }
        public string JMBG { get; set; }
        public string BrojVozacke { get; set; }
        public int BrDana { get; set; }
    }
}