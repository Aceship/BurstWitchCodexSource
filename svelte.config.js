import node from '@sveltejs/adapter-static';

const dev = process.env.NODE_ENV === 'development';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: node({out:'./out'}),
		paths: {
			base: dev ? '' : '/BurstWitchCodex',
		},
	}
};

export default config
