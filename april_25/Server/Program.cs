using Microsoft.EntityFrameworkCore;
using WebApi.Models; 
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Dodajemo In-Memory bazu
builder.Services.AddDbContext<SilosContext>(options =>
    options.UseInMemoryDatabase("SilosiDB"));

// DODAJEMO CORS - Bez ovoga fetch iz brauzera ne radi!
builder.Services.AddCors(options =>
{
    options.AddPolicy("CORS", policy =>
    {
        policy.AllowAnyHeader()
              .AllowAnyMethod()
              .AllowAnyOrigin(); 
    });
});

// ISPRAVKA: Dodat ReferenceHandler.IgnoreCycles da spreči "A possible object cycle was detected"
builder.Services.AddControllers().AddJsonOptions(x =>
   x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Puni bazu početnim podacima
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<SilosContext>();
    if (!context.Fabrike.Any())
    {
        var f1 = new Fabrika {
            Naziv = "Zitopek",
            Silosi = new List<Silos> {
                new Silos { Oznaka = "Silos 1", Kapacitet = 2000, TrenutnaKolicina = 100 },
                new Silos { Oznaka = "Silos 2", Kapacitet = 2000, TrenutnaKolicina = 1000 },
                new Silos { Oznaka = "Silos 3", Kapacitet = 2000, TrenutnaKolicina = 500 }
            }
        };
        context.Fabrike.Add(f1);
        context.SaveChanges();
    }
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("CORS"); 
app.UseAuthorization();
app.MapControllers();

app.Run();