import Node from '../Node.js'

export default class WithStatement extends Node {
  transpile (code, transforms) {
    if (transforms.stripWith) {
      const fn = this.parent && this.parent.parent
      if (fn && fn.type === 'FunctionDeclaration' && fn.id.name === 'render') {
        this.program.inWith = true
        // remove surrounding with block
        code.remove(this.start, this.body.start + 1)
        code.remove(this.end - 1, this.end)
        code.insertRight(this.start, `var _vm=this;var _h=_vm._h;var _s=_vm._s;`)
      }
      super.transpile(code, transforms)
      this.program.inWith = false
    }
  }
}
