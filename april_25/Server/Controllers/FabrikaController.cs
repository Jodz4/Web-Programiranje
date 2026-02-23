using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApi.Models;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FabrikaController : ControllerBase
    {
        public SilosContext Context { get; set; }

        public FabrikaController(SilosContext context)
        {
            Context = context;
        }

        [HttpGet]
        [Route("VratiSve")]
        public async Task<ActionResult> VratiSve()
        {
            // Include silosi da bi se povukla i lista silosa uz fabriku
            var fabrike = await Context.Fabrike
                .Include(f => f.Silosi)
                .ToListAsync();

            return Ok(fabrike);
        }

        [HttpPut]
        [Route("Sipaj/{silosId}/{kolicina}")]
        public async Task<ActionResult> Sipaj(int silosId, int kolicina)
        {
            var silos = await Context.Silosi.FindAsync(silosId);

            if (silos == null)
                return BadRequest("Silos ne postoji!");

            if (silos.TrenutnaKolicina + kolicina > silos.Kapacitet)
                return BadRequest("Prekoračen kapacitet silosa!");

            silos.TrenutnaKolicina += kolicina;
            await Context.SaveChangesAsync();

            return Ok(silos.TrenutnaKolicina);
        }
    }
}