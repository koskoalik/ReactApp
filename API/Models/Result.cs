using System.Net;

namespace API.Models
{
    public class Result
    {
        public HttpStatusCode Status { get; set; }
        public string? Title { get; set; }
        public string? ChildrenId { get; set; }
        public string? ChildrenTitle { get; set; }
    }
}
