using System.Collections.Generic;
using System.Threading.Tasks;
using TodoAPI.DTOs;
using TodoAPI.Models;

namespace TodoAPI.Services;

public interface ITodosService
{
    Task<IEnumerable<TodoDTO>> GetAllTodos(string userId, string status = "all", string sortBy = "createTime", string sortOrder = "asc");
    Task<TodoDTO> GetTodoById(string id);
    Task CreateTodo(TodoCreateDTO todoCreateDto, string userId);
    Task UpdateTodo(string id, TodoUpdateDTO todoUpdateDto, string userId);
    Task DeleteTodo(string id, string userId);
}