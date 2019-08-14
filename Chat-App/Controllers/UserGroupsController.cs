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
        private readonly IDataRepository<Group> _groupRepository;

        public UserGroupsController(IDataRepository<UserGroup> userGroupsRepository,
            IDataRepository<User> usersRepository, IDataRepository<Group> groupRepository)
        {
            _userGroupsRepository = userGroupsRepository;
            _usersRepository = usersRepository;
            _groupRepository = groupRepository;
        }

        [HttpGet("group/{id}")]
        public IEnumerable<User> GetAllUsersInGroup(int id)
        {
            var userGroups = (_userGroupsRepository as UserGroupManager)?.GetUsersInGroup(id);
            var users = userGroups?.Select(userGroup => _usersRepository.Get(userGroup.UserId)).ToList();
            return users;
        }

        [HttpGet("user/{id}")]
        public IEnumerable<Group> GetAllGroupsOfUser(int id)
        {
            var userGroups = (_userGroupsRepository as UserGroupManager)?.GetGroupsOfUser(id);
            var groups = userGroups?.Select(userGroup => _groupRepository.Get(userGroup.GroupId)).ToList();
            
            return groups;
        }
    }
}