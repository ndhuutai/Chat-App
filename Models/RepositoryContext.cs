using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Chat_App.Models
{
    public class RepositoryContext: DbContext
    {
        public RepositoryContext(DbContextOptions options) 
            : base(options)
        {

        }
        
        

        public DbSet<User> Users { get; set; }
        public DbSet<Comment> Comments { get; set; }
    }
}
