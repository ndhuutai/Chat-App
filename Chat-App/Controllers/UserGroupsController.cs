using System.Collections.Generic;
using System.Linq;
using Chat_App.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.CSharp;

namespace Chat_App.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserGroupsController : ControllerBase
    {
        private readonly IDataRepository<UserGroup> _userGroupsRepository;
        private readonly IDataRepository<User> _usersRepository;

        public UserGroupsController(IDataRepository<UserGroup> userGroupsRepository, IDataRepository<User> usersRepository)
        {
            _userGroupsRepository = userGroupsRepository;
            _usersRepository = usersRepository;
        }

        [HttpGet("group/{id}")]
        public IEnumerable<User> GetAllUsersInGroup(int id)
        {
            var userGroups = ((UserGroupManager) _userGroupsRepository).GetUsersInGroup(id);
            var users = userGroups.Select(userGroup => _usersRepository.Get(userGroup.UserId)).ToList();
            return users;
        }

        [HttpGet("user/{id}")]
        public IEnumerable<UserGroup> GetAllGroupsOfUser(int id)
        {
            return ((UserGroupManager) _userGroupsRepository).GetGroupsOfUser(id);
        }
    }
}