import { wxComponent, SuperComponent } from '../common/src/index';
import config from '../common/config';
import props from './props';

const { prefix } = config;
const name = `${prefix}-switch`;
@wxComponent()
export default class Switch extends SuperComponent {
  externalClasses = ['t-class'];
  properties = props;
  // 组件的内部数据
  data = {
    externalClass: 't-class',
    classPrefix: name,
    isActive: false,
    bodyStyle: '',
  };
  lifetimes = {
    attached() {
      const { value, customValue, disabled, colors } = this.data;
      const [activeValue] = customValue;
      
      this.setData({
        isActive: value === activeValue,
      });
      this.handleColorChange();
    },
  };
  methods = {
    switchChange() {
      const { disabled, value, customValue, isActive } = this.data;
      const [activeValue, inactiveValue] = customValue;
      if (disabled) return;

      this.setData({
        value: value === activeValue ? inactiveValue : activeValue,
        isActive: !isActive,
      });

      this.triggerEvent('change', {
        value: this.data.value,
      });
      this.handleColorChange();
    },
    handleColorChange() {
      const { disabled, colors } = this.data;
      const [activedColor, inactivedColor] = colors;
      if (!disabled) {
        this.setData({
          bodyStyle: `background-color: ${this.data.isActive ? activedColor : inactivedColor}`,
        });
      }
    },
    onTapBackground() {
      this.switchChange();
    },
    onTapDot() {
      this.switchChange();
    },
  };
}
