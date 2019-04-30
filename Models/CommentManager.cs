using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Chat_App.Models
{
    public class CommentManager : IDataRepository<Comment>
    {
        private readonly RepositoryContext _repositoryContext;

        public CommentManager(RepositoryContext context)
        {
            _repositoryContext = context;
        }

        public IEnumerable<Comment> GetAll()
        {
            return _repositoryContext.Comments.Include("User").ToList();
        }

        public Comment Get(long id)
        {
            return _repositoryContext.Comments
                .FirstOrDefault(comment => comment.Id == id);
        }

        public void Add(Comment comment)
        {
            _repositoryContext.Comments.Add(comment);
            _repositoryContext.SaveChanges();
        }

        public void Update(Comment commentInDb, Comment comment)
        {
            commentInDb.Text = comment.Text;
            commentInDb.CreatedAt = comment.CreatedAt;
        }

        public void Delete(Comment comment)
        {
            _repositoryContext.Comments.Remove(comment);
            _repositoryContext.SaveChanges();
        }
    }
}
