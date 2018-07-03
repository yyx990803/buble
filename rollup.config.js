import buble from 'rollup-plugin-buble';
import json from 'rollup-plugin-json';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import pkg from './package.json';

const ensureArray = maybeArr => Array.isArray(maybeArr) ? maybeArr : [maybeArr];

const createConfig = (opts) => {
	opts = opts || {};
	const browser = opts.browser || false;
	const external = opts.external || ['acorn', 'magic-string'];
	const output = ensureArray(opts.output);

<<<<<<< HEAD
	return {
		input: 'src/index.js',
		output: output.map(format => Object.assign({}, format, {
			name: 'buble',
			sourcemap: true
		})),
		external: external,
		plugins: [
			json(),
			commonjs(),
			buble({
				target: !browser ? { node: 4 } : null,
				include: [
					'src/**',
					'node_modules/regexpu-core/**',
					'node_modules/unicode-match-property-ecmascript/**',
					'node_modules/unicode-match-property-value-ecmascript/**',
				],
				transforms: {
					dangerousForOf: true
				}
			}),
			resolve()
		],
	};
};

const configs = [
	/* node ESM/CJS builds */
	createConfig({
		output: [
			{ format: 'es', file: pkg.module },
			{ format: 'cjs', file: pkg.main }
		],
	}),
	/* browser ESM/CJS builds (for bundlers) */
	createConfig({
		browser: true,
		output: [
			{ format: 'es', file: pkg.browser[pkg.module] },
			{ format: 'cjs', file: pkg.browser[pkg.main] }
		],
	}),
	/* UMD with bundled dependencies, ready for browsers */
	createConfig({
		browser: true,
		external: [],
		output: { format: 'umd', file: pkg.unpkg },
	}),
=======
export default [
	/* ESM/UMD builds */
	// Object.assign({}, config, {
	// 	external: ['acorn/dist/acorn.js', 'magic-string'],
	// 	output: [
	// 		{ format: 'es', file: pkg.module },
	// 		{ format: 'umd', file: pkg.main }
	// 	],
	// 	globals: {
	// 		'acorn/dist/acorn.js': 'acorn',
	// 		'magic-string': 'MagicString'
	// 	}
	// }),
	Object.assign({}, config, {
		output: [
			{ format: 'umd', file: pkg.main }
		]
	})
>>>>>>> fix build
];

export default configs;
