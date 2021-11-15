<script>
    export let cooldown = 0
</script>

<div class="infoCD">
    <img class="infoimg" src ='/data/img/ui/etc/cooldown.png' alt="CD" title="Cooldown">
    <span> {cooldown==0?"--":`${cooldown}s`}</span>
</div>

<style>
    .infoCD{
        position: relative;
        background:#222;
        padding:2px 10px 2px 30px;
        min-width:20px;
    }
    .infoCD img{
        position:absolute;
        left:-2px;
        top:-3px;
        width: 30px;
        height:30px;
        object-fit: contain;
    }
</style>