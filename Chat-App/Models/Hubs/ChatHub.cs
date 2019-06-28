using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace Chat_App.Models.Hubs
{
    public class ChatHub : Hub
    {
        private readonly IDataRepository<Comment> _commentRepository;
        private readonly IDataRepository<User> _userRepository;

        public ChatHub(IDataRepository<Comment> commentRepository, IDataRepository<User> userRepository)
        {
            this._commentRepository = commentRepository;
            this._userRepository = userRepository;
        }

        public async Task SendMessageToGroup(string message, string userName, string avatarUrl, string group, DateTime createdAt)
        {
            await Clients
                .Group(group)
                .SendAsync("MessageToGroup", userName,  message, avatarUrl);
            // once sent, save message to comment's db
        }

        public override async Task OnConnectedAsync()
        {
            await Clients.Caller.SendAsync("ServerMessageOnConnected", Context.ConnectionId);
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            await Clients.Caller.SendAsync("ServerMessageOnDisconnected", "A client disconnected from the chat room");
            await base.OnDisconnectedAsync(exception);
        }

        public async Task AddUserToDb(User newUser)
        {
            newUser.ConnectionId = Context.ConnectionId;
            var id = _userRepository.Add(newUser);
            await Clients.Caller.SendAsync("OnAddedToDb", id);
        }

        public async Task AddToGroup(string groupName, long id, string gender)
        {
            var userInDb = _userRepository.Get(id);
            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);
            await Clients.Caller.SendAsync("ServerMessageOnConnectedToGroup", $"Welcome to the group {userInDb.UserName}!");
            await Clients.OthersInGroup(groupName).SendAsync("ServerToGroup", userInDb.UserName);

            var updatedUser = new User(groupName,userInDb.UserName,userInDb.ConnectionId,userInDb.AvatarUrl,userInDb.Gender);
            _userRepository.Update(userInDb, updatedUser);
        }
    }
}
