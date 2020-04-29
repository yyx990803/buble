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
      }), item.stuff.map(([a, b], { c }) => {
        return _h('p', [a, b, c])
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
      }), item.stuff.map(function (ref, ref$1) {
        var a = ref[0];
        var b = ref[1];
        var c = ref$1.c;

        return _h('p', [a, b, c])
      }))
    }))

}
`
  },
  {
    description: 'strip with w/ single line if',
    options: {
      transforms: { stripWith: true },
      objectAssign: 'Object.assign'
    },
    input: `
function render() {
  with(this){
    if (true) return;text;}
}
`,
    output: `
function render() {
  var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
    if (true) { return; }_vm.text;
}
`
  },

  {
    description: 'strip with and allowedGlobals',
    options: {
      transforms: {
        stripWith: true,
        allowedGlobals: ['gmsg', 'gobj', 'garr', 'gidx']
      },
      objectAssign: 'Object.assign'
    },
    input: `
function render() {
  with(this) {
    return _c('div', [
      _c('div', [
        _c('b', [msg]),
        _c('b', [obj.prop]),
        _c('b', [obj.method()]),
        _c('b', [arr[idx]])
      ]),
      _c('div', [
        _c('b', [gmsg]),
        _c('b', [gobj.prop]),
        _c('b', [gobj.method()]),
        _c('b', [garr[gidx]])
      ])
    ])
  }
}
`,
    output: `
function render() {
  var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
    return _c('div', [
      _c('div', [
        _c('b', [_vm.msg]),
        _c('b', [_vm.obj.prop]),
        _c('b', [_vm.obj.method()]),
        _c('b', [_vm.arr[_vm.idx]])
      ]),
      _c('div', [
        _c('b', [gmsg]),
        _c('b', [gobj.prop]),
        _c('b', [gobj.method()]),
        _c('b', [garr[gidx]])
      ])
    ])
  
}
`
  }
]
