using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using TodoAPI.Data;
using TodoAPI.Models;

namespace TodoAPI.Controllers
{
    [ApiController]
    [Route("api/test")]
    public class TestController : ControllerBase
    {
        private readonly TodoContext _context;

        public TestController(TodoContext context)
        {
            _context = context;
        }

        [HttpGet("test-connection")]
        public IActionResult TestConnection()
        {
            try
            {
                var users = _context.Users.Find(user => true).FirstOrDefault();
                return Ok("Connection to MongoDB is successful!");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error connecting to MongoDB: {ex.Message}");
            }
        }
    }
}
