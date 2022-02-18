using OneApiDevApp.Models;

namespace OneApiDevApp.Responses
{
    public class BookChaptersResponse : ExtensionModel
    {
        public List<BookChapterModel>? Docs { get;set; }
    }
}
