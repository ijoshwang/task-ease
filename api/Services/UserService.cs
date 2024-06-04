using MongoDB.Driver;
using TodoAPI.Data;
using TodoAPI.Models;
using System;

namespace TodoAPI.Services;

public class UserService : IUserService
{
    private readonly IMongoCollection<User> _usersCollection;

    public UserService(TodoContext context)
    {
        _usersCollection = context.Users;
    }

    public User Authenticate(string name, string password)
    {
        Console.WriteLine($"Attempting to authenticate user: {name}");
        var user = _usersCollection.Find(user => user.Name == name && user.Password == password).FirstOrDefault();
        Console.WriteLine($"User found: {user != null}");
        if (user != null)
        {
            Console.WriteLine($"User Id: {user.Id}, Name: {user.Name}");
        }
        return user;
    }
}