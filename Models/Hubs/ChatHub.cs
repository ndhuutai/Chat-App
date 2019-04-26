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
        public async Task SendMessageToGroup(string message, string userName, string avatarUrl, string group)
        {
            await Clients
                .Group(group)
                .SendAsync("MessageToGroup", userName,  message, avatarUrl);
            
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

        public async Task AddToGroup(string groupName, string userName)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);
            await Clients.Caller.SendAsync("ServerMessageOnConnectedToGroup", $"Welcome to the group {userName}!");
            await Clients.OthersInGroup(groupName).SendAsync("ServerToGroup", userName);
        }
    }
}
