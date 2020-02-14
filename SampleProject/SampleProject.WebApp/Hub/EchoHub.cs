using Microsoft.AspNetCore.SignalR;

namespace SampleProject
{
    public class EchoHub : Hub
    {
        public void Echo(Message message)
        {
            Clients.All.SendAsync("Send", message);
        }
    }

    public class Message
    {
        public string Name { get; set; }
        public string Text { get; set; }
        public string Date { get; set; }        
    }
}
