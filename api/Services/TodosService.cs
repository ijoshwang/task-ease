using System.Collections.Generic;
using System.Threading.Tasks;
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

    public async Task<IEnumerable<Todo>> GetAllTodos(string userId, string status = null, string sortBy = null, string sortOrder = null)
    {
        var filterBuilder = Builders<Todo>.Filter;
        var filter = filterBuilder.Eq(todo => todo.UserId, userId);

        if (!string.IsNullOrEmpty(status))
        {
            filter &= filterBuilder.Eq(todo => todo.Status, int.Parse(status));
        }

        var sortBuilder = Builders<Todo>.Sort;
        SortDefinition<Todo> sort = sortBuilder.Ascending(todo => todo.CreateTime);

        if (!string.IsNullOrEmpty(sortBy))
        {
            sort = sortOrder == "desc" ? sortBuilder.Descending(sortBy) : sortBuilder.Ascending(sortBy);
        }

        return await _context.Todos.Find(filter).Sort(sort).ToListAsync();
    }

    public async Task<Todo> GetTodoById(string id)
    {
        return await _context.Todos.Find(todo => todo.Id == id).FirstOrDefaultAsync();
    }

    public async Task CreateTodo(Todo todo)
    {
        await _context.Todos.InsertOneAsync(todo);
    }

    public async Task UpdateTodo(string id, Todo todo)
    {
        var filter = Builders<Todo>.Filter.Eq(t => t.Id, id) & Builders<Todo>.Filter.Eq(t => t.UserId, todo.UserId);
        await _context.Todos.ReplaceOneAsync(filter, todo);
    }

    public async Task DeleteTodo(string id, string userId)
    {
        var filter = Builders<Todo>.Filter.Eq(t => t.Id, id) & Builders<Todo>.Filter.Eq(t => t.UserId, userId);
        await _context.Todos.DeleteOneAsync(filter);
    }
}