Component({
  options: {
    styleIsolation: 'apply-shared',
  },
  properties: {
    banners: {
      type: Array,
      value: [] as Banner[],
    },
  },
})
