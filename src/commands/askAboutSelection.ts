import * as vscode from 'vscode'
import { writeToConsole } from '../console'
import { getHighlightedText } from '../text'

export const askAboutSelectionCommand = (context: vscode.ExtensionContext): vscode.Disposable => {
  return vscode.commands.registerCommand('gpt-copilot.ask_about_selection', () => {
    const highlighted = getHighlightedText()
    if (highlighted.length > 0) {
      writeToConsole(highlighted)
    } else {
      void vscode.window.showErrorMessage('No text highlighted')
    }
  })
}
