import { IEditor } from '../Editor'

const validateInput = (value: string | undefined): boolean => {
  if (value === undefined) {
    return false
  }
  if (value.length === 0) {
    return false
  }
  return true
}

export const setupCommand = async (editor: IEditor): Promise<void> => {
  await editor.getUserInput('Enter your OpenAI API Key', 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', 'Invalid API Key', true).then((key) => {
    if (validateInput(key) && key !== undefined) {
      editor.setSecret('openai-api-key', key)
    }
  })
}
