module.exports = [
  {
    description: 'strip with from Vue render functions',
    options: {
      transforms: { stripWith: true },
      objectAssign: 'Object.assign'
    },
    input: `
function render () {
  with (this) {
    return _h('div', items.map(function (item) {
      return _h('p', {
        class: [a, b + 'c', c ? d : item.e],
        style: { color, item, [prop]: true },
        inlineTemplate: {
          render: function () {
            with (this) {
              return _h('span', ['hi', arguments[1]])
}
          }
        }
      }, item.tags.map(function (tag) {
        return _c('span', [item.id, tag.text, foo, a[b]])
      }))
    }))
}
}
`,
    output: `
function render () {
  var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
    return _h('div', _vm.items.map(function (item) {
      var _obj;
      return _h('p', {
        class: [_vm.a, _vm.b + 'c', _vm.c ? _vm.d : item.e],
        style: ( _obj = { color: _vm.color, item: item }, _obj[_vm.prop] = true, _obj ),
        inlineTemplate: {
          render: function () {
            var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
              return _h('span', ['hi', arguments[1]])

          }
        }
      }, item.tags.map(function (tag) {
        return _c('span', [item.id, tag.text, _vm.foo, _vm.a[_vm.b]])
      }))
    }))

}
`
  }
]
