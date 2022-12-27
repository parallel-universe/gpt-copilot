import * as vscode from 'vscode'
import { setupCommand } from './commands/setup'
import { explainSelectionCommand } from './commands/explainSelection'
import { testCommand } from './commands/test'

export const registerCommands = (context: vscode.ExtensionContext, subscriptions: vscode.Disposable[]): void => {
  subscriptions.push(setupCommand(context))
  subscriptions.push(explainSelectionCommand(context))
  subscriptions.push(testCommand(context))
}
