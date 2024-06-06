using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using TodoAPI.Models;
using TodoAPI.Services;
using TodoAPI.DTOs; // This needs to be added
using Microsoft.Extensions.Logging;

namespace TodoAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class TodosController : ControllerBase
{
    private readonly ITodosService _todosService;
    private readonly ILogger<TodosController> _logger;

    public TodosController(ITodosService todosService, ILogger<TodosController> logger)
    {
        _todosService = todosService;
        _logger = logger;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<TodoDTO>>> GetTodos([FromQuery] string status = "all", [FromQuery] string sortBy = "createTime", [FromQuery] string sortOrder = "asc")
    {
        var userId = User.FindFirst("UserId")?.Value;

        if (string.IsNullOrEmpty(userId))
        {
            _logger.LogWarning("User ID claim not found");
            return Unauthorized("User ID claim not found");
        }

        var todos = await _todosService.GetAllTodos(userId, status, sortBy, sortOrder);
        return Ok(todos);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<TodoDTO>> GetTodoById(string id)
    {
        var todo = await _todosService.GetTodoById(id);
        if (todo == null)
        {
            _logger.LogWarning($"Todo with ID {id} not found");
            return NotFound();
        }
        return Ok(todo);
    }

    [HttpPost]
    public async Task<ActionResult<TodoDTO>> CreateTodo([FromBody] TodoCreateDTO todoDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var userId = User.FindFirst("UserId")?.Value;

        if (string.IsNullOrEmpty(userId))
        {
            _logger.LogWarning("User ID claim not found");
            return Unauthorized("User ID claim not found");
        }

        _logger.LogInformation($"Creating Todo for UserId: {userId}");

        await _todosService.CreateTodo(todoDto, userId);
        var createdTodo = new Todo
        {
            Name = todoDto.Name,
            Description = todoDto.Description,
            DueDate = todoDto.DueDate,
            Status = 0, // Initial status set to "Not Started"
            UserId = userId // Ensure UserId is set from JWT
        };

        return CreatedAtAction(nameof(GetTodoById), new { id = createdTodo.Id }, new TodoDTO(createdTodo));
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateTodo(
        string id, [FromBody] TodoUpdateDTO todoDto)
    {
        if (!ModelState.IsValid || id != todoDto.Id)
        {
            return BadRequest(ModelState);
        }

        var userId = User.FindFirst("UserId")?.Value;

        if (string.IsNullOrEmpty(userId))
        {
            _logger.LogWarning("User ID claim not found");
            return Unauthorized("User ID claim not found");
        }

        await _todosService.UpdateTodo(id, todoDto, userId);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTodo(string id)
    {
        var userId = User.FindFirst("UserId")?.Value;

        if (string.IsNullOrEmpty(userId))
        {
            _logger.LogWarning("User ID claim not found");
            return Unauthorized("User ID claim not found");
        }

        await _todosService.DeleteTodo(id, userId);
        return NoContent();
    }
}
