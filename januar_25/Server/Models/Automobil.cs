using System.ComponentModel.DataAnnotations;

namespace RentACarServer.Models
{
    public class Automobil
    {
        [Key]
        public int ID { get; set; }
        public string Model { get; set; }
        public int KM { get; set; }
        public int Godiste { get; set; }
        public int Sedista { get; set; }
        public double Cena { get; set; }
        public bool Iznajmljen { get; set; }
    }
}