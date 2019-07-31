using IdentityServer.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace IdentityServer.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        
    }
}