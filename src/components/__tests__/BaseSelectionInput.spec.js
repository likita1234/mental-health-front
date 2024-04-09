import { mount, shallowMount } from '@vue/test-utils'
import BaseSelectionInput from '../../components/form-inputs/BaseSelectionInput.vue'
import { describe, it, expect } from 'vitest'

describe('BaseSelectionInput', () => {
    it('renders correctly with default props', () => {
      const wrapper = shallowMount(BaseSelectionInput, {
        props: {
          label:'Custom Label',
        }
    })
  
      expect(wrapper.exists()).toBe(true);
      expect(wrapper.find('label').text()).toBe('Custom Label:');
      expect(wrapper.find('.flex.flex-column')).toBeTruthy();
    });

    describe('YourComponent', () => {
        it('renders radio buttons when radio prop is true', async () => {
          const options = [
            { title: { en: 'Option 1', fr: 'Option 1' }, optionValue: 'value1' },
            { title: { en: 'Option 2', fr: 'Option 2' }, optionValue: 'value2' },
          ];
      
          const appState = {
            lang: 'en'
          };
      
          // Mount the component with radio prop set to true
          const wrapper = mount(YourComponent, {
            props: {
              options,
              radio: true, // Set radio prop to true
            },
            global: {
              provide: {
                appState
              }
            }
          });
      
          // Check if RadioButton components are rendered
          const radioButtons = wrapper.findAllComponents(RadioButton);
          expect(radioButtons).toHaveLength(options.length); // Ensure the correct number of radio buttons are rendered
      
          // Check if Checkbox components are not rendered
          const checkboxes = wrapper.findAll('checkbox'); // Replace 'checkbox' with actual selector for the Checkbox component
          expect(checkboxes).toHaveLength(0); // Ensure no checkbox components are rendered
        });
      });
    
});