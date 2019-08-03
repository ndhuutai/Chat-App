// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.


using System;
using System.Reflection;
using IdentityServer.Data;
using IdentityServer.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace IdentityServer
{
    public class Startup
    {
        public IConfiguration Configuration { get; }
        public IHostingEnvironment Environment { get; }

        public Startup(IConfiguration configuration, IHostingEnvironment environment)
        {
            Configuration = configuration;
            Environment = environment;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            // uncomment, if you want to add an MVC-based UI
            //services.AddMvc().SetCompatibilityVersion(Microsoft.AspNetCore.Mvc.CompatibilityVersion.Version_2_1);

            var migrationAssembly = typeof(Startup).GetTypeInfo().Assembly.GetName().Name;


            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseMySql(Configuration.GetConnectionString("ChatDb")));

            services.AddIdentity<ApplicationUser, IdentityRole>()
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddDefaultTokenProviders();

            var builder = services.AddIdentityServer(options =>
                    {
                        options.Events.RaiseErrorEvents = true;
                        options.Events.RaiseInformationEvents = true;
                        options.Events.RaiseFailureEvents = true;
                        options.Events.RaiseSuccessEvents = true;
                    })
                    .AddConfigurationStore(options =>
                    {
                        options.ConfigureDbContext = b =>
                        {
                            b.UseMySql(Configuration.GetConnectionString("ChatDB"),
                                mysql => mysql.MigrationsAssembly(migrationAssembly));
                        };
                    })
                    .AddOperationalStore(options =>
                    {
                        options.ConfigureDbContext = b =>
                        {
                            b.UseMySql(Configuration.GetConnectionString("ChatDB"),
                                mysql => mysql.MigrationsAssembly(migrationAssembly));
                        };
                        options.EnableTokenCleanup = true;
                    })
                    .AddAspNetIdentity<ApplicationUser>()
                ;

            if (Environment.IsDevelopment())
            {
                builder.AddDeveloperSigningCredential();
            }
            else
            {
                throw new Exception("need to configure key material");
            }
        }

        public void Configure(IApplicationBuilder app)
        {
            if (Environment.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            // uncomment if you want to support static files
            //app.UseStaticFiles();

            app.UseIdentityServer();

            // uncomment, if you want to add an MVC-based UI
            //app.UseMvcWithDefaultRoute();
        }
    }
}