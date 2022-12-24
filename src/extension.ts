import * as vscode from 'vscode';

export async function activate(context: vscode.ExtensionContext) {
  const { subscriptions } = context;

  // Register the command that will be called when the user clicks on the status bar item
  subscriptions.push(
    vscode.commands.registerCommand("gpt-copilot.test", () => {
        const channel = vscode.window.createOutputChannel("GPT Copilot");
        channel.appendLine("Hello World!!!!");
        channel.show();
    })
  );

  // Create a status bar item that we can now manage
  const item = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
  item.text = "GPT";
  item.command = "gpt-copilot.test";

  // Show the item to the user
  item.show();
}