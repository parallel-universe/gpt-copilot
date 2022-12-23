# GPT for Visual Studio Code

This extension allows you to use the GPT (Generative Pre-training Transformer) language model from within Visual Studio Code. It uses Docker to run a Node.js environment and is written in TypeScript.

## Features

- Use GPT to explain highlighted code or an entire file
- Ask GPT to suggest changes to a file or block of code
- Ask GPT to create code from scratch
- Free text input to ask anything you like

## Development

- Docker is used for convienience, you can run the extension in visual studio by hitting f5 in the `extension.ts` file

## Installation (Not published yet)

1. Open Visual Studio Code's extensions pane (Ctrl+Shift+X).
2. Search for "GPT" and click "Install" on the GPT extension.
3. Reload Visual Studio Code if prompted.

## Configuration

You can customize the behavior of the GPT extension by modifying the following settings in Visual Studio Code's settings pane (Ctrl+Comma):

- `gpt.key`: The API key for accessing the OpenAI API.
- `gpt.model`: The name of the GPT-3 model to use for generating the response.
- `gpt.max_tokens`: The maximum number of tokens to use for the response.
- `gpt.n`: The number of completions to generate for the prompt.
- `gpt.stop`: (Optional) A sequence of characters that indicates the end of the response.
- `gpt.temperature`: A value between 0 and 1 that determines the randomness of the response. A higher temperature results in a more varied response, while a lower temperature results in a more deterministic response.

## Usage

User experience to follow

## Makefile

This extension includes a Makefile with the following targets:

- `npm_install`: Runs `npm install` within a Docker container to install the dependencies specified in the project's `package.json` file.
- `npm_compile`: Runs `npm compile`, which compiles the source code of the project.
- `up`: Runs `docker-compose up` in detached mode (the `-d` flag), which starts the Docker containers for the project.
- `logs`: Runs `docker-compose logs`, which displays the logs for all the services defined in the `docker-compose.yml` file. The `-f` flag follows the logs, which means it will display new log messages as they are generated.

## Credits

This extension was built using the [OpenAI API](https://beta.openai.com/docs/api-reference/completions/create) and the [Visual Studio Code Extension API](https://code.visualstudio.com/api).
