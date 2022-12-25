import * as vscode from 'vscode'
import { writeToConsole } from '../console'

export const askAboutSelectionCommand = (context: vscode.ExtensionContext): vscode.Disposable => {
    return vscode.commands.registerCommand('gpt-copilot.ask_about_selection', () => {
      const editor = vscode.window.activeTextEditor
      if (editor) {
        const selection = editor.selection
        if (selection && !selection.isEmpty) {
          const selectionRange = new vscode.Range(selection.start.line, selection.start.character, selection.end.line, selection.end.character);
          const highlighted = editor.document.getText(selectionRange);
          writeToConsole(highlighted)
        }
      }
    })
}