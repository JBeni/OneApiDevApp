using OneApiDevApp;

try
{
    var builder = WebApplication.CreateBuilder(args);

    builder.Services.AddCors(options =>
    {
        options.AddPolicy("EnableCORS", builder =>
        {
            builder.AllowAnyOrigin()
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
    });

    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddSwaggerGen();

    var app = builder.Build();

    if (app.Environment.IsDevelopment())
    {
        app.UseSwagger();
        app.UseSwaggerUI();
    }

    app.UseCors("EnableCORS");
    app.UseHttpsRedirection();

    app.ConfigureApi(builder.Configuration);

    app.Run();
}
catch (Exception ex)
{
    Console.Error.WriteLine(ex);
}
