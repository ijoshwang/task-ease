namespace TodoAPI.Models;

public class TodoCreateDTO
{
    public string Name { get; set; }
    public string Description { get; set; }
    public DateTime DueDate { get; set; }
}
