import { instance, mock, when, verify, anything } from 'ts-mockito'
import { askAboutSelectionCommand } from '../../commands/askAboutSelection'
import { IEditor } from '../../Editor'
import { IOpenAIWrapper } from '../../OpenAIWrapper'

suite('Ask about selection command - test suite', () => {
  let editor: IEditor
  let mockedEditor: IEditor
  let openAiApi: IOpenAIWrapper
  let mockedOpenAiApi: IOpenAIWrapper

  setup(() => {
    mockedEditor = mock<IEditor>()
    editor = instance(mockedEditor)
    mockedOpenAiApi = mock<IOpenAIWrapper>()
    openAiApi = instance(mockedOpenAiApi)
  })

  test('when the selection is empty, an error is shown', async () => {
    when(mockedEditor.getHighlightedText()).thenReturn('')
    await askAboutSelectionCommand(editor, openAiApi)
    verify(mockedEditor.showErrorMessage('No text highlighted')).once()
  })

  test('when the selection is not empty, the user is prompted for a question', async () => {
    when(mockedEditor.getHighlightedText()).thenReturn('some code')
    await askAboutSelectionCommand(editor, openAiApi)
    verify(mockedEditor.getUserInput('Enter your question', 'What does this code do?', 'Invalid question')).once()
  })

  test('when the user enters a question, the API is called', async () => {
    when(mockedEditor.getHighlightedText()).thenReturn('some code')
    when(mockedEditor.getUserInput('Enter your question', 'What does this code do?', 'Invalid question')).thenReturn(Promise.resolve('some question'))
    await askAboutSelectionCommand(editor, openAiApi)
    verify(mockedOpenAiApi.makeRequestWithLoadingIndicator(anything(), editor)).once()
  })

  test('when the user does not enter a question, the API is not called', async () => {
    when(mockedEditor.getHighlightedText()).thenReturn('some code')
    when(mockedEditor.getUserInput('Enter your question', 'What does this code do?', 'Invalid question')).thenReturn(Promise.resolve(undefined))
    await askAboutSelectionCommand(editor, openAiApi)
    verify(mockedOpenAiApi.makeRequestWithLoadingIndicator(anything(), editor)).never()
  })

  test('when the API returns a response, it is written to the console', async () => {
    when(mockedEditor.getHighlightedText()).thenReturn('some code')
    when(mockedEditor.getUserInput('Enter your question', 'What does this code do?', 'Invalid question')).thenReturn(Promise.resolve('some question'))
    when(mockedOpenAiApi.makeRequestWithLoadingIndicator(anything(), editor)).thenReturn(Promise.resolve('some response'))
    await askAboutSelectionCommand(editor, openAiApi)
    verify(mockedEditor.writeToConsole('some response')).once()
  })
})
