using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Bioskop.Models
{
    public class Projekcija
    {
        [Key]
        public int Sifra { get; set; }
        public string Naziv { get; set; }
        public string Vreme { get; set; }
        public int Sala { get; set; }
        public double OsnovnaCena { get; set; }
        public List<Sediste> Sedista { get; set; } = new List<Sediste>(); // Inicijalizacija
    }

    public class Sediste
    {
        [Key]
        public int ID { get; set; }
        public int Red { get; set; }
        public int Broj { get; set; }
        public string Status { get; set; } 
        public int ProjekcijaSifra { get; set; }
    }

    public class BioskopContext : DbContext
    {
        public BioskopContext(DbContextOptions<BioskopContext> options) : base(options) { }

        public DbSet<Projekcija> Projekcije { get; set; }
        public DbSet<Sediste> Sedista { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            var projekcije = new List<Projekcija>
            {
                new Projekcija { Sifra = 454, Naziv = "Openhajmer", Vreme = "29.1.2024. 22:30", Sala = 1, OsnovnaCena = 500 },
                new Projekcija { Sifra = 455, Naziv = "Dina: Drugi deo", Vreme = "30.1.2024. 20:00", Sala = 2, OsnovnaCena = 450 },
                new Projekcija { Sifra = 456, Naziv = "Jadnici", Vreme = "31.1.2024. 18:00", Sala = 3, OsnovnaCena = 400 }
            };

            modelBuilder.Entity<Projekcija>().HasData(projekcije);

            var sedista = new List<Sediste>();
            int idCounter = 1;
            foreach (var p in projekcije)
            {
                for (int r = 1; r <= 4; r++)
                {
                    for (int s = 1; s <= 5; s++)
                    {
                        sedista.Add(new Sediste { 
                            ID = idCounter++, 
                            Red = r, 
                            Broj = s, 
                            Status = "slobodno", 
                            ProjekcijaSifra = p.Sifra 
                        });
                    }
                }
            }
            modelBuilder.Entity<Sediste>().HasData(sedista);
        }
    }
}