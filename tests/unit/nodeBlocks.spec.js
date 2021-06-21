import Vue from 'vue';
import { shallowMount } from '@vue/test-utils'
import NodeBlocks from '@/components/NodeBlocks.vue'
import Vuetify from 'vuetify'

Vue.use(Vuetify)

describe('<NodeBlocks />', () => {
  const defaultProps = {
    id:"1",
    content:"Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit."
  };
  
  const render = (props = {}) => shallowMount(NodeBlocks, {
    propsData: {
      ...defaultProps,
      ...props
    }
  });
  
  it('renders', () => {
    const wrapper = render();
    expect(wrapper.find('.block-content').exists()).toBeTruthy;
  });

  it('match the snapshot', () => {
    const wrapper = render();
    expect(wrapper).toMatchSnapshot();
  });
  
});