# GPT for Visual Studio Code

This extension allows you to use the GPT (Generative Pre-trained Transformer) language model from within Visual Studio Code. Your API key is safely stored using the SecretStorage API. Results are printed in the Output window within vscode.

This extension is designed to help new developers with reading and writing code by requesting explainations of highlighted code or entire files. It also allows you to ask for a GPT text completion with any user provided prompt, useful for asking for code snippets or to elaborate on a concept.

More updates to follow to make this useful for more seasoned developers looking to leverage OpenAi APIs in their work.

### Setup

1. You will need to get an API key from [OpenAI  API Keys](https://beta.openai.com/account/api-keys)
2. Using the command pallete menu run the `GPT - Setup` command and input your API key
3. Start using commands either through the command pallete or right-click context menus

## Features

- Stores your API key securely using the vscode SecretStorage API
- Use GPT to explain highlighted code or an entire file
- Ask GPT about highlighted code or an entire file
- Free text input to ask anything you like
- Ouputs response to the output window in vscode
- Configurable GPT settings

## Configuration

You can customize the behavior of the GPT extension by modifying the following settings in Visual Studio Code's settings pane (Ctrl+Comma):

- `gpt-copilot.model`: The name of the GPT-3 model to use for generating the response.
- `gpt-copilot.maxTokens`: The maximum number of tokens to use for the response.
- `gpt-copilot.temperature`: A value between 0 and 1 that determines the randomness of the response. A higher temperature results in a more varied response, while a lower temperature results in a more deterministic response.

## Development

- Docker is used for convienience, you can run the extension in visual studio by hitting f5 in the `extension.ts` file
- Running the tests in docker is tricky, I haven't nailed it yet, it needs to display the application so for now this has to be done locally
- Uses ts-standard to keep things tidy, I don't agree with all of it's opinions but it's a quick solution

## Credits

This extension was built using the [OpenAI API](https://beta.openai.com/docs/api-reference/completions/create) and the [Visual Studio Code Extension API](https://code.visualstudio.com/api).
