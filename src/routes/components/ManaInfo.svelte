<script>
    export let mp = 0
</script>

<div class="infoMP">
    <img class="infoimg" src ='../data/img/ui/etc/mp.png' alt="MP" title="Mana Cost">
    <span>{mp?mp/10000:"--"}</span>
</div>

<style>
    .infoMP{
        display:inline-flex;
        position: relative;
        background:#2E2E2E;
        padding:2px 10px 2px 30px;
        min-width:20px;
    }
    .infoimg{
        position:absolute;
        left:-2px;
        top:-5px;
        width: 30px;
        height:30px;
        object-fit: contain;
    }
</style>