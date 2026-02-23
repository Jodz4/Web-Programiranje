var builder = WebApplication.CreateBuilder(args);

// 1. DODAJ PODRŠKU ZA KONTROLERE
builder.Services.AddControllers();

// 2. DODAJ KONFIGURACIJU ZA CORS (da klijent može da priča sa serverom)
builder.Services.AddCors(options =>
{
    options.AddPolicy("CORS_Policy", policy =>
    {
        policy.AllowAnyHeader()
              .AllowAnyMethod()
              .AllowAnyOrigin(); // U razvoju dozvoljavamo sve, na kolokvijumu je ovo najsigurnije
    });
});

builder.Services.AddOpenApi();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

// 3. AKTIVIRAJ CORS POLISU
app.UseCors("CORS_Policy");

// 4. MAPIRAJ KONTROLERE (ovo menja onaj ručni weatherforecast kôd)
app.MapControllers();

app.Run();