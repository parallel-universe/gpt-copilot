import * as vscode from 'vscode';

const saveCredentials = async (context: vscode.ExtensionContext, key: string) => {
    await context.secrets.store("openai-api-key", key);
    vscode.window.showInformationMessage("OpenAI API Key saved successfully");
}

export const getApiKeyFromStorage = async (context: vscode.ExtensionContext) => {
    const key = await context.secrets.get("openai-api-key");
    return key;
}

export const getApiKeyFromUser = async (context: vscode.ExtensionContext) => {
    const key = await vscode.window.showInputBox({
        prompt: "Enter your OpenAI API Key",
        placeHolder: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
        ignoreFocusOut: true,
        password: true,
        validateInput: (value: string) => {
            if (value.length === 0) {
                return "Invalid API Key";
            }
            return null;
        },
    });
    if (key) {
        saveCredentials(context, key);
    }
}
