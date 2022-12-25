import * as vscode from 'vscode'

export const setApiKey = async (context: vscode.ExtensionContext, key: string): Promise<void> => {
  void context.secrets.store('openai-api-key', key)
  void vscode.window.showInformationMessage('API Key saved')
}

export const getApiKey = async (context: vscode.ExtensionContext): Promise<string | undefined> => {
  const key = await context.secrets.get('openai-api-key')
  return key
}
