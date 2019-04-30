using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Chat_App.Models
{
    interface IRepositoryContext : IDisposable
    {
        DbSet<Comment> Comments { get; }
        int SaveChanges();
        void MarkAsModified(Comment comment);
    }
}
