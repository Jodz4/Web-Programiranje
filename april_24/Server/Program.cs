using Bioskop.Models;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// 1. Serijalizacija i kontroleri
builder.Services.AddControllers().AddJsonOptions(x =>
                x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);

// 2. Baza u memoriji
builder.Services.AddDbContext<BioskopContext>(options =>
    options.UseInMemoryDatabase("BioskopBaza"));

// 3. CORS - Dozvoljava JS-u da pristupi API-ju
builder.Services.AddCors(options =>
{
    options.AddPolicy("CORS_Policy", policy =>
    {
        policy.AllowAnyHeader()
              .AllowAnyMethod()
              .AllowAnyOrigin();
    });
});

var app = builder.Build();

// 4. Inicijalizacija podataka (Seed)
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<BioskopContext>();
    context.Database.EnsureCreated();
}

// OBRISANO: app.UseHttpsRedirection(); - Ovo je pravilo problem sa SSL-om

app.UseCors("CORS_Policy");
app.MapControllers();
app.Run();