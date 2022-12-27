import * as vscode from 'vscode'
import { writeToConsole, outputChannel } from '../console'
import { makeRequest } from '../openai'
import { getHighlightedText } from '../text'

export const askAboutSelectionCommand = (context: vscode.ExtensionContext): vscode.Disposable => {
  return vscode.commands.registerCommand('gpt-copilot.ask_about_selection', async () => {
    const highlighted = getHighlightedText()
    if (highlighted.length > 0) {
      const prompt = `Explain the following code: ${highlighted}`;
      const response = await makeRequest(prompt, context.secrets);
      if (response) {
        writeToConsole(response, outputChannel)
      }
    } else {
      void vscode.window.showErrorMessage('No text highlighted')
    }
  })
}
