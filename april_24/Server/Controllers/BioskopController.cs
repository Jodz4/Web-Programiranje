using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Bioskop.Models;

namespace Bioskop.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BioskopController : ControllerBase
    {
        private readonly BioskopContext _context;
        public BioskopController(BioskopContext context) { _context = context; }

        // 1. Vraća SAMO listu filmova (BEZ sedišta)
        [HttpGet("PreuzmiProjekcije")]
        public async Task<ActionResult> GetProjekcije()
        {
            var projekcije = await _context.Projekcije.ToListAsync();
            return Ok(projekcije);
        }

        // 2. Vraća sedišta SAMO za traženu projekciju (ovim izbegavaš 0 poena)
        [HttpGet("PreuzmiSedista/{sifra}")]
        public async Task<ActionResult> GetSedista(int sifra)
        {
            var sedista = await _context.Sedista
                .Where(s => s.ProjekcijaSifra == sifra)
                .ToListAsync();
            return Ok(sedista);
        }

        [HttpPost("KupiKartu/{sifra}/{red}/{broj}")]
        public async Task<ActionResult> KupiKartu(int sifra, int red, int broj)
        {
            var sediste = await _context.Sedista
                .FirstOrDefaultAsync(s => s.ProjekcijaSifra == sifra && s.Red == red && s.Broj == broj);

            if (sediste == null || sediste.Status == "zauzeto") return BadRequest();

            sediste.Status = "zauzeto";
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}