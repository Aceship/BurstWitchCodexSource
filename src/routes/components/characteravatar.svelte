<script>
    import { charaGlobal , translateglobal} from "../js/stores";

    export let chara = $charaGlobal
    export let quality = 2
    export let starnum = 1
    export let withname = false;
    export let withelement = false;
    export let withtype = false;

    let charaEx = {}

    CheckTL(chara)

    function CheckTL(chara){
        charaEx= {
            name:chara.Name_EN,
            namebg:""
        }

        let charatldata = $translateglobal.charTL[chara.id]
        if(charatldata){
            
            if(charatldata.name){
                charaEx.name = charatldata.name
                charaEx.namebg = chara.Name_EN
            }
        }
    }
</script>

<div class="characteravatar {withname?"withname":""}">

    <img class="displaypic" src="/data/img/source_avatar/hero_main/head_{chara.id+"0001"}.png" alt={chara.id+"0001"} >
    <img class="avatarframe" src="/data/img/ui/chara_frame/avatarframe_{quality-1+ Math.floor((starnum-quality+1)/2)}.png" alt="">
    {#if withname}
        <div class="name">{charaEx.name}</div>
    {/if}
    {#if withelement}
        <div class="elementMain">
            <img class="elementframe" src="/data/img/ui/element/elementframe1.png" alt="{chara.attri_type}">
            <img class="element" src="/data/img/ui/element/element{chara.attri_type}.png" alt="{chara.attri_type}">
        </div>
    {/if}
    {#if withtype}
        <div class="typeMain">
            <img class="typeframe" src="../data/img/ui/element/elementframe1.png" alt="{chara.AtkType}">
            <img class="type" src="../data/img/ui/class/comm_atk_{chara.AtkType}.png" alt="{chara.AtkType}">
        </div>
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
    .elementMain{
        position: absolute;
        display:inline-flex;
        width:40px;
        height:40px;
        justify-content: center;
        align-items: center;
        right:0px;
        bottom: 20px;
    }
    .elementMain .elementframe{
        position: absolute;
        width: 40px;
    }
    .elementMain .element{
        position: absolute;
        width: 34px;
    }
    .typeMain{
        position: absolute;
        display:inline-flex;
        width:40px;
        height:40px;
        justify-content: center;
        align-items: center;
        left:0px;
        bottom: 20px;
    }
    .typeMain .typeframe{
        position: absolute;
        width: 40px;
    }
    .typeMain .type{
        position: absolute;
        width: 34px;
    }
</style>