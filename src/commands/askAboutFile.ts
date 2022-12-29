import { IOpenAIWrapper } from '../OpenAIWrapper'
import { IEditor } from '../Editor'

export const askAboutFileCommand = async (editor: IEditor, openAiApi: IOpenAIWrapper): Promise<void> => {
  const fileContents = editor.getCurrentFileContents()
  const userQuestion = await editor.getUserInput('Enter your question', 'What does this code do?', 'Invalid question')
  if (fileContents.length > 0 && userQuestion !== undefined) {
    const prompt = `${userQuestion}: ${fileContents}`
    const response = await openAiApi.makeRequestWithLoadingIndicator(prompt, editor)
    if (response !== undefined) {
      editor.writeToConsole(response)
    }
  } else {
    editor.showErrorMessage('File is empty')
  }
}
