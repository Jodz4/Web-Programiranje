using System.ComponentModel.DataAnnotations;

namespace Biblioteka.Models;

public class Biblioteka
{
    public int ID { get; set; }
    public required string ImeBiblioteke { get; set; }
    public required string Adresa { get; set; }
    public required string Email { get; set; }

    public List<Knjiga>? Knjige { get; set; }

    public List<IzdavanjeKnjige>? IzdateKnjige { get; set; }
}
