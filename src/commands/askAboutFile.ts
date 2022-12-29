import * as vscode from 'vscode'
import { writeToConsole, outputChannel, getUserInput } from '../io'
import { makeRequestWithLoadingIndicator } from '../openai'
import { getCurrentEditorContents } from '../document'

export const askAboutFileCommand = (context: vscode.ExtensionContext): vscode.Disposable => {
  return vscode.commands.registerCommand('gpt-copilot.ask_about_file', async () => {
    const fileContents = getCurrentEditorContents()
    if (fileContents.length > 0) {
      const userQuestion = await getUserInput('Enter your question', 'What does this code do?', 'Invalid question')
      const prompt = `${userQuestion}: ${fileContents}`
      const response = await makeRequestWithLoadingIndicator(prompt, context.secrets)
      if (response !== undefined) {
        writeToConsole(response, outputChannel)
      }
    } else {
      void vscode.window.showErrorMessage('File is empty')
    }
  })
}