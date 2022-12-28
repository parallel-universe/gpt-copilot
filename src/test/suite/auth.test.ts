import * as vscode from 'vscode'
import * as assert from 'assert'
import { instance, mock, verify, when } from 'ts-mockito'
import { apiKey } from '../../apiKey'

suite('Auth test suite', () => {
  let secrets: vscode.SecretStorage
  let mockedSecrets: vscode.SecretStorage

  setup(() => {
    mockedSecrets = mock<vscode.SecretStorage>()
    secrets = instance(mockedSecrets)
    when(mockedSecrets.get('openai-api-key')).thenReturn(Promise.resolve('test'))
  })

  test('tests that the API key is set', async () => {
    await apiKey.set(secrets, 'test')
    verify(mockedSecrets.store('openai-api-key', 'test')).once()
  })

  test('tests that the API key is retrieved', async () => {
    let key: string | undefined
    await apiKey.get(secrets).then((result) => {
      key = result
    })
    assert.strictEqual(key, 'test')
    verify(mockedSecrets.get('openai-api-key')).once()
  })
})
