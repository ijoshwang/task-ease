namespace TodoAPI.DTOs;

public class TodoUpdateDTO
{
    public string Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public DateTime DueDate { get; set; }
    public int Status { get; set; }
}
