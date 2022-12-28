import * as vscode from 'vscode'

export const getConfigValue = <T = string>(key: string): T => vscode.workspace.getConfiguration('gpt-copilot').get(key) as T