using System;
using System.Threading.Tasks;
using Microsoft.Bot.Builder.Dialogs;
using Microsoft.Bot.Connector;

namespace DrkeihannaWithBot.Dialogs
{
    [Serializable]
    public class RootDialog : IDialog<object>
    {
        public Task StartAsync(IDialogContext context)
        {
            context.Wait(MessageReceivedAsync);

            return Task.CompletedTask;
        }

        private async Task MessageReceivedAsync(IDialogContext context, IAwaitable<object> result)
        {
            var activity = await result as Activity;
            var replay = "ごめんね、わからないです。";
            if (activity.Text.Contains("ロボット"))
            {
                replay = "ロボットについては〇〇地区を見たらいいよ！";
            }
            else if (activity.Text.Contains("植物"))
            {
                replay = "植物については××地区を見たらいいよ！";
            }
            else if (activity.Text.Contains("農業"))
            {
                replay = "農業については△△地区を見たらいいよ！";
            }

            await context.PostAsync($"{replay}");

            context.Wait(MessageReceivedAsync);
        }
    }
}