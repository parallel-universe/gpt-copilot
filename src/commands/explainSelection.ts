import * as vscode from 'vscode'
import { writeToConsole, outputChannel } from '../console'
import { makeRequest } from '../openai'
import { getHighlightedText, getFileExtension } from '../document'

export const explainSelectionCommand = (context: vscode.ExtensionContext): vscode.Disposable => {
  return vscode.commands.registerCommand('gpt-copilot.explain_selection', async () => {
    const highlighted = getHighlightedText()
    if (highlighted.length > 0) {
      const prompt = `Explain the following ${getFileExtension()} code: ${highlighted}`
      const response = await makeRequest(prompt, context.secrets)
      if (response !== undefined) {
        writeToConsole(response, outputChannel)
      }
    } else {
      void vscode.window.showErrorMessage('No text highlighted')
    }
  })
}
