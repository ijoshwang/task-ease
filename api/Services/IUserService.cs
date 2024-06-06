using TodoAPI.Models;
using System.Threading.Tasks;

namespace TodoAPI.Services;

public interface IUserService
{
    Task<User?> AuthenticateAsync(string name, string password);
}