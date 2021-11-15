<script>
    export let grow = false
</script>

<div class="halfinfo" class:grow={grow}>
    <div class="containertitle">
        <slot name="title">
            Title
        </slot>
    </div>
    <slot name="container">
        None 
    </slot>
</div>

<style>
    .halfinfo{
        background:#2a2a2a;
        padding:0px 2px;
        margin:0px;
        /* width:50%; */
        min-width:380px;
        border-radius: 12px;
        border: 1px solid #444;
        /* filter: drop-shadow(1px 1px 2px #000); */
        outline: 1px solid #00000099;
        flex-basis:49%;
        flex-grow: 2;
    }
    .grow{
        flex-basis:100%;
    }
    .containertitle{
        text-align:center;
        font-size: 40px;
        font-weight: 600;
        background:#222;
        border-radius: 12px;
        margin: 4px 2px;
        /* filter: drop-shadow(1px 1px 2px #000); */
        border: 1px solid #444;
        outline: 1px solid #00000099;
    }
    @media (max-width: 1370px){
        .halfinfo{
            flex-basis: 100%;
        }
    }
    @media (max-width: 1080px){
        .halfinfo{
            display:flexbox;
            min-width: unset;
            max-width: unset;
            width: calc(100% - 6px);
            margin:4px 0px 18px 0px;
            padding:4px 2px;
        }
    }
</style>