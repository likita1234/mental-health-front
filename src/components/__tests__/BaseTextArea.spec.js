import { mount } from '@vue/test-utils'
import BaseTextarea from '../../components/form-inputs/BaseTextarea.vue'
import { describe, it, expect } from 'vitest'

describe('BaseTextarea', () => {
  it('renders correctly with default props', async () => {
    const label = 'Username'
    const wrapper = mount(BaseTextarea, {
      props: {
        label,
      }
    })

    // Check if label is correctly displayed
    expect(wrapper.find('label').text()).toBe(label)

    // Check if Textarea component receives the correct props for rows and cols
    const textarea = wrapper.find('textarea')
    expect(textarea.attributes('rows')).toBe('5') // Default value for rows
    expect(textarea.attributes('cols')).toBe('30') // Default value for cols

    // Check if error message is displayed correctly
    const errorMessage = 'This field is required'
    await wrapper.setProps({ errorMessage })
    expect(wrapper.find('.p-error').text()).toBe(errorMessage)

    // Simulate user input and check if update:modelValue event is emitted with the correct value
    await wrapper.setValue('Test input')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')[0]).toEqual(['Test input'])
  })
})
