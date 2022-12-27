import * as vscode from 'vscode'
import { getApiKey } from '../auth'
import { writeToConsole, outputChannel } from '../console'

export const testCommand = (context: vscode.ExtensionContext): vscode.Disposable => {
  return vscode.commands.registerCommand('gpt-copilot.test', () => {
    getApiKey(context.secrets).then((key) => {
      key !== undefined ? writeToConsole(key, outputChannel) : writeToConsole('No API Key', outputChannel)
    }, (err) => {
      writeToConsole(err, outputChannel)
    })
  })
}
