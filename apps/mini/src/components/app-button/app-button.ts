Component({
  options: {
    styleIsolation: 'shared',
  },
  properties: {
    clazz: {
      type: String,
      value: '',
    },
    style: {
      type: String,
      value: '',
    },
    type: {
      type: String,
      value: 'default',
    },
    size: {
      type: String,
      value: 'medium',
    },
    disabled: {
      type: Boolean,
      value: false,
    },
  },
})
