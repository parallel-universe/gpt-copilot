import { Configuration, OpenAIApi } from "openai";
import * as vscode from "vscode";
import { getApiKey } from "./auth";

const getConfigValue = <T = string>(key: string) => vscode.workspace.getConfiguration('gpt-copilot').get(key) as T;

export const makeRequest = async (text: string, secrets: vscode.SecretStorage): Promise<string | undefined> => {
    const config = new Configuration({
        apiKey: await getApiKey(secrets),
        organization: getConfigValue('organization'),
    });
    const openai = new OpenAIApi(config);
    const response = await openai.createCompletion({
        prompt: text,
        max_tokens: getConfigValue('maxTokens'),
        temperature: getConfigValue('temperature'),
        model: getConfigValue('model'),
        n: 1,
        stream: false
    });
    return response.data.choices[0].text;
}
