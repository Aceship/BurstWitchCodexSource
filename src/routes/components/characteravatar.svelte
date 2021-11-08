<script>
    import { charaGlobal } from "../js/stores";

    export let chara = $charaGlobal
    export let quality = 2
    export let starnum = 1
    export let withname = false;
    export let withelement = false;
</script>

<div class="characteravatar {withname?"withname":""}">

    <img class="displaypic" src="/data/img/source_avatar/hero_main/head_{chara.id+"0001"}.png" alt={chara.id+"0001"} >
    <img class="avatarframe" src="/data/img/ui/chara_frame/avatarframe_{quality-1+ Math.floor((starnum-quality+1)/2)}.png" alt="">
    {#if withname}
        <div class="name">{chara.Name_EN}</div>
    {/if}
    {#if withelement}
        <img class="elementframe" src="/data/img/ui/element/elementframe1.png" alt="{chara.attri_type}">
        <img class="element" src="/data/img/ui/element/element{chara.attri_type}.png" alt="{chara.attri_type}">
    {/if}
</div>
<style>
     .characteravatar{
        position: relative;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        width: 120px;
        height: 120px;
    }
    .characteravatar.withname{
        height: 140px
    }
    .characteravatar .name{
        position: absolute;
        bottom:0px;
        /* right:-16px; */
        /* transform: rotate(44deg); */
        color:white;
        background:#000;
        padding:2px 5px 1px 5px;
        border-radius: 1px;
        font-size: 1.2em;
        width:110px
    }
    .characteravatar .displaypic{
        width: 104px;
        height:104px;
        margin-left: -2px;
        object-fit: scale-down;
    }
    .characteravatar .avatarframe{
        position: absolute;
        width: 120px;
        margin: -13px 0px 0px 2px;
        pointer-events: none;
    }
    .characteravatar .elementframe{
        position: absolute;
        width: 40px;
        right:-5px;
        bottom: 20px;
    }
    .characteravatar .element{
        position: absolute;
        width: 34px;
        right: -2px;
        bottom: 23px;
    }
</style>