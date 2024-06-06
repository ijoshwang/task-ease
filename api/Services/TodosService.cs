using System.Collections.Generic;
using System.Threading.Tasks;
using MongoDB.Driver;
using TodoAPI.Data;
using TodoAPI.DTOs;
using TodoAPI.Models;
using Microsoft.Extensions.Logging;

namespace TodoAPI.Services;

public class TodosService : ITodosService
{
    private readonly TodoContext _context;
    private readonly ILogger<TodosService> _logger;

    public TodosService(TodoContext context, ILogger<TodosService> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<IEnumerable<TodoDTO>> GetAllTodos(string userId, string status = "all", string sortBy = "createTime", string sortOrder = "asc")
    {
        var filter = Builders<Todo>.Filter.Eq(t => t.UserId, userId);
        if (status != "all")
        {
            var statusFilter = Builders<Todo>.Filter.Eq(t => t.Status, int.Parse(status));
            filter = Builders<Todo>.Filter.And(filter, statusFilter);
        }

        var sortDefinition = sortOrder == "asc" ? Builders<Todo>.Sort.Ascending(sortBy) : Builders<Todo>.Sort.Descending(sortBy);

        try
        {
            var todos = await _context.Todos.Find(filter).Sort(sortDefinition).ToListAsync();
            return todos.Select(todo => new TodoDTO(todo)).ToList();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving todos for user {UserId}", userId);
            throw;
        }
    }

    public async Task<TodoDTO> GetTodoById(string id)
    {
        try
        {
            var todo = await _context.Todos.Find(todo => todo.Id == id).FirstOrDefaultAsync();
            return new TodoDTO(todo);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving todo by id {TodoId}", id);
            throw;
        }
    }

    public async Task CreateTodo(TodoCreateDTO todoCreateDto, string userId)
    {
        var todo = new Todo
        {
            Name = todoCreateDto.Name,
            Description = todoCreateDto.Description,
            DueDate = todoCreateDto.DueDate,
            Status = 0, // Initial status set to "Not Started"
            UserId = userId
        };

        try
        {
            _logger.LogInformation("Inserting Todo with userId: {UserId}", todo.UserId);
            await _context.Todos.InsertOneAsync(todo);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error creating todo for user {UserId}", todo.UserId);
            throw;
        }
    }

    public async Task UpdateTodo(string id, TodoUpdateDTO todoUpdateDto, string userId)
    {
        var todo = new Todo
        {
            Id = id,
            Name = todoUpdateDto.Name,
            Description = todoUpdateDto.Description,
            DueDate = todoUpdateDto.DueDate,
            Status = todoUpdateDto.Status,
            UserId = userId
        };

        try
        {
            await _context.Todos.ReplaceOneAsync(t => t.Id == id && t.UserId == userId, todo);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error updating todo with id {TodoId}", id);
            throw;
        }
    }

    public async Task DeleteTodo(string id, string userId)
    {
        var filter = Builders<Todo>.Filter.And(
            Builders<Todo>.Filter.Eq(t => t.Id, id),
            Builders<Todo>.Filter.Eq(t => t.UserId, userId)
        );

        try
        {
            await _context.Todos.DeleteOneAsync(filter);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error deleting todo with id {TodoId} for user {UserId}", id, userId);
            throw;
        }
    }
}