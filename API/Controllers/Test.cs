using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using System.Net;
using System.Security;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Test : ControllerBase
    {
        // POST api/<Test>
        [HttpPost]
        public Result Post([FromBody] Models.Test value)
        {
            var res = new Result();

            if (value == null || value.ChildrenId <= 0 || value.IsOk < 0) 
            {
                res.Status = HttpStatusCode.BadRequest;
                res.Title = "Niepoprawne rządanie";
            }
            else if (value.IsOk <= 0)
            {
                res.Status = HttpStatusCode.InternalServerError;
                res.Title = "Wystąpił błąd podczas przwetwarzania";
                res.ChildrenId = value.ChildrenId.ToString();
                res.ChildrenTitle = value.Title;
            }
            else
            {
                res.Status = HttpStatusCode.OK;
                res.Title = "Przetworzono poprawnie";
                res.ChildrenId = value.ChildrenId.ToString();
                res.ChildrenTitle = value.Title;
            }
            return res;
        }

        [HttpGet]
        public String GetAll()
        {
            return "test";
        }

    }
}
