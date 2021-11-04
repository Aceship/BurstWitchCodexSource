<script>
    import { getContext } from 'svelte';
    import { dataglobal , langglobal , charaGlobal } from './js/stores.js';
    import './css/maincodex.css'

    import Characteravatar from './components/characteravatar.svelte'
    let data = $dataglobal
    let lang = $langglobal
    export let changeChara;

    const { close } = getContext('simple-modal');

    let witchid = num=>() => {
        $charaGlobal = data.cardCharacter.find(char=>{
            return char.id == num
        })
        changeChara($charaGlobal)
        close();
    }
</script>

<p>
    {#each data.cardCharacter as chara,i}
        <button class='invisibleButton' on:click="{witchid(chara.id)}">
            <Characteravatar chara={chara} quality={chara.Quality} starnum={chara.Quality}>
            </Characteravatar>
        </button>
    {/each}
</p>

<style>
    .invisibleButton{
        background: #00000000;
        border: none;
        cursor: pointer;
        transition: transform 0.2s, filter 0.2s;
    }

    .invisibleButton:hover{
        filter: drop-shadow(1px 1px 2px #ddd);
        transform: scale(1.1);
    }
</style>