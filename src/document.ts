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

export const getCurrentEditorContents = (): string => {
  const editor = vscode.window.activeTextEditor
  if (editor != null) {
    const document = editor.document
    return document.getText()
  }
  return ''
}

export const getFileExtension = (): string => {
  const editor = vscode.window.activeTextEditor
  if (editor != null) {
    const fileName = editor.document.fileName
    const extension = fileName.split('.').pop()
    if (extension != null) {
      return extension
    }
  }
  return ''
}
