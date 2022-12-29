
import { IEditor } from '../../Editor'
import { when, anything, instance, mock, verify } from 'ts-mockito'
import { setupCommand } from '../../commands/setup'

suite('Setup command - test suite', () => {
  let editor: IEditor
  let mockedEditor: IEditor

  setup(() => {
    mockedEditor = mock<IEditor>()
    editor = instance(mockedEditor)
  })

  test('tests that the user is prompted for an API key', async () => {
    when(mockedEditor.getUserInput('Enter your OpenAI API Key', 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', 'Invalid API Key', true))
      .thenReturn(Promise.resolve('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'))
    await setupCommand(editor)
    verify(mockedEditor.getUserInput('Enter your OpenAI API Key', 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', 'Invalid API Key', true)).once()
  })

  test('when the user enters an API key, it is stored', async () => {
    when(mockedEditor.getUserInput('Enter your OpenAI API Key', 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', 'Invalid API Key', true))
      .thenReturn(Promise.resolve('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'))
    await setupCommand(editor)
    verify(mockedEditor.setSecret('openai-api-key', 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')).once()
  })

  test('when the user does not enter an API key, storage is not called', async () => {
    when(mockedEditor.getUserInput('Enter your OpenAI API Key', 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', 'Invalid API Key', true))
      .thenReturn(Promise.resolve(undefined))
    await setupCommand(editor)
    verify(mockedEditor.setSecret(anything(), anything())).never()
  })

  test('when the key length is zero, its not sent to secret storage', async () => {
    when(mockedEditor.getUserInput('Enter your OpenAI API Key', 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', 'Invalid API Key', true))
      .thenReturn(Promise.resolve(''))
    await setupCommand(editor)
    verify(mockedEditor.setSecret(anything(), anything())).never()
  })
})
