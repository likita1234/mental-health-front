import { mount, shallowMount } from '@vue/test-utils'
import BaseRating from '../../components/form-inputs/BaseRating.vue'
import { describe, it, expect } from 'vitest'

describe('BaseRating', () => {
  it('renders correctly with default props', async () => {
    const wrapper = shallowMount(BaseRating, {
      props: {
        modelValue: 3, // Initial value for testing
        label: 'Rating Label',
        description: 'Rating Description',
        stars: 5,
        cancel: false,
        readOnly: false
      }
    })
    expect(wrapper.find('label').text()).toBe('Rating Label')
    expect(wrapper.find('.text-center').text()).toBe('Rating Description')
  })

  it('emits update:modelValue when rating changes', async () => {
    const wrapper = mount(BaseRating, {
      props: {
        label: 'Rating',
        description: 'Please rate this product',
        modelValue: 3, // Initial value for testing
        stars: 5,
        cancel: false,
        readOnly: false
      }
    });


   // Trigger the change event with the desired value
   await wrapper.setValue(4);

   // Ensure that the component has updated
   await wrapper.vm.$nextTick();

   // Check if the emitted event is correct
   expect(wrapper.emitted('update:modelValue')).toBeTruthy();
   expect(wrapper.emitted('update:modelValue')).toHaveLength(1);
   expect(wrapper.emitted('update:modelValue')[0]).toEqual([4]);

  })
})
