import { mount, shallowMount } from '@vue/test-utils'
import BaseAutoComplete from '../../components/form-inputs/BaseAutoComplete.vue'
import { describe, it, expect } from 'vitest'

describe('BaseAutoComplete', () => {
  it('renders label when prop "label" is provided', () => {
    const wrapper = mount(BaseAutoComplete, {
      props: {
        label: 'Test Label'
      }
    })

    expect(wrapper.find('label').text()).toBe('Test Label:')
  })

  it('renders placeholder text in Autocomplete when prop "placeholder" is provided', () => {
    const wrapper = shallowMount(BaseAutoComplete, {
      // Stub the Autocomplete component
      global: {
        stubs: {
          Autocomplete: {
            template: '<div></div>'
          }
        }
      },
      props: {
        placeholder: 'Test Placeholder'
      }
    })

    // Assert that the placeholder text is rendered correctly
    expect(wrapper.findComponent({ ref: 'autocomplete' }).attributes('placeholder')).toBe(
      'Test Placeholder'
    )
  })

  it('emits "item-select" event when an item is selected', async () => {
    const wrapper = shallowMount(BaseAutoComplete, {
      // Stub the Autocomplete component
      global: {
        stubs: {
          Autocomplete: {
            template: '<div></div>',
            emits: ['item-select'] // Add the emitted events for the stubbed component
          }
        }
      }
    })

    // Simulate selecting an item in the Autocomplete component
    await wrapper
      .findComponent({ ref: 'autocomplete' })
      .vm.$emit('item-select', { value: 'selected item' })

    // Debugging: Log emitted events
    // console.log('Emitted events:', wrapper.emitted());

    // Assert that the "item-select" event is emitted with the correct data
    expect(wrapper.emitted('item-select')).toBeTruthy()
    expect(wrapper.emitted('item-select')[0]).toEqual(['selected item'])
  })

  it('emits "complete" event when Autocomplete is completed', async () => {
    const wrapper = shallowMount(BaseAutoComplete, {
      // Stub the Autocomplete component
      global: {
        stubs: {
          Autocomplete: {
            template: '<div></div>',
            emits: ['complete'] // Add the emitted events for the stubbed component
          }
        }
      }
    })

    // Simulate Autocomplete completion
    await wrapper
      .findComponent({ ref: 'autocomplete' })
      .vm.$emit('complete', { query: 'completed query' })

    // Assert that the "complete" event is emitted with the correct data
    expect(wrapper.emitted('complete')).toBeTruthy()
    expect(wrapper.emitted('complete')[0]).toEqual(['completed query'])
  })
})
