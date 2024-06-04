using System.Collections.Generic;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Driver;
using TodoAPI.Data;
using TodoAPI.Models;

namespace TodoAPI.Services;

public class TodosService : ITodosService
{
    private readonly TodoContext _context;

    public TodosService(TodoContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Todo>> GetAllTodos(string userId, string status = "all", string sortBy = "createTime", string sortOrder = "asc")
    {
        var filter = Builders<Todo>.Filter.Eq(t => t.UserId, userId);
        if (status != "all")
        {
            var statusFilter = Builders<Todo>.Filter.Eq(t => t.Status, int.Parse(status));
            filter = Builders<Todo>.Filter.And(filter, statusFilter);
        }

        var sortDefinition = sortOrder == "asc" ? Builders<Todo>.Sort.Ascending(sortBy) : Builders<Todo>.Sort.Descending(sortBy);

        return await _context.Todos.Find(filter).Sort(sortDefinition).ToListAsync();
    }

    public async Task<Todo> GetTodoById(string id)
    {
        return await _context.Todos.Find(todo => todo.Id == id).FirstOrDefaultAsync();
    }

    public async Task CreateTodo(Todo todo)
    {
        Console.WriteLine($"Inserting Todo with userId: {todo.UserId}");
        await _context.Todos.InsertOneAsync(todo);
    }

    public async Task UpdateTodo(string id, Todo todo)
    {
        await _context.Todos.ReplaceOneAsync(todo => todo.Id == id, todo);
    }

    public async Task DeleteTodo(string id, string userId)
    {
        var filter = Builders<Todo>.Filter.And(
            Builders<Todo>.Filter.Eq(t => t.Id, id),
            Builders<Todo>.Filter.Eq(t => t.UserId, userId)
        );
        await _context.Todos.DeleteOneAsync(filter);
    }
}
