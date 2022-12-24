import * as vscode from 'vscode'
import { getApiKeyFromUser, getApiKeyFromStorage } from './auth'

export async function activate (context: vscode.ExtensionContext): Promise<void> {
  const { subscriptions } = context

  subscriptions.push(
    vscode.commands.registerCommand('gpt-copilot.test', () => {
      const channel = vscode.window.createOutputChannel('GPT Copilot')
      getApiKeyFromStorage(context).then((key) => {
        key !== undefined ? channel.appendLine(key) : channel.appendLine('No API Key')
        channel.show()
      }, (err) => {
        channel.appendLine(err)
        channel.show()
      })
    })
  )

  subscriptions.push(
    vscode.commands.registerCommand('gpt-copilot.setup', () => {
      void getApiKeyFromUser(context)
    })
  )

  // Create a status bar item that we can now manage
  const item = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100)
  item.text = 'GPT'
  item.command = 'gpt-copilot.test'

  // Show the item to the user
  item.show()
}
