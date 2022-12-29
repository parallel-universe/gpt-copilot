import { instance, mock, when, verify, anything } from 'ts-mockito'
import { askAnythingCommand } from '../../commands/askAnything'
import { IEditor } from '../../Editor'
import { IOpenAIWrapper } from '../../OpenAIWrapper'

suite('Ask anything command - test suite', () => {
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

  test('when the user enters a question, the API is called', async () => {
    when(mockedEditor.getUserInput('Enter your question', 'What is polymorphism?', 'Invalid question')).thenReturn(Promise.resolve('some question'))
    await askAnythingCommand(editor, openAiApi)
    verify(mockedOpenAiApi.makeRequestWithLoadingIndicator(anything(), editor)).once()
  })

  test('when the user does not enter a question, the API is not called', async () => {
    when(mockedEditor.getUserInput('Enter your question', 'What is polymorphism?', 'Invalid question')).thenReturn(Promise.resolve(undefined))
    await askAnythingCommand(editor, openAiApi)
    verify(mockedOpenAiApi.makeRequestWithLoadingIndicator(anything(), editor)).never()
  })

  test('when the API returns a response, it is written to the console', async () => {
    when(mockedEditor.getUserInput('Enter your question', 'What is polymorphism?', 'Invalid question')).thenReturn(Promise.resolve('some question'))
    when(mockedOpenAiApi.makeRequestWithLoadingIndicator(anything(), editor)).thenReturn(Promise.resolve('some response'))
    await askAnythingCommand(editor, openAiApi)
    verify(mockedEditor.writeToConsole('some response')).once()
  })
})
