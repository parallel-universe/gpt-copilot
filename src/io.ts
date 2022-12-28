import * as vscode from 'vscode'

export const outputChannel = vscode.window.createOutputChannel('GPT Copilot')

export const writeToConsole = (text: string, channel: vscode.OutputChannel): void => {
  channel.appendLine(text)
  channel.show()
}

export const getUserInput = async (prompt:string, placeHolder:string, errorText:string): Promise<string | undefined> => {
  return await vscode.window.showInputBox({
    prompt: prompt,
    placeHolder: placeHolder,
    ignoreFocusOut: true,
    validateInput: (value: string) => {
      if (value.length === 0) {
        return errorText
      }
      return null
    }
  })
}
