using Microsoft.EntityFrameworkCore;
using RentACarServer.Models;

var builder = WebApplication.CreateBuilder(args);

// 1. SQLite Baza
builder.Services.AddDbContext<RentContext>(options => 
    options.UseSqlite("Data Source=RentACar.db"));

// 2. CORS (Da JS može da pristupi)
builder.Services.AddCors(options => {
    options.AddPolicy("CORS", policy => {
        policy.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin();
    });
});

builder.Services.AddControllers();

var app = builder.Build();

app.UseCors("CORS");
app.MapControllers();

// 3. Automatsko kreiranje baze i SEED podataka
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<RentContext>();
    context.Database.EnsureCreated();

    if (!context.Automobili.Any())
    {
        context.Automobili.AddRange(
            new Automobil { Model = "Toyota", KM = 12000, Godiste = 2018, Sedista = 5, Cena = 35, Iznajmljen = false },
            new Automobil { Model = "Audi", KM = 5500, Godiste = 2020, Sedista = 5, Cena = 50, Iznajmljen = false },
            new Automobil { Model = "Mercedes", KM = 500, Godiste = 2022, Sedista = 2, Cena = 100, Iznajmljen = true }
        );
        context.SaveChanges();
    }
}

app.Run();