import * as vscode from 'vscode'
import { setupCommand } from './setup'
import { askAboutSelectionCommand } from './askAboutSelection'
import { testCommand } from './test'

export const registerCommands = (context: vscode.ExtensionContext, subscriptions: vscode.Disposable[]): void => {
  subscriptions.push(setupCommand(context))
  subscriptions.push(askAboutSelectionCommand(context))
  subscriptions.push(testCommand(context))
}
