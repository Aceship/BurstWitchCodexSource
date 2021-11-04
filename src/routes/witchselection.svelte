<script>
    import { getContext } from 'svelte';
    import { dataglobal , langglobal , charaGlobal } from './js/stores.js';
    import './css/maincodex.css'
    let data = $dataglobal
    let lang = $langglobal

    const { close } = getContext('simple-modal');

    let witchid = num=>() => {
        $charaGlobal = data.cardCharacter.find(char=>{
            return char.id == num
        })
        close();
    }
</script>

<p>
    {#each data.cardCharacter as chara,i}
        <button class='invisibleButton' on:click="{witchid(chara.id)}">
            <div class="characteravatar">
                <img class="displaypic" src="./data/img/source_avatar/hero_main/head_{chara.id+"0001"}.png" alt={chara.id+"0001"} >
                <img class="avatarframe" src="./data/img/ui/chara_frame/avatarframe_{parseInt(chara.Quality)-1}.png" alt="">
                <img class="elementframe" src="./data/img/ui/element/elementframe1.png" alt="{chara.attri_type}">
                <img class="element" src="./data/img/ui/element/element{chara.attri_type}.png" alt="{chara.attri_type}">
            </div>
        </button>
    {/each}
</p>

<style>
</style>