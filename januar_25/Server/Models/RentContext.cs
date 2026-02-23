using Microsoft.EntityFrameworkCore;

namespace RentACarServer.Models
{
    public class RentContext : DbContext
    {
        public DbSet<Automobil> Automobili { get; set; }
        public DbSet<Korisnik> Korisnici { get; set; }

        public RentContext(DbContextOptions<RentContext> options) : base(options) { }
    }
}