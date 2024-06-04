using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using TodoAPI.Models;
using TodoAPI.Services;

namespace TodoAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class TodosController : ControllerBase
{
    private readonly ITodosService _todosService;

    public TodosController(ITodosService todosService)
    {
        _todosService = todosService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Todo>>> GetTodos([FromQuery] string status = "all", [FromQuery] string sortBy = "createTime", [FromQuery] string sortOrder = "asc")
    {
        var userId = User.FindFirst("UserId")?.Value;

        if (string.IsNullOrEmpty(userId))
        {
            return Unauthorized("User ID claim not found");
        }

        var todos = await _todosService.GetAllTodos(userId, status, sortBy, sortOrder);
        return Ok(todos);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Todo>> GetTodoById(string id)
    {
        var todo = await _todosService.GetTodoById(id);
        if (todo == null)
        {
            return NotFound();
        }
        return Ok(todo);
    }

    [HttpPost]
    public async Task<ActionResult<Todo>> CreateTodo([FromBody] TodoCreateDTO todoDto)
    {
        var userId = User.FindFirst("UserId")?.Value;

        if (string.IsNullOrEmpty(userId))
        {
            return Unauthorized("User ID claim not found");
        }

        Console.WriteLine($"Extracted UserId from token: {userId}");

        var todo = new Todo
        {
            Name = todoDto.Name,
            Description = todoDto.Description,
            DueDate = todoDto.DueDate,
            Status = 0, // Initial status set to "Not Started"
            UserId = userId // Ensure UserId is set from JWT
        };

        Console.WriteLine($"Creating Todo with UserId: {todo.UserId}");

        await _todosService.CreateTodo(todo);
        return CreatedAtAction(nameof(GetTodoById), new { id = todo.Id }, todo);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateTodo(
        string id, [FromBody] Todo todo)
    {
        if (id != todo.Id)
        {
            return BadRequest();
        }

        var userId = User.FindFirst("UserId")?.Value;

        if (string.IsNullOrEmpty(userId))
        {
            return Unauthorized("User ID claim not found");
        }

        todo.UserId = userId; // Ensure the UserId is set to the authenticated user

        await _todosService.UpdateTodo(id, todo);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTodo(string id)
    {
        var userId = User.FindFirst("UserId")?.Value;

        if (string.IsNullOrEmpty(userId))
        {
            return Unauthorized("User ID claim not found");
        }

        await _todosService.DeleteTodo(id, userId);
        return NoContent();
    }
}
