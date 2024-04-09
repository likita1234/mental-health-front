import { shallowMount } from '@vue/test-utils';
import BaseTextInput from '../../components/form-inputs/BaseTextInput.vue';
import { describe, it, expect } from 'vitest'

describe('BaseTextInput', () => {
  it('renders correctly with provided props', async () => {
    const label = 'Test Label';
    const errorMessage = 'Test Error Message';
    const modelValue = 'Test Input Value';
    const type = 'email'; // Example type
    const icon = 'pi pi-search'; // Example icon
    const floatLabel = true;
    const size = 'large'; // Example size

    const wrapper = shallowMount(BaseTextInput, {
      props: {
        modelValue,
        label,
        errorMessage,
        type,
        icon,
        floatLabel,
        size,
      },
    });

    // Assert that the label is rendered correctly
    expect(wrapper.find('label').text()).toBe(label);

     // Assert that the input value is set correctly
    const inputTextComponent = wrapper.getComponent(BaseTextInput);
    expect(inputTextComponent.exists()).toBe(true);
    expect(inputTextComponent.props('modelValue')).toBe(modelValue);

    // Assert that the error message is rendered correctly
    expect(wrapper.find('.p-error').text()).toBe(errorMessage);

    // Assert that the input type is set correctly
    expect(wrapper.find('InputText').attributes('type')).toBe(type);

    // Assert that the icon is rendered correctly
    expect(wrapper.find('.pi').exists()).toBe(true);
    expect(wrapper.find('.pi').classes().join(' ')).toContain(icon);

    // Assert that the float label is rendered correctly
    expect(wrapper.find('.p-float-label').exists()).toBe(true);

   // Assert that the input size is set correctly
    expect(wrapper.find('InputText').attributes('size')).toBe(size);

  });
  it('updates modelValue prop correctly when input value changes', async () => {
    const wrapper = shallowMount(BaseTextInput);
    const newValue = 'New Input Value';
    const input = wrapper.find('input'); // Find the input element associated with InputText
// Ensure the input element is found before proceeding
if (input.exists()) {
  // Set the value property of the input element
  input.element.value = newValue;
  console.log(input.element);

  // Trigger the input event on the input element
  await input.trigger('input');

  // Wait for the component to update
  await wrapper.vm.$nextTick();

  // Assert that the modelValue prop is updated
  expect(wrapper.emitted('update:modelValue')).toBeTruthy();
  expect(wrapper.emitted('update:modelValue')[0]).toEqual([newValue]);
} else {
  // Handle case where input element is not found
  console.error('Input element not found');
}
  });
});