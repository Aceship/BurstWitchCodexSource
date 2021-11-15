<script>
    import { dataglobal , langglobal , charaGlobal, translateglobal } from '../js/stores.js';
    export let itemid = 0
    export let qty = 0
    export let quality = 0;

    let item
    let lang = $langglobal
    
    $: item = GetItem(itemid)

    // console.log(item)
    function GetItem(id){
        return $dataglobal.item.find(items=>{
            return items.id == id
        })
    }
</script>
{#if item}
    <div class="itemcontainer">
        {#if quality > 0}
            <img class="itemframe" src="/data/img/ui/item_frame/frame{quality}.png" alt="">  
        {:else if quality !=-1}
            <img class="itemframe" src="/data/img/ui/item_frame/frame{item.Quality}.png" alt="">  
        {/if}
        <img class="itempic" style="" src="/data/img/source_icon/item/{item.itemPath}.png" title='{lang.cn[item.Name]} {item.EnglishName}' alt="">
        {#if qty>0}
            <span class="itemqty">{qty}</span>
        {/if}
    </div>
{/if}
<style>
    .itemcontainer{
        position: relative;
        display:inline-flex;
        width:60px;
        height:60px;
        align-items: center;
        justify-content: center;
        background: #00000066;
        border-radius:8px;
    }
    .itemcontainer .itemframe{
        position:absolute;
        width:60px;
        height:60px;
        object-fit:contain ;
    }
    .itemcontainer .itempic{
        position:absolute;
        width:50px;
        height:50px;
        object-fit:contain ;
    }

    .itemcontainer .itemqty{
        position:absolute;
        bottom:1px;
        right:2px;
        padding:1px 2px;
        border-radius:4px 0px 6px 0px;
        background: #00000066;
    }
</style>