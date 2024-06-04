using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;

namespace TodoAPI.Models;

public class Todo
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; } = ObjectId.GenerateNewId().ToString();

    [BsonElement("name")]
    public string Name { get; set; }

    [BsonElement("description")]
    public string Description { get; set; }

    [BsonElement("createTime")]
    public DateTime CreateTime { get; set; } = DateTime.UtcNow;

    [BsonElement("dueDate")]
    public DateTime DueDate { get; set; }

    [BsonElement("status")]
    public int Status { get; set; }

    [BsonElement("userId")]
    public string UserId { get; set; }
}
