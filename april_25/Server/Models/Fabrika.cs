using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace WebApi.Models
{
    public class Fabrika
    {
        [Key]
        public int Id { get; set; }

        public string Naziv { get; set; } = string.Empty;

        public List<Silos> Silosi { get; set; } = new List<Silos>();
    }
}