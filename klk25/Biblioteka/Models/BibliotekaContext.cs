namespace Biblioteka.Models;

public class BibliotekaContext : DbContext
{
    public DbSet<Biblioteka> Biblioteke { get; set; }
    public DbSet<Knjiga> Knjige { get; set; }
    public DbSet<IzdavanjeKnjige> IzdavanjeKnjige { get; set; }

    public BibliotekaContext(DbContextOptions options) : base(options)
    {
        
    }
}
