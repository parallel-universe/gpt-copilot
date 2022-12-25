import * as vscode from 'vscode'

const channel = vscode.window.createOutputChannel('GPT Copilot')

export const writeToConsole = (text: string): void => {
  channel.appendLine(text)
  channel.show()
}
