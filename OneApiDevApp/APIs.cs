using Microsoft.AspNetCore.Mvc;
using OneApiDevApp.Responses;
using System.Text.Json;

namespace OneApiDevApp
{
    public static class APIs
    {
        private static readonly HttpClient httpClient = new HttpClient();
        private static string? OneApiDevURL { get; set; }

        public static void ConfigureApi(this WebApplication app, IConfiguration configuration)
        {
            OneApiDevURL = configuration["OneApiDevURL"];

            // Configure All Endpoints Mappings
            app.MapGet("/books", GetBooks);
            app.MapGet("/book/chapters", GetBookChapters);
        }

        private static async Task<IResult> GetBooks()
        {
            try
            {
                var response = await httpClient.GetAsync($"{OneApiDevURL}/book");
                var responseResult = await response.Content.ReadAsStringAsync();
                var result = JsonSerializer.Deserialize<BookResponse>(
                    responseResult,
                    new JsonSerializerOptions { PropertyNameCaseInsensitive = true }
                );

                return Results.Ok(result);
            }
            catch (Exception ex)
            {
                return Results.Problem(ex.Message);
            }
        }

        private static async Task<IResult> GetBookChapters([FromQuery] string bookId)
        {
            try
            {
                var response = await httpClient.GetAsync($"{OneApiDevURL}/book/{bookId}/chapter");
                var responseResult = await response.Content.ReadAsStringAsync();
                var result = JsonSerializer.Deserialize<BookChaptersResponse>(
                    responseResult,
                    new JsonSerializerOptions { PropertyNameCaseInsensitive = true }
                );

                return Results.Ok(result);
            }
            catch (Exception ex)
            {
                return Results.Problem(ex.Message);
            }
        }
    }
}
