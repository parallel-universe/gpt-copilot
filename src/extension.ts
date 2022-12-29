import * as vscode from 'vscode'
import { setupCommand } from './commands/setup'
import { explainSelectionCommand } from './commands/explainSelection'
import { askAboutSelectionCommand } from './commands/askAboutSelection'
import { explainFileCommand } from './commands/explainFile'
import { askAboutFileCommand } from './commands/askAboutFile'
import { askAnythingCommand } from './commands/askAnything'
import { Editor } from './Editor'
import { OpenAIWrapper } from './OpenAIWrapper'

export async function activate (context: vscode.ExtensionContext): Promise<void> {
  const { subscriptions } = context
  const editor = new Editor(context)
  const OpenAiAPI = new OpenAIWrapper()

  const setup = vscode.commands.registerCommand('gpt-copilot.setup', async () => {
    await setupCommand(editor)
  })

  const explainSelection = vscode.commands.registerCommand('gpt-copilot.explain_selection', async () => {
    await explainSelectionCommand(editor, OpenAiAPI)
  })

  const askAboutSelection = vscode.commands.registerCommand('gpt-copilot.ask_about_selection', async () => {
    await askAboutSelectionCommand(editor, OpenAiAPI)
  })

  const explainFile = vscode.commands.registerCommand('gpt-copilot.explain_file', async () => {
    await explainFileCommand(editor, OpenAiAPI)
  })

  const askAboutFile = vscode.commands.registerCommand('gpt-copilot.ask_about_file', async () => {
    await askAboutFileCommand(editor, OpenAiAPI)
  })

  const askAnything = vscode.commands.registerCommand('gpt-copilot.ask_anything', async () => {
    await askAnythingCommand(editor, OpenAiAPI)
  })

  subscriptions.push(setup)
  subscriptions.push(explainSelection)
  subscriptions.push(askAboutSelection)
  subscriptions.push(explainFile)
  subscriptions.push(askAboutFile)
  subscriptions.push(askAnything)
}
