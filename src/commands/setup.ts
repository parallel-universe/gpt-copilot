import * as vscode from 'vscode'
import { apiKey } from '../apiKey'

export const setupCommand = (context: vscode.ExtensionContext): vscode.Disposable => {
  return vscode.commands.registerCommand('gpt-copilot.setup', () => {
    void getApiKeyFromUser(context)
  })
}

const getApiKeyFromUser = async (context: vscode.ExtensionContext): Promise<void> => {
  await vscode.window.showInputBox({
    prompt: 'Enter your OpenAI API Key',
    placeHolder: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    ignoreFocusOut: true,
    password: true,
    validateInput: (value: string) => {
      if (value.length === 0) {
        return 'Invalid API Key'
      }
      return null
    }
  }).then((key) => {
    if (key !== undefined) {
      void apiKey.set(context.secrets, key)
    }
  })
}
