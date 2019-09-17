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
        private readonly IDataRepository<Connection> _connectionRepository;

        public ChatHub(IDataRepository<Comment> commentRepository, IDataRepository<User> userRepository,
            IDataRepository<UserGroup> userGroupRepository, IDataRepository<Group> groupRepository, IDataRepository<Connection> connectionRepository)
        {
            _commentRepository = commentRepository;
            _userRepository = userRepository;
            _userGroupRepository = userGroupRepository;
            _groupRepository = groupRepository;
            _connectionRepository = connectionRepository;
        }

        public async Task SendPrivateMessage(PrivateMessageRequest request)
        {
            //getting private group and receiver's data to check for existing association between them
            var privateGroup = (_groupRepository as GroupManager)?.FindByName(request.PrivateGroupName);
            var receiver = (_userRepository as UserManager)?.FindBySub(request.ReceiverSub);
            var sender = (_userRepository as UserManager)?.FindBySub(request.SenderSub);
            
            UserGroup userGroupInDb = null;

            if (receiver == null)
            {
                var receiverSub = request.PrivateGroupName.Split('.').FirstOrDefault(sub => !sub.Equals(sender.Sub));

                receiver = (_userRepository as UserManager)?.FindBySub(receiverSub);
            }
            
            if (privateGroup != null && receiver != null)
            {
                userGroupInDb = (_userGroupRepository as UserGroupManager)?.Find(receiver.Id, privateGroup.Id);
            }

            //if the receiver hasn't been aware of the private group then let it know so that receiver can add itself to the private group
            if (userGroupInDb == null && receiver != null)
            {
                await Clients.User(receiver.Sub).SendAsync("PrivateGroupData", new
                {
                    request.PrivateGroupName, 
                    privateGroupId = privateGroup?.Id, 
                    receiverId = receiver?.Id,
                    senderId = sender?.Id
                });
            }
            
            //send the private message
            //probably need to add more info when sending the anonymous object.
            await Clients.User(receiver.Sub).SendAsync("MessageToGroup",new
            {
                text = request.Message,
                userName = sender.UserName,
                avatarUrl = sender.AvatarUrl
            });

            _commentRepository.Add(new Comment
            {
                AvatarUrl = sender.AvatarUrl,
                CreatedAt = request.CreatedAt,
                Group = privateGroup,
                Text = request.Message,
                User = sender
            });
        }

        public async Task AddToPrivateGroup(AddToPrivateGroupRequest request)
        {
            var groupInDb = (_groupRepository as GroupManager)?.FindByName(request.GroupName);
            var senderInDb = _userRepository.Get(request.SenderId);
            var receiverInDb = _userRepository.Get(request.ReceiverId);
            
            //if receiverId doesn't have a value then it is a private room
            //and is being called from
            if (receiverInDb == null && groupInDb != null)
            {
                var receiverSub = request.GroupName.Split('.').FirstOrDefault(sub => !sub.Equals(senderInDb.Sub));
                receiverInDb = (_userRepository as UserManager)?.FindBySub(receiverSub);
            } 
            if (groupInDb == null)
            {
                await Groups.AddToGroupAsync(Context.ConnectionId, request.GroupName);

                var groupId = _groupRepository.Add(new Group {Name = request.GroupName, IsPrivate = true});
                groupInDb = _groupRepository.Get(groupId);
            }


            var userGroupInDb = (_userGroupRepository as UserGroupManager)?.Find(senderInDb.Id, groupInDb.Id);

            if (userGroupInDb == null)
            {
                _userGroupRepository.Add(new UserGroup
                {
                    Group = groupInDb,
                    GroupId = groupInDb.Id,
                    User = senderInDb,
                    UserId = senderInDb.Id
                });
            }

            await Clients.Caller.SendAsync("ServerMessageOnConnectedToGroup", $"You are now private messaging {receiverInDb.UserName}");
            await Clients.Caller.SendAsync("ServerDataOnConnectedToGroup", new
            {
                groupId = groupInDb.Id,
                name = groupInDb.Name,
                id = senderInDb.Id,
                isPrivate= groupInDb.IsPrivate
            });
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
            var userInDb = _userRepository.Get(request.Id);

            
            
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
            
            var existingUserInDb = ((UserManager) _userRepository).FindBySub(newUser.Sub);

            User returnUser = null;
            
            //checking if user already exists in the db 
            if (existingUserInDb == null)
            {
                //add new user
                var id = _userRepository.Add(newUser);

                returnUser = _userRepository.Get(id);
            }
            else
            {
                //using the existing user
                returnUser = existingUserInDb;
            }

            //associate connectionId with the user (either new or existing user). 
            _connectionRepository.Add(new Connection {ConnectionId = Context.ConnectionId, User = returnUser});
            
            //either returning a new user that isn't in db or one that is.
            await Clients.Caller.SendAsync("OnAddedToDb", new
            {
                returnUser.Id,
                returnUser.Gender,
                returnUser.AvatarUrl,
                returnUser.UserName,
                returnUser.Sub,
                groupName
            });
        }

        public async Task AddToGroup(AddUserToGroupRequest req)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, req.GroupName);

            var userInDb = _userRepository.Get(req.Id);
            var groupInDb = (_groupRepository as GroupManager)?.FindByName(req.GroupName);

            if (groupInDb == null) 
            {
                var newGroupId = _groupRepository.Add(new Group {Name = req.GroupName});
                groupInDb = _groupRepository.Get(newGroupId);
            }

            //check if there's an existing association between user and group that's in db.
            var userGroupInDb = (_userGroupRepository as UserGroupManager)?.Find(userInDb.Id, groupInDb.Id);
            //if no association between user and group
            //then create a new one 
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
                userInDb.Id
            });

            await Clients.OthersInGroup(req.GroupName).SendAsync("ServerToGroup", userInDb.UserName);
        }

        public async Task RemoveFromGroup(RemoveFromGroupRequest request)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, request.GroupName);
            
            
        }
        
    }
}