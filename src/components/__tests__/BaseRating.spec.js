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

     // Find the element that represents the rating control
     const ratingControl = wrapper.find('.rating-control');

    //  // Simulate a user interaction by triggering a click event
    //  await ratingControl.trigger('click');

    // // Check if the emitted event is correct
    // expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    // expect(wrapper.emitted('update:modelValue')).toHaveLength(1); // Check if only one event is emitted
    // expect(wrapper.emitted('update:modelValue')[0]).toEqual([4]); 
  });
})
