import * as vscode from 'vscode'

const saveCredentials = async (context: vscode.ExtensionContext, key: string): Promise<void> => {
  void context.secrets.store('openai-api-key', key)
  void vscode.window.showInformationMessage('API Key saved')
}

export const getApiKeyFromStorage = async (context: vscode.ExtensionContext): Promise<string | undefined> => {
  const key = await context.secrets.get('openai-api-key')
  return key
}

export const getApiKeyFromUser = async (context: vscode.ExtensionContext): Promise<void> => {
  await vscode.window.showInputBox({
    prompt: 'Enter your OpenAI API Key',
    placeHolder: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    ignoreFocusOut: true,
    password: true,
    validateInput: (value: string) => {
      if (value.length === 0) {
        return 'Invalid API Key'
      }
      return null
    }
  }).then((key) => {
    if (key !== undefined) {
      void saveCredentials(context, key)
    }
  })
}
