using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace SkladisteApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class KolokvijumController : ControllerBase
    {
        // Simulacija baze podataka u memoriji
        private static List<SkladisteModel> _skladista = new List<SkladisteModel>
        {
            new SkladisteModel { 
                Id = 0, 
                MaxKapacitet = 15, 
                Elementi = new List<ElementModel> { 
                    new ElementModel { Id = 1, Velicina = 1 }, 
                    new ElementModel { Id = 2, Velicina = 3 },
                    new ElementModel { Id = 3, Velicina = 2 },
                    new ElementModel { Id = 4, Velicina = 4 },
                    new ElementModel { Id = 5, Velicina = 1 }
                } 
            },
            new SkladisteModel { 
                Id = 1, 
                MaxKapacitet = 10, 
                Elementi = new List<ElementModel> { 
                    new ElementModel { Id = 6, Velicina = 1 }, 
                    new ElementModel { Id = 7, Velicina = 1 },
                    new ElementModel { Id = 8, Velicina = 3 },
                    new ElementModel { Id = 9, Velicina = 1 }
                } 
            },
            new SkladisteModel { 
                Id = 2, 
                MaxKapacitet = 12, 
                Elementi = new List<ElementModel> { 
                    new ElementModel { Id = 10, Velicina = 1 }, 
                    new ElementModel { Id = 11, Velicina = 3 },
                    new ElementModel { Id = 12, Velicina = 5 }
                } 
            }
        };

        // GET: Kolokvijum/PreuzmiSkladista
        [HttpGet]
        [Route("PreuzmiSkladista")]
        public ActionResult PreuzmiSkladista()
        {
            return Ok(_skladista);
        }

        // POST: Kolokvijum/DodajElement/{polje}/{velicina}
        [HttpPost]
        [Route("DodajElement/{polje}/{velicina}")]
        public ActionResult DodajElement(int polje, int velicina)
        {
            var skladiste = _skladista.FirstOrDefault(s => s.Id == polje);
            if (skladiste == null) return NotFound("Skladište ne postoji.");

            // Provera kapaciteta na serveru
            int trenutnaSuma = skladiste.Elementi.Sum(e => e.Velicina);
            if (trenutnaSuma + velicina > skladiste.MaxKapacitet)
            {
                return BadRequest("Nema dovoljno mesta.");
            }

            // Generisanje novog ID-a (najveći + 1)
            int noviId = _skladista.SelectMany(s => s.Elementi).Max(e => (int?)e.Id) ?? 0;
            var noviElement = new ElementModel { Id = noviId + 1, Velicina = velicina };
            
            skladiste.Elementi.Add(noviElement);
            return Ok(noviElement);
        }

        // DELETE: Kolokvijum/ObrisiElement/{idPolja}/{idElementa}
        [HttpDelete]
        [Route("ObrisiElement/{idPolja}/{idElementa}")]
        public ActionResult ObrisiElement(int idPolja, int idElementa)
        {
            var skladiste = _skladista.FirstOrDefault(s => s.Id == idPolja);
            if (skladiste == null) return NotFound("Skladište ne postoji.");

            var element = skladiste.Elementi.FirstOrDefault(e => e.Id == idElementa);
            if (element == null) return NotFound("Element ne postoji.");

            skladiste.Elementi.Remove(element);
            return Ok();
        }
    }

    // Pomoćni modeli
    public class SkladisteModel {
        public int Id { get; set; }
        public int MaxKapacitet { get; set; }
        public List<ElementModel> Elementi { get; set; }
    }

    public class ElementModel {
        public int Id { get; set; }
        public int Velicina { get; set; }
    }
}