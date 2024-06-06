using TodoAPI.Models;

namespace TodoAPI.DTOs;

public class TodoDTO
{
    public string Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public DateTime DueDate { get; set; }
    public int Status { get; set; }

    public TodoDTO(Todo todo)
    {
        Id = todo.Id;
        Name = todo.Name;
        Description = todo.Description;
        DueDate = todo.DueDate;
        Status = todo.Status;
    }
}
