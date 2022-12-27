import * as vscode from 'vscode'
import { writeToConsole, outputChannel } from '../console'
import { getHighlightedText } from '../text'

export const askAboutSelectionCommand = (context: vscode.ExtensionContext): vscode.Disposable => {
  return vscode.commands.registerCommand('gpt-copilot.ask_about_selection', () => {
    const highlighted = getHighlightedText()
    if (highlighted.length > 0) {
      // TODO: craft a prompt using highlighted text
      // TODO: Allow user to customise prompt via settings
      // TODO: Show user the response
      writeToConsole(highlighted, outputChannel)
    } else {
      void vscode.window.showErrorMessage('No text highlighted')
    }
  })
}
