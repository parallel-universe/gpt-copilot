import * as vscode from 'vscode'
import { setupCommand } from './commands/setup'
import { explainSelectionCommand } from './commands/explainSelection'
import { askAboutSelectionCommand } from './commands/askAboutSelection'
import { explainFileCommand } from './commands/explainFile'
import { askAboutFileCommand } from './commands/askAboutFile'
import { askAnything } from './commands/askAnything'

export async function activate (context: vscode.ExtensionContext): Promise<void> {
  const { subscriptions } = context

  subscriptions.push(setupCommand(context))
  subscriptions.push(explainSelectionCommand(context))
  subscriptions.push(askAboutSelectionCommand(context))
  subscriptions.push(explainFileCommand(context))
  subscriptions.push(askAboutFileCommand(context))
  subscriptions.push(askAnything(context))
}
