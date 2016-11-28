// allowed globals in Vue render functions.
// same as in src/core/instance/proxy.js
const names = 'Infinity,undefined,NaN,isFinite,isNaN,' +
  'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
  'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
  'require,' + // for webpack
  'arguments,' + // parsed as identifier but is a special keyword...
  '_h' // cached to save property access

const hash = Object.create(null)
names.split(',').forEach(name => {
  hash[name] = true
})

export default hash