import * as vscode from 'vscode'
import { setupCommand } from './commands/setup'
import { askAboutSelectionCommand } from './commands/askAboutSelection'
import { testCommand } from './commands/test'

export const registerCommands = (context: vscode.ExtensionContext, subscriptions: vscode.Disposable[]): void => {
  subscriptions.push(setupCommand(context))
  subscriptions.push(askAboutSelectionCommand(context))
  subscriptions.push(testCommand(context))
}
