using System.Collections.Generic;
using Chat_App.Models;
using Microsoft.AspNetCore.Mvc;

namespace Chat_App.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserGroupsController : ControllerBase
    {
        private readonly IDataRepository<UserGroup> _userGroupsRepository;

        public UserGroupsController(IDataRepository<UserGroup> userGroupsRepository)
        {
            _userGroupsRepository = userGroupsRepository;
        }

        [HttpGet("groups/{id}")]
        public IEnumerable<UserGroup> GetAllUsersInGroup(int id)
        {
            return ((UserGroupManager) _userGroupsRepository).GetUsersInGroup(id);
        }

        [HttpGet("user/{id}")]
        public IEnumerable<UserGroup> GetAllGroupsOfUser(int id)
        {
            return ((UserGroupManager) _userGroupsRepository).GetGroupsOfUser(id);
        }
    }
}