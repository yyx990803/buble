// allowed globals in Vue render functions.
// same as in src/core/instance/proxy.js
const names =
  'arguments,' + // parsed as identifier but is a special keyword...
  '_h,_c' // cached to save property access (_c for ^2.1.5)

const hash = Object.create(null)
names.split(',').forEach(name => {
  hash[name] = true
})

export default hash
