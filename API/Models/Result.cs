using System.Net;

namespace API.Models
{
    public class Result
    {
        public HttpStatusCode Status { get; set; }
        public string? Title { get; set; }
    }
}
