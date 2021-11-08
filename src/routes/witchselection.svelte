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


    let typefilter = 0
    let elementfilter = 0
    let qualityfilter = 0
    let musicfilter = 0
    let filteredchara = data.cardCharacter
    filteredchara = filteredchara.sort((a,b)=>{
        return (sortValue(a.Quality,b.Quality)*100000)+
        (b.Name_EN.toUpperCase()>a.Name_EN.toUpperCase()?-1:+1)

    })

    let instrumentlist = [1,2,3,4,5,6,7,8,101,102,103,104,105]

    function sortValue(a,b) {
        return b-a
    }
    function filterquality(value) {
        qualityfilter = value
        filterChara()
    }
    function filterType(value) {
        typefilter = value
        filterChara()
    }
    function filterElement(value){
        elementfilter = value
        filterChara()
    }
    function filterMusic(value) {
        musicfilter=value
        filterChara()
    }
    function Unfilter() {
        typefilter = 0
        elementfilter = 0
        qualityfilter = 0
        musicfilter=0
        filteredchara = data.cardCharacter
    }
    function filterChara() {
        filteredchara = data.cardCharacter
        filteredchara = filteredchara.filter(char=>{
            if(qualityfilter==0)return char
            else return char.Quality==qualityfilter
        })
        filteredchara = filteredchara.filter(char=>{
            if(typefilter==0)return char
            else return char.AtkType==typefilter
        })
        filteredchara = filteredchara.filter(char=>{
            if(elementfilter==0)return char
            else return char.attri_type==elementfilter
        })
        if(musicfilter!=0){
            filteredchara = filteredchara.filter(char=>{
                let check = false
                char.MusicInstrument.forEach(instr => {
                    if(instr[0] == musicfilter) check = true
                });
                return check
            })
        }
        filteredchara = filteredchara.sort((a,b)=>{
            return (sortValue(a.Quality,b.Quality)*100000)+
            (b.Name_EN.toUpperCase()>a.Name_EN.toUpperCase()?-1:+1)

        })
    }
</script>


<div>
    <button class="filterbutton" on:click={()=>{Unfilter()}}>
        <span>All</span>
    </button>
    <button class="filterbutton {qualityfilter==2?"active":""}" on:click={()=>{qualityfilter==(2)?filterquality(0):filterquality(2)}}>
        <img class="filter" src="/data/img/ui/rarity/Img_Quality_R.png" alt="quality">
    </button><button class="filterbutton {qualityfilter==3?"active":""}" on:click={()=>{qualityfilter==(3)?filterquality(0):filterquality(3)}}>
        <img class="filter" src="/data/img/ui/rarity/Img_Quality_SR.png" alt="quality">
    </button><button class="filterbutton {qualityfilter==4?"active":""}" on:click={()=>{qualityfilter==(4)?filterquality(0):filterquality(4)}}>
        <img class="filter" src="/data/img/ui/rarity/Img_Quality_SSR.png" alt="quality">
    </button>
    {#each Array(3) as _,i}
        <button class="filterbutton {elementfilter==i+1?"active":""}" on:click={()=>{elementfilter==(i+1)?filterElement(0):filterElement(i+1)}}>
            <img class="filter" src="/data/img/ui/element/element{i+1}.png" alt="element">
        </button>
    {/each}
    {#each Array(6) as _,i}
        <button class="filterbutton {typefilter==i+1?"active":""}" on:click={()=>{typefilter==(i+1)?filterType(0):filterType(i+1)}}>
            <img class="filter" src="/data/img/ui/class/comm_atk_{i+1}.png" alt="types">
        </button>
    {/each}
    <div>
        {#each instrumentlist as inst,i}
        <button class="filterbutton {musicfilter==inst?"active":""}" on:click={()=>{musicfilter==(inst)?filterMusic(0):filterMusic(inst)}}>
            <img class="filter" src="/data/img/source_icon/musictype/{inst}.png" alt="music">
        </button>
    {/each}
    </div>
</div>
{#each filteredchara as chara,i}
    <a class='invisibleButton' on:click="{witchid(chara.id)}" href="/characters/{chara.Name_EN.replace(" ","_")}">
        <Characteravatar chara={chara} quality={chara.Quality} starnum={chara.Quality} withelement={true} withname={true} withtype={true}>
        </Characteravatar>
    </a>
{/each}


<style>
    .invisibleButton{
        background: #00000000;
        border: none;
        cursor: pointer;
        text-decoration: none;
        color: inherit;
        transition: transform 0.2s, filter 0.2s;
    }

    .invisibleButton:hover{
        filter: drop-shadow(1px 1px 2px #ddd);
        transform: scale(1.1);
    }
    .filterbutton{
        font-size: 20px;
        background: #444;
        border: 0px;
        color:white;
        margin-bottom: 1px;
        border-top: solid 4px transparent;
    }
    .filter{
        width:40px;
        height: 40px;
        object-fit: contain;
    }
    .filterbutton:hover{
        background: #666;
    }
    .active{
        border-top: solid 4px #888;
    }
</style>