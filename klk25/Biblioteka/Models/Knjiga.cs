namespace Biblioteka.Models;

public class Knjiga
{
    public int ID { get; set; }
    public required string Naslov { get; set; }

    public required string Autor { get; set; }

    public int GodinaIzdavanja { get; set; }
    public required string Izdavac { get; set; }

    public required string BrojUEvidenciji { get; set; }
    public Biblioteka? Biblioteka { get; set; }
}
