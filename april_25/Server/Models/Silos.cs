using System.Text.Json.Serialization; // Ovo rešava grešku za [JsonIgnore]

namespace WebApi.Models
{
    public class Silos
    {
        public int Id { get; set; }
        public string Oznaka { get; set; }
        public int Kapacitet { get; set; }
        public int TrenutnaKolicina { get; set; }

        [JsonIgnore] 
        public virtual Fabrika Fabrika { get; set; } // 'virtual' pomaže bazi, a [JsonIgnore] sprečava petlju
    }
}