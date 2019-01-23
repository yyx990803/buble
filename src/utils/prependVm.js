import globals from './globals.js';

const isDeclaration = type => /Declaration$/.test(type);
const isFunction = type => /Function(Expression|Declaration)$/.test(type);

export function shouldPrependVm (identifier) {
	if (
		identifier.program.inWith > 0 &&
		// not id of a Declaration
		!(isDeclaration(identifier.parent.type) && identifier.parent.id === identifier) &&
		// not a params of a function
		!(isFunction(identifier.parent.type) && identifier.parent.params.indexOf(identifier) > -1) &&
		// not a key of Property
		!(identifier.parent.type === 'Property' && identifier.parent.key === identifier && !identifier.parent.computed) &&
		// not a property of a MemberExpression
		!(identifier.parent.type === 'MemberExpression' && identifier.parent.property === identifier && !identifier.parent.computed) &&
		// not in an Array destructure pattern
		!(identifier.parent.type === 'ArrayPattern') &&
		// not in an Object destructure pattern
		!(identifier.parent.parent.type === 'ObjectPattern') &&
		// skip globals + commonly used shorthands
		!globals[identifier.name] &&
		// not already in scope
		!identifier.findScope(false).contains(identifier.name)
	) {
		return true;
	}
}
