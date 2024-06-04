using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace TodoAPI.Models;

public class Todo
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; }

    [BsonElement("name")]
    public string Name { get; set; }

    [BsonElement("description")]
    public string Description { get; set; }

    [BsonElement("createTime")]
    public DateTime CreateTime { get; set; }

    [BsonElement("dueDate")]
    public DateTime DueDate { get; set; }

    [BsonElement("status")]
    public int Status { get; set; }

    [BsonElement("userId")]
    public string UserId { get; set; }
}