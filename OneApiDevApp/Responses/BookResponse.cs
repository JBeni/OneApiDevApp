using OneApiDevApp.Models;

namespace OneApiDevApp.Responses
{
    public class BookResponse : ExtensionModel
    {
        public List<BookModel>? Docs { get; set; }
    }
}
