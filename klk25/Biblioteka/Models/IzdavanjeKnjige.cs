namespace Biblioteka.Models;

public class IzdavanjeKnjige
{
    public int ID { get; set; }
    public required Knjiga Knjiga { get; set; }
    public required Biblioteka Biblioteka { get; set; }
    public DateTime DatumIzdavanja { get; set; }
    public DateTime? DatumVracanja { get; set; }

}
