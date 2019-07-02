using System;
using Chat_App.Models;
using Microsoft.EntityFrameworkCore;
using NUnit.Framework;
namespace Tests
{
    [TestFixture]
    public class Tests
    {
        [SetUp]
        public void Setup()
        {
        }

        [Test]
        public void Test1()
        {
            var options = new DbContextOptionsBuilder<RepositoryContext>()
                .UseInMemoryDatabase(databaseName: "TestDatabase")
                .Options;

            var context = new RepositoryContext(options);

            var commentManager = new CommentManager(context);

            var comment = new Comment()
            {
                AvatarUrl = "myavatarurl.com",
                CreatedAt = DateTime.Now,
                Id = 1,
                Text = "my test comment"
            };

            commentManager.Add(comment);
            var returnComment = commentManager.Get(1);
            Assert.AreEqual(comment, returnComment);
        }
    }
}