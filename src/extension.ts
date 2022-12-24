import * as vscode from 'vscode';
import { getApiKeyFromUser, getApiKeyFromStorage } from './auth';

export async function activate(context: vscode.ExtensionContext) {
  const { subscriptions } = context;

  // Register the command that will be called when the user clicks on the status bar item
  subscriptions.push(
    vscode.commands.registerCommand("gpt-copilot.test", () => {
        const channel = vscode.window.createOutputChannel("GPT Copilot");
        const apiKey = getApiKeyFromStorage(context);
        apiKey.then((key) => {
          if (key === undefined) {
            channel.appendLine("No API Key found");
            channel.appendLine("Please run the command 'GPT Copilot: Setup' to set your API Key");
          } else {
            channel.appendLine(key);
          }
          channel.show();
        });
    })
  );

  subscriptions.push(
    vscode.commands.registerCommand("gpt-copilot.setup", () => {
        getApiKeyFromUser(context);
    })
  );

  // Create a status bar item that we can now manage
  const item = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
  item.text = "GPT";
  item.command = "gpt-copilot.test";

  // Show the item to the user
  item.show();
}