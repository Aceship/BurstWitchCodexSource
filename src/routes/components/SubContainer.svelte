<script>
    export let img =''
</script>

<div class="skillcontainer">
    <div class="infotitle">
        <div class="infocontent">
            {#if img}
                <img class='' src ={img} alt="">
            {/if}
            <slot name="infoname"></slot>
        </div>
        <div class="bgname">
            <slot name="bgname"></slot>
        </div>
    </div>
    <div class="midcontent">
        <slot name="midcontent"></slot>
    </div>
    <div class="skilldesc">
        <slot name="containercontent">
            
        </slot>
    </div>
</div>

<style>
    @font-face{
        font-family : Magiera;
        src : url(../data/font/Magiera-Script-2.ttf)
    }
    @font-face{
        font-family : aAGothic;
        src : url(../data/font/aAGothic.ttf)
    }
    .skillcontainer{
        background:#444;
        margin:0px 2px 6px 2px;
        padding:1px 1px;
        border-radius: 12px;
        outline: 1px solid #00000099;
        /* filter: drop-shadow(1px 1px 2px #000); */
    }
    .infotitle{
        display: flex;
        background:#222;
        margin:0px 0px;
        padding:0px 5px;
        border-radius: 12px 12px 0px 0px;
        min-height: 30px;
        /* display:inline-flex; */
        align-items:center;
        position: relative;
    }


    .midcontent{
        display: flex;
        align-items: center;
        min-height: 24px;
        padding:0px 4px;
    }
    .infocontent{
        display:inline-flex;
        align-items:center;
        padding: 0px 6px;
    }
    .infocontent img{ 
        margin: 5px;
        width: 60px;
        height:60px;
        object-fit: contain;
        border-radius: 6px;
    }
    .skilldesc{
        background:#343434;
        padding:4px 4px;
        border-radius: 0px 0px 12px 12px;
    }
    .bgname{
        position: absolute;
        right:10px;
        top:5px;
        opacity: 45%;
        font-family: aAGothic;
    }
</style>