import * as vscode from 'vscode'

export const setApiKey = async (secrets: vscode.SecretStorage, key: string): Promise<void> => {
  void secrets.store('openai-api-key', key)
  void vscode.window.showInformationMessage('API Key saved')
}

export const getApiKey = async (secrets: vscode.SecretStorage): Promise<string | undefined> => {
  const key = await secrets.get('openai-api-key')
  return key
}
