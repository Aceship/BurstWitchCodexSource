<script>
	import Modal from 'svelte-simple-modal';
	import index from './index.svelte';
</script>

<head>
    <link rel='manifest' href='/manifest.json' crossorigin='use-credentials'>
</head>
<Modal>
	<slot />
</Modal>