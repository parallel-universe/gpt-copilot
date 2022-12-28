import * as vscode from 'vscode'
import { writeToConsole, outputChannel, getUserInput } from '../io'
import { makeRequest } from '../openai'
import { getHighlightedText, getFileExtension } from '../document'

export const askAboutSelectionCommand = (context: vscode.ExtensionContext): vscode.Disposable => {
  return vscode.commands.registerCommand('gpt-copilot.ask_about_selection', async () => {
    const highlighted = getHighlightedText()
    if (highlighted.length > 0) {
      const userQuestion = await getUserInput('Enter your question', 'What does this code do?', 'Invalid question')
      const prompt = `${userQuestion}: ${highlighted}`
      const response = await makeRequest(prompt, context.secrets)
      if (response !== undefined) {
        writeToConsole(response, outputChannel)
      }
    } else {
      void vscode.window.showErrorMessage('No text highlighted')
    }
  })
}