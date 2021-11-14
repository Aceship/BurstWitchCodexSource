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
    </div>
    <slot name="midcontent"></slot>
    <div class="skilldesc">
        <slot name="containercontent">
            
        </slot>
    </div>
</div>

<style>
    .skillcontainer{
        background:#444;
        margin:0px 2px 6px 2px;
        padding:1px 1px;
        border-radius: 12px;
        outline: 1px solid #00000099;
        /* filter: drop-shadow(1px 1px 2px #000); */
    }
    .infotitle{
        background:#222;
        margin:0px 0px;
        padding:0px 5px;
        border-radius: 12px 12px 0px 0px;
        /* display:inline-flex; */
        align-items:center;
    }
    .infotitle .titleimage{
        width: 60px;
        margin:5px;
    }

    .infotext{
        /* min-height:30px; */
        padding:6px 0px;
        /* background:#222; */
    }
    .infocontent{
        display:inline-flex;
        align-items:center;
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
</style>