using System.ComponentModel.DataAnnotations;

namespace RentACarServer.Models
{
    public class Korisnik
    {
        [Key]
        public int ID { get; set; }
        public string Ime { get; set; }
        public string JMBG { get; set; }
        public string BrojVozacke { get; set; }
    }
}