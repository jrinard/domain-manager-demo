import { createFormFactory, FormOptions } from '@tanstack/react-form'
import { zodValidator } from '@tanstack/zod-form-adapter'
import { omit } from 'lodash'

export const createForm = <TFormData>(options: FormOptions<TFormData>) => {
  const formFactory = createFormFactory<TFormData, any>()
  const form = formFactory.useForm({
    ...omit(options, 'validatorAdapter'),
    validatorAdapter: zodValidator,
  })
  return form
}
