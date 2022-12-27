import * as vscode from 'vscode'

export const outputChannel = vscode.window.createOutputChannel('GPT Copilot')

export const writeToConsole = (text: string, channel: vscode.OutputChannel): void => {
  channel.appendLine(text)
  channel.show()
}
