import { IOpenAIWrapper } from '../OpenAIWrapper'
import { IEditor } from '../Editor'

export const explainSelectionCommand = async (editor: IEditor, openAiApi: IOpenAIWrapper): Promise<void> => {
  const highlighted = editor.getHighlightedText()
  if (highlighted.length > 0) {
    const prompt = `Explain the following ${editor.getCurrentFileExtension()} code: ${highlighted}`
    const response = await openAiApi.makeRequestWithLoadingIndicator(prompt, editor)
    if (response !== undefined) {
      editor.writeToConsole(response)
    }
  } else {
    void editor.showErrorMessage('No text highlighted')
  }
}
