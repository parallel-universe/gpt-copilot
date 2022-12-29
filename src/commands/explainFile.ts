import { IOpenAIWrapper } from '../OpenAIWrapper'
import { IEditor } from '../Editor'

export const explainFileCommand = async (editor: IEditor, openAiApi: IOpenAIWrapper): Promise<void> => {
  const fileContents = editor.getCurrentFileContents()
  if (fileContents.length > 0) {
    const prompt = `Explain the following ${editor.getCurrentFileExtension()} code: ${fileContents}`
    const response = await openAiApi.makeRequestWithLoadingIndicator(prompt, editor)
    if (response !== undefined) {
      editor.writeToConsole(response)
    }
  } else {
    void editor.showErrorMessage('The file is empty')
  }
}
