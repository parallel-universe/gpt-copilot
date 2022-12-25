import * as vscode from 'vscode'
import { getApiKey } from '../auth'
import { writeToConsole } from '../console'

export const testCommand = (context: vscode.ExtensionContext): vscode.Disposable => {
  return vscode.commands.registerCommand('gpt-copilot.test', () => {
    getApiKey(context).then((key) => {
      key !== undefined ? writeToConsole(key) : writeToConsole('No API Key')
    }, (err) => {
      writeToConsole(err)
    })
  })
}
