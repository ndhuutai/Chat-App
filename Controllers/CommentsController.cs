using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Chat_App.Models;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Chat_App.Controllers
{
    [Route("api/[controller]")]
    public class CommentsController : ControllerBase
    {
        private readonly IDataRepository<Comment> _commentRepository;

        public CommentsController(IDataRepository<Comment> commentRepository)
        {
            _commentRepository = commentRepository;
        }

        // GET: api/<controller>
        [HttpGet]
        public IActionResult Get()
        {
            IEnumerable<Comment> comments = _commentRepository.GetAll();
            return Ok(comments);
        }

        // GET api/<controller>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return $"value {id}";
        }

        // POST api/<controller>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]Comment comment)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _commentRepository.Add(comment);
            return Accepted();
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
