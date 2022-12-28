import * as vscode from 'vscode'
import { writeToConsole, outputChannel, getUserInput } from '../io'
import { makeRequest } from '../openai'

export const askAnything = (context: vscode.ExtensionContext): vscode.Disposable => {
  return vscode.commands.registerCommand('gpt-copilot.ask_anything', async () => {
    const prompt = await getUserInput('Enter your question', 'What is polymorphism?', 'Invalid question')
    if (prompt !== undefined) {
      const response = await makeRequest(prompt, context.secrets)
      if (response !== undefined) {
        writeToConsole(response, outputChannel)
      }
    } else {
      void vscode.window.showErrorMessage('No prompt entered')
    }
  })
}