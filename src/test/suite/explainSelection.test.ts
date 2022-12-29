import { instance, mock, when, verify, anything } from 'ts-mockito'
import { explainSelectionCommand } from '../../commands/explainSelection'
import { IEditor } from '../../Editor'
import { IOpenAIWrapper } from '../../OpenAIWrapper'

suite('Explain selection command - test suite', () => {
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

  test('when the user explains a selection with content the API is called', async () => {
    when(mockedEditor.getHighlightedText()).thenReturn('some content')
    await explainSelectionCommand(editor, openAiApi)
    verify(mockedOpenAiApi.makeRequestWithLoadingIndicator(anything(), editor)).once()
  })

  test('when the user explains a selection with no content the API is not called', async () => {
    when(mockedEditor.getHighlightedText()).thenReturn('')
    await explainSelectionCommand(editor, openAiApi)
    verify(mockedOpenAiApi.makeRequestWithLoadingIndicator(anything(), editor)).never()
  })

  test('when the API returns a response, it is written to the console', async () => {
    when(mockedEditor.getHighlightedText()).thenReturn('some content')
    when(mockedOpenAiApi.makeRequestWithLoadingIndicator(anything(), editor)).thenReturn(Promise.resolve('some response'))
    await explainSelectionCommand(editor, openAiApi)
    verify(mockedEditor.writeToConsole('some response')).once()
  })

  test('when the selection is empty, an error is shown', async () => {
    when(mockedEditor.getHighlightedText()).thenReturn('')
    await explainSelectionCommand(editor, openAiApi)
    verify(mockedEditor.showErrorMessage('No text highlighted')).once()
  })
})
