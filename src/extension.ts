import * as vscode from 'vscode'
import { registerCommands } from './commands/registerCommands'

export async function activate (context: vscode.ExtensionContext): Promise<void> {
  const { subscriptions } = context

  registerCommands(context, subscriptions)
}
