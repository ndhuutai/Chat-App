using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Chat_App.Models;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Chat_App.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly IDataRepository<User> _usersRepository;

        public UsersController(IDataRepository<User> usersRepository)
        {
            _usersRepository = usersRepository;
        }
        // GET: api/<controller>
        [HttpGet]
        public IActionResult Get()
        {
            IEnumerable<User> users = _usersRepository.GetAll();
            return Ok(users);
        }
        [HttpGet("{sub}")]
        public User GetBySub(string sub)
        {
            return (_usersRepository as UserManager)?.FindBySub(sub);
        }

//        // GET api/<controller>/5
//        [HttpGet("{id}")]
//        public async Task<IActionResult> Get(long id)
//        {
//            return Ok(_usersRepository.Get(id));
//        }

        // POST api/<controller>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _usersRepository.Add(user);
            return Accepted( _usersRepository.Get(user.Id));
        }

        // PUT api/<controller>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
