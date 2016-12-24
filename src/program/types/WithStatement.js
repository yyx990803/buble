import Node from '../Node.js'

export default class WithStatement extends Node {
  transpile (code, transforms) {
    if (transforms.stripWith) {
      this.program.inWith = (this.program.inWith || 0) + 1
      // remove surrounding with block
      code.remove(this.start, this.body.start + 1)
      code.remove(this.end - 1, this.end)
      code.insertRight(this.start, `var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;`)
      super.transpile(code, transforms)
      this.program.inWith--
    } else {
      super.transpile(code, transforms)
    }
  }
}
