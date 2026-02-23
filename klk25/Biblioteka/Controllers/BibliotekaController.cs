using Biblioteka.Models;
using Microsoft.Extensions.ObjectPool;
namespace Biblioteka.Controllers;

[ApiController]
[Route("[controller]")]
public class BibliotekaController : ControllerBase
{
    public BibliotekaContext Context { get; set; }

    public BibliotekaController(BibliotekaContext context)
    {
        Context = context;
    }

    [HttpGet("PreuzmiBiblioteke")]
    public async Task<IActionResult> PreuzmiBiblioteke()
    {
        var biblioteke = await Context.Biblioteke.ToListAsync();
        return Ok(biblioteke);
    }

    [HttpPost("DodavanjeKnjige/{idBiblioteke}")]
    public async Task<IActionResult> DodavanjeKnjige([FromBody] Knjiga knjiga, int idBiblioteke)
    {
        var bib = Context.Biblioteke.FirstOrDefault(x => x.ID == idBiblioteke);
        if (bib == null)
            return BadRequest("Ne postoji biblioteka");
        knjiga.Biblioteka = bib;
        await Context.Knjige.AddAsync(knjiga);
        await Context.SaveChangesAsync();
        return Ok(knjiga);
    }



    [HttpPut("IzdavanjeVracanjeKnjige/{idBiblioteke}/{idKnjige}")]
    public async Task<IActionResult> IzdavanjeVracanjeKnjige(int idBiblioteke, int idKnjige)
    {
        var knjiga = await Context.Knjige.Where(x=>x.ID==idKnjige).FirstOrDefaultAsync();

        if (knjiga == null)
        {
            return BadRequest("Ne postoji knjiga sa unetim ID brojem");
        }
        var bib = await Context.Biblioteke.Where(x=>x.ID==idBiblioteke).FirstOrDefaultAsync();

        if (bib == null)
        {
            return BadRequest("Ne postoji biblioteka sa unetim ID brojem");
        }
        var izdavanje = await Context.IzdavanjeKnjige
            .Where(x => x.Knjiga.ID == idKnjige
            && x.Biblioteka.ID==idBiblioteke
            && x.DatumVracanja == null).FirstOrDefaultAsync();

        if (izdavanje == null)
        {
            izdavanje = new IzdavanjeKnjige()
            {
                Biblioteka=bib,
                Knjiga = knjiga,
                DatumIzdavanja = DateTime.Now
            };
            Context.IzdavanjeKnjige.Add(izdavanje);
        }
        else
        {
            izdavanje.DatumVracanja = DateTime.Now;
            Context.IzdavanjeKnjige.Update(izdavanje);
        }
        await Context.SaveChangesAsync();

        return Ok(new
            {
                izdavanje.ID,
                izdavanje.DatumIzdavanja,
                izdavanje.DatumVracanja
            });
    }


    [HttpGet("PronadjiKnjigePoKriterijumu/{idBiblioteke}/{pretraga}")]
    public async Task<IActionResult> PronadjiKnjigePoKriterijumu(int idBiblioteke, string pretraga)
    {
        var knjige = await Context.Knjige.Include(x => x.Biblioteka)
        .Where(x => x.Biblioteka.ID == idBiblioteke
        && (x.Autor.Contains(pretraga)
        || x.Naslov.Contains(pretraga))) 
            .ToListAsync();

            var izdateKnjuge = await Context.IzdavanjeKnjige
            .Include(x => x.Knjiga)
            .Where(x => x.Biblioteka.ID == idBiblioteke
                && (x.Knjiga.Autor.Contains(pretraga)
                || x.Knjiga.Naslov.Contains(pretraga))
                && x.DatumVracanja == null)
                .Select(x=>x.Knjiga.ID)
                .ToListAsync();

        
        return Ok(knjige
         .Select(x => new
                {
                    x.ID,
                    x.Naslov,
                    x.Autor,
                    Izdata=izdateKnjuge.Contains(x.ID)
                }));
    }

    [HttpGet("Najcitanija/{idBiblioteke}")]
    public async Task<IActionResult> Najcitanija(int idBiblioteke)
    {
        var listeKnjiga = Context.IzdavanjeKnjige
        .Include(x => x.Biblioteka)
        .Include(x => x.Knjiga)
        .Where(x => x.Biblioteka.ID == idBiblioteke)
        .Select(x => new
        {
            KnjigaId = (x==null || x.Knjiga==null)? -1 : x.Knjiga.ID,
            ID = x==null? -1: x.ID
        })
        .ToList();
        if (listeKnjiga.Count() == 0)
        {
            return Ok("");
        } 
        var knjigaID=listeKnjiga
        .GroupBy(x => x.KnjigaId)
        .ToDictionary(x => x.Key, x => x.Count())
        .OrderByDescending(x=>x.Value);
        //   
        if (knjigaID == null)
            return BadRequest("Nema najcitanije knjige");
        var knjiga = Context.Knjige.Find(knjigaID.FirstOrDefault().Key);

        return Ok(knjiga.Naslov + "-" + knjiga.Autor); 
    }
    
    [HttpGet("PronadjiIzdavanje/{idKnjiga}")]
    public async Task<IActionResult> PronadjiIzdavanje(int idKnjiga)
    {
        var izdavanja = await Context.IzdavanjeKnjige.Include(x => x.Knjiga)
        .Where(x => x.Knjiga.ID == idKnjiga
        && x.DatumVracanja == null).FirstOrDefaultAsync();
        if (izdavanja != null)
            return Ok(new
            {
                izdavanja.ID,
                izdavanja.DatumIzdavanja.Date,
                izdavanja.DatumVracanja
            });
        else
            return Ok(new
            { 
                id =-1
            });

    }

   
}
