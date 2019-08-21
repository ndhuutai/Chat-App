using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Chat_App.Models.Requests;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace Chat_App.Models.Hubs
{
    [Authorize]
    public class ChatHub : Hub
    {
        private readonly IDataRepository<Comment> _commentRepository;
        private readonly IDataRepository<User> _userRepository;
        private readonly IDataRepository<UserGroup> _userGroupRepository;
        private readonly IDataRepository<Group> _groupRepository;

        public ChatHub(IDataRepository<Comment> commentRepository, IDataRepository<User> userRepository,
            IDataRepository<UserGroup> userGroupRepository, IDataRepository<Group> groupRepository)
        {
            _commentRepository = commentRepository;
            _userRepository = userRepository;
            _userGroupRepository = userGroupRepository;
            _groupRepository = groupRepository;
        }

        public async Task SendPrivateMessage(PrivateMessageRequest request)
        {
            await Clients.User(request.UserId).SendAsync(request.Message);
        }

        public async Task SendMessageToGroup(MessageToGroupRequest request)
        {
            await Clients
                .Group(request.GroupName)
                .SendAsync("MessageToGroup", new
                {
                    request.UserName,
                    request.Text,
                    request.AvatarUrl
                });

            var groupInDb = (_groupRepository as GroupManager)?.FindByName(request.GroupName);
            var userInDb = _userRepository.Get(request.UserId);


            // once sent, save message to comment's db
            _commentRepository.Add(new Comment
            {
                AvatarUrl = request.AvatarUrl,
                CreatedAt = request.CreatedAt,
                Group = groupInDb,
                Text = request.Text,
                User = userInDb
            });
        }

        public override async Task OnConnectedAsync()
        {
            //adding user to single-user group for private messages
            await Groups.AddToGroupAsync(Context.ConnectionId, Context.UserIdentifier);
//            await Clients.Caller.SendAsync("ServerMessageOnConnected", Context.ConnectionId);
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            await Clients.Caller.SendAsync("ServerMessageOnDisconnected", "A client disconnected from the chat room");
            await base.OnDisconnectedAsync(exception);
        }

        public async Task AddUserToDb(User newUser, string groupName)
        {
            newUser.ConnectionId = Context.ConnectionId;
            var id = _userRepository.Add(newUser);

            var returnUser = _userRepository.Get(id);
            await Clients.Caller.SendAsync("OnAddedToDb", new
            {
                returnUser.Id,
                returnUser.Gender,
                returnUser.AvatarUrl,
                returnUser.ConnectionId,
                returnUser.UserName,
                groupName
            });
        }

        public async Task AddToGroup(AddUserToGroupRequest req)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, req.GroupName);

            var userInDb = _userRepository.Get(req.UserId);
            var groupInDb = (_groupRepository as GroupManager)?.FindByName(req.GroupName);

            if (groupInDb == null)
            {
                var newGroupId = _groupRepository.Add(new Group {Name = req.GroupName});
                groupInDb = _groupRepository.Get(newGroupId);
            }

            //check if there's an existing association between user and group that's in db.
            var userGroupInDb = (_userGroupRepository as UserGroupManager)?.Find(userInDb.Id, groupInDb.Id);
            //if no association between user and group
            if (userGroupInDb == null)
            {
                var newUserGroup = new UserGroup
                {
                    UserId = userInDb.Id,
                    GroupId = groupInDb.Id,
                    User = userInDb,
                    Group = groupInDb
                };
                _userGroupRepository.Add(newUserGroup);
            }

            await Clients.Caller.SendAsync("ServerMessageOnConnectedToGroup",
                $"Welcome to the group {userInDb.UserName}!");
            await Clients.Caller.SendAsync("ServerDataOnConnectedToGroup", new
            {
                groupId = groupInDb.Id,
                name = groupInDb.Name,
                userId = userInDb.Id
            });

            await Clients.OthersInGroup(req.GroupName).SendAsync("ServerToGroup", userInDb.UserName);
        }
    }
}