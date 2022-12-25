import * as vscode from 'vscode'
import { getApiKeyFromUser } from '../auth'

export const setupCommand = (context: vscode.ExtensionContext): vscode.Disposable => {
    return  vscode.commands.registerCommand('gpt-copilot.setup', () => {
        void getApiKeyFromUser(context)
    })
}