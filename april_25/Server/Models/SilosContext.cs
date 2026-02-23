using Microsoft.EntityFrameworkCore;
using WebApi.Models;

namespace WebApi.Models
{
    public class SilosContext : DbContext
    {
        public DbSet<Fabrika> Fabrike { get; set; }
        public DbSet<Silos> Silosi { get; set; }

        public SilosContext(DbContextOptions options) : base(options) { }
    }
}