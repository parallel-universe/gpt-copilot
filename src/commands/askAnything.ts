import { IEditor } from '../Editor'
import { IOpenAIWrapper } from '../OpenAIWrapper'

export const askAnythingCommand = async (editor: IEditor, openAiApi: IOpenAIWrapper): Promise<void> => {
  const prompt = await editor.getUserInput('Enter your question', 'What is polymorphism?', 'Invalid question')
  if (prompt !== undefined) {
    const response = await openAiApi.makeRequestWithLoadingIndicator(prompt, editor)
    if (response !== undefined) {
      editor.writeToConsole(response)
    }
  } else {
    void editor.showErrorMessage('No prompt entered')
  }
}
