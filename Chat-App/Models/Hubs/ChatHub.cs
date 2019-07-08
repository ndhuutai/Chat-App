﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Chat_App.Models.Requests;
using Microsoft.AspNetCore.SignalR;

namespace Chat_App.Models.Hubs
{
    public class ChatHub : Hub
    {
        private readonly IDataRepository<Comment> _commentRepository;
        private readonly IDataRepository<User> _userRepository;
        private readonly IDataRepository<UserGroup> _userGroupRepository;

        public ChatHub(IDataRepository<Comment> commentRepository, IDataRepository<User> userRepository, 
            IDataRepository<UserGroup> userGroupRepository)
        {
            _commentRepository = commentRepository;
            _userRepository = userRepository;
            _userGroupRepository = userGroupRepository;
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

            var returnUser = _userRepository.Get(id);
            await Clients.Caller.SendAsync("OnAddedToDb", returnUser);
        }

        public async Task AddToGroup(AddUserToGroupRequest req)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, req.GroupName);
            var userInDb = _userRepository.Get(req.UserId);
            var groupInDb = _userGroupRepository.Get(req.GroupId);
            
            
            
                
            await Clients.Caller.SendAsync("ServerMessageOnConnectedToGroup", $"Welcome to the group {userInDb.UserName}!");
            await Clients.OthersInGroup(req.GroupName).SendAsync("ServerToGroup", userInDb.UserName);
            var updatedUser = new User(req.GroupName,userInDb.UserName,userInDb.ConnectionId,userInDb.AvatarUrl,userInDb.Gender);
            _userRepository.Update(userInDb, updatedUser);
        }
    }
}
