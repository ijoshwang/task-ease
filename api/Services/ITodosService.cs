using System.Collections.Generic;
using System.Threading.Tasks;
using TodoAPI.Models;

namespace TodoAPI.Services;

public interface ITodosService
{
    Task<IEnumerable<Todo>> GetAllTodos(string userId, string status = null, string sortBy = null, string sortOrder = null);
    Task<Todo> GetTodoById(string id);
    Task CreateTodo(Todo todo);
    Task UpdateTodo(string id, Todo todo);
    Task DeleteTodo(string id, string userId);
}