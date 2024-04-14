import { mount, shallowMount } from '@vue/test-utils'
import BaseSelectionInput from '../../components/form-inputs/BaseSelectionInput.vue'
import { describe, it, expect } from 'vitest'

describe('BaseSelectionInput', () => {
  it('renders correctly with default props', () => {
    const wrapper = shallowMount(BaseSelectionInput, {
      props: {
        label: 'Custom Label'
      }
    })

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('label').text()).toBe('Custom Label:')
    expect(wrapper.find('.flex.flex-column')).toBeTruthy()
  })

  it('renders RadioButton elements when radio prop is true', async () => {
    // Mock props and injection
    const options = [
      { title: { en: 'Option 1', fr: 'Option 1' }, optionValue: 'value1' },
      { title: { en: 'Option 2', fr: 'Option 2' }, optionValue: 'value2' },
    ];
    const appState = { lang: 'en' };

    // Mount the component with props
    const wrapper = mount(BaseSelectionInput, {
      props: {
        modelValue: null,
        label: 'Field Label',
        radio: true,
        options,
        disabled: false,
      },
      global: {
        provide: {
          appState,
        },
      },
      // Register RadioButton as a global component
      components: {
        RadioButton: {
          template: '<div><RadioButton/></div>', // Example template for testing purposes
        },
      },
    });

    // Find all RadioButton elements
    const radioButtons = wrapper.findAllComponents({ name: 'RadioButton' });

    // Assert the number of RadioButton elements
    expect(radioButtons).toHaveLength(options.length);

    options.forEach((option, index) => {
      // Access the name attribute of each RadioButton component
      const radioButton = radioButtons[index];
      const nameAttribute = radioButton.attributes('name');
    
      // Compare the name attribute with the expected value
      expect(nameAttribute).toBe(option.title[appState.lang]);
    });


       // Trigger change event on each RadioButton element
       await Promise.all(radioButtons.map(async radioButton => {
        await radioButton.trigger('change');
      }));
  
      // Assert that the change event was triggered on each RadioButton element
      expect(wrapper.emitted('change')).toHaveLength(radioButtons.length);
  });
});
