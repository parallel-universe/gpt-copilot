import * as vscode from 'vscode'
import { getApiKeyFromUser, getApiKeyFromStorage } from './auth'

export async function activate (context: vscode.ExtensionContext): Promise<void> {
  const { subscriptions } = context
  const channel = vscode.window.createOutputChannel('GPT Copilot')

  subscriptions.push(
    vscode.commands.registerCommand('gpt-copilot.test', () => {
      
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

  subscriptions.push(
    vscode.commands.registerCommand('gpt-copilot.ask_about_selection', () => {
      const editor = vscode.window.activeTextEditor
      if (editor) {
        const selection = editor.selection
        if (selection && !selection.isEmpty) {
          const selectionRange = new vscode.Range(selection.start.line, selection.start.character, selection.end.line, selection.end.character);
          const highlighted = editor.document.getText(selectionRange);
          channel.appendLine(highlighted)
          channel.show()
      }
    }
    })
  )

  // Create a status bar item that we can now manage
  const item = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100)
  item.text = 'GPT'
  item.command = 'gpt-copilot.test'

  // Show the item to the user
  item.show()
}
