import * as vscode from 'vscode'

export const getHighlightedText = (): string => {
  const editor = vscode.window.activeTextEditor
  if (editor != null) {
    const selection = editor.selection
    if (!selection.isEmpty) {
      const selectionRange = new vscode.Range(selection.start.line, selection.start.character, selection.end.line, selection.end.character)
      return editor.document.getText(selectionRange)
    }
  }
  return ''
}
