<script>
    import { dataglobal , langglobal , charaGlobal} from './js/stores.js';
    import './css/maincodex.css'
    let data = $dataglobal
    let lang = $langglobal

    import { getContext } from "svelte";
    import witchselection from './witchselection.svelte';

    export let quality = 1
    let chara = $charaGlobal
    const {open} = getContext('simple-modal');
    
    const selectWitch = () => {
        open(witchselection,{
                message:""
            },{
                styleBg: {
                    background: '#000000aa'
                },
                styleWindow:{
                    background: '#222222',
                    width: '105vw',
                    height: 'calc( 100vh - 5em )',
                    'text-align' : 'center'
                }
            }
        );
    };

    
</script>

<p><button class="invisibleButton" on:click={selectWitch}>
    <div class="characteravatar">
        <img class="displaypic" src="./data/img/source_avatar/hero_main/head_{chara.id+"0001"}.png" alt={chara.id+"0001"} >
        <img class="avatarframe" src="./data/img/ui/chara_frame/avatarframe_{quality}.png" alt="">
        <img class="elementframe" src="./data/img/ui/element/elementframe1.png" alt="{chara.attri_type}">
        <img class="element" src="./data/img/ui/element/element{chara.attri_type}.png" alt="{chara.attri_type}">
    </div>
</button></p>