using System.Reflection.PortableExecutable;

namespace Biblioteka.Models;

public static class DbInitializer
{
    public static void Seed(BibliotekaContext context)
    {
        var biblioteka1 = new Biblioteka()
        {
            ImeBiblioteke = "Narodna bibilioteka Stevan Sremac",
            Adresa = "Borivoja Gojkovića 9, 18000 Niš",
            Email ="biblioteka@nbss.rs"
        };

        var biblioteka2 = new Biblioteka()
        {
            ImeBiblioteke = "Univerzitetska biblioteka Nikola Tesla",
            Adresa = "Kej Mike Paligorića 2, 18000 Niš",
            Email ="info-ubn@ni.ac.rs"
        };

        context.Biblioteke.Add(biblioteka1);
        context.Biblioteke.Add(biblioteka2);

        var pDeco = new Knjiga()
        {
            Naslov = "Poštovana deco",
            Autor = "Dušan Radović",
            Izdavac = "Laguna",
            GodinaIzdavanja = 2019,
            BrojUEvidenciji = "111",
            Biblioteka=biblioteka1
        };

       var bRibarIRibica = new Knjiga()
        {
            Naslov = "Bajka o ribaru i ribici",
            Autor = "A. S. Puškin",
            Izdavac = "Kreativni centar",
            GodinaIzdavanja = 2013,
            BrojUEvidenciji = "112",
            Biblioteka=biblioteka1
        };
         var aBajke = new Knjiga()
        {
            Naslov = "Andersenove bajke",
            Autor = "H. K. Andersen",
            Izdavac = "Only Smiley",
            GodinaIzdavanja = 2005,
            BrojUEvidenciji = "113",
            Biblioteka=biblioteka1
        };
        var pesme = new Knjiga()
        {
            Naslov = "Izabrane pesme",
            Autor = "Dobrica Erić",
            Izdavac = "Srpska književna zadruga",
            GodinaIzdavanja = 2001,
            BrojUEvidenciji = "114",
            Biblioteka=biblioteka1
        };

        context.Knjige.Add(pDeco);
        context.Knjige.Add(aBajke);
        context.Knjige.Add(bRibarIRibica);
        context.Knjige.Add(pesme);

        context.IzdavanjeKnjige.Add(new IzdavanjeKnjige()
        {
            Biblioteka = biblioteka1,
            Knjiga = pDeco,
            DatumIzdavanja = DateTime.Now.AddDays(-34),
            DatumVracanja = DateTime.Now
        });

        context.IzdavanjeKnjige.Add(new IzdavanjeKnjige()
        {
            Biblioteka = biblioteka1,
            Knjiga = pDeco,
            DatumIzdavanja = DateTime.Now.AddDays(-4)
        });



        context.SaveChanges();
    }
}
