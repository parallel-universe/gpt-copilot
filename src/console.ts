import * as vscode from 'vscode'

const channel = vscode.window.createOutputChannel('GPT Copilot')

export const writeToConsole = (text: string) => {
    channel.appendLine(text)
    channel.show()
}