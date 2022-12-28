import * as vscode from 'vscode'
import { writeToConsole, outputChannel } from '../io'
import { makeRequest } from '../openai'
import { getCurrentEditorContents, getFileExtension } from '../document'

export const explainFileCommand = (context: vscode.ExtensionContext): vscode.Disposable => {
  return vscode.commands.registerCommand('gpt-copilot.explain_file', async () => {
    const fileContents = getCurrentEditorContents()
    if (fileContents.length > 0) {
      const prompt = `Explain the following ${getFileExtension()} code: ${fileContents}`
      const response = await makeRequest(prompt, context.secrets)
      if (response !== undefined) {
        writeToConsole(response, outputChannel)
      }
    } else {
      void vscode.window.showErrorMessage('The file is empty')
    }
  })
}
