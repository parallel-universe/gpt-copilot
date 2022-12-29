import { instance, mock, when, verify, anything } from 'ts-mockito'
import { explainFileCommand } from '../../commands/explainFile'
import { IEditor } from '../../Editor'
import { IOpenAIWrapper } from '../../OpenAIWrapper'

suite('Explain file command - test suite', () => {
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

  test('when the user explains a file with content the API is called', async () => {
    when(mockedEditor.getCurrentFileContents()).thenReturn('some content')
    await explainFileCommand(editor, openAiApi)
    verify(mockedOpenAiApi.makeRequestWithLoadingIndicator(anything(), editor)).once()
  })

  test('when the user explains a file with no content the API is not called', async () => {
    when(mockedEditor.getCurrentFileContents()).thenReturn('')
    await explainFileCommand(editor, openAiApi)
    verify(mockedOpenAiApi.makeRequestWithLoadingIndicator(anything(), editor)).never()
  })

  test('when the API returns a response, it is written to the console', async () => {
    when(mockedEditor.getCurrentFileContents()).thenReturn('some content')
    when(mockedOpenAiApi.makeRequestWithLoadingIndicator(anything(), editor)).thenReturn(Promise.resolve('some response'))
    await explainFileCommand(editor, openAiApi)
    verify(mockedEditor.writeToConsole('some response')).once()
  })

  test('when the file is empty, an error is shown', async () => {
    when(mockedEditor.getCurrentFileContents()).thenReturn('')
    await explainFileCommand(editor, openAiApi)
    verify(mockedEditor.showErrorMessage('The file is empty')).once()
  })
})
