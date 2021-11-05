<svelte:head>
    <title>
        {chara.Name_EN} - Burst Witch Codex
    </title>
    <meta property="og:title" content="Burst Witch Codex - {chara.Name_EN}" />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="https://aceship-burstwitchcodex.vercel.app/data/img/source_icon/player/player_icon_{chara.id}.png" />
    <meta property="og:image:type" content="image/png"> 
    <meta property="og:image:width" content="220">
    <meta property="og:image:height" content="220">

    <meta name="description" content="Burst Witch Codex - {chara.Name_EN} skill and talents information" />
    <meta name="og:description" content="Burst Witch Codex - {chara.Name_EN} skill and talents information" />
</svelte:head>



<div>
    <div class="charactercard">
        <img class="cardpic" src="../data/img/source_avatar/hero/card_{charaId}.png" alt="">
        <img class="cardframe" src="../data/img/ui/chara_frame/cardframe_{quality-1+ Math.floor((starnum-quality+1)/2)}.png" alt="">
        <img class="elementframe" src="../data/img/ui/element/elementframe1.png" alt="{chara.attri_type}">
        <img class="element" src="../data/img/ui/element/element{chara.attri_type}.png" alt="{chara.attri_type}">
        <img class="typeframe" src="../data/img/ui/element/elementframe1.png" alt="{attacktype}">
        <img class="type" src="../data/img/ui/class/comm_atk_{attacktype}.png" alt="{attacktype}">
    </div>
    
    <div class="starContainer">
        {#each Array(6) as _,i}
            {#if starnum<=i}
                <button class="starbutton" on:click={starclick(i+1)}>
                    <img class="star" src="../data/img/ui/rarity/StarInactive.png" alt="star">
                </button>
            {:else}
                {#if i<parseInt(chara.Quality)-2}
                    <button class="starbutton starunbutton" on:click={starclick(chara.Quality-1)}>
                        <img class="star" src="../data/img/ui/rarity/StarActive.png" alt="star">
                    </button>
                {:else}
                    <button class="starbutton" on:click={starclick(i+1)}>
                        <img class="star" src="../data/img/ui/rarity/StarActive.png" alt="star">
                    </button>
                {/if}
            {/if}
        {/each}
    </div>
    
    <img class="characterfull" src="../data/img/source_avatar/hero_book/body_{chara.id}.png" alt="body">
    <button class="invisibleButton" on:click={selectWitch}>
        <Characteravatar chara={chara} quality={quality} starnum={starnum} withname={true}>
        </Characteravatar>
    </button>    
</div>
<div>
    <!-- <div>
        <label>
            level : 
            <input type=number bind:value={level} min=1 max=70>
            <input type=range bind:value={level} min=1 max=70>
        </label>
    </div>
    <div class="breachFont">
        I II III IV V VI VII VIII
    </div> -->
    <div>
        Attack : <input type=number bind:value={charastat.stat.attack} min=1>
    </div>
    <!-- {parseFloat(chara.OrgAttribute[0][1])+
    (parseFloat(chara.OrgAttribute[0][1])*parseFloat(chara.LvUpAttrRates[0][starnum])*level)+
    parseFloat(chara.StepUpAttrRates[0][starnum])} -->
</div>

<div class="fullinfo">
    <div class="halfinfo">
        <h1>Skills</h1>
        {#each charaskill as eachskill,i}
            <div>
                <div style="background:#444;margin:10px;padding:10px" >
                    <img class="" style="width: 50px;" src ='../data/img/source_icon/skill/{eachskill.icon}.png' alt="{eachskill.icon}">
                    
                    {#if eachskill.skillshow.length==1}
                        <div>{lang.cn[eachskill.skillshow[0].skill_name]}</div>
                        Skill Level : <input type=number bind:value={charastat.level.skill[i]} min=1 max=20>
                        <div>{@html SkillDescParser(eachskill,i,starnum,charastat.stat.attack)}</div>
                    {:else}
                        <div>{lang.cn[eachskill.skillshow[starnum-1].skill_name]}</div>
                        Skill Level : <input type=number bind:value={charastat.level.skill[i]} min=1 max=20>
                        <div>{@html SkillDescParser(eachskill,i,starnum,charastat.stat.attack)}</div>
                    {/if}
                </div>
            </div>
        {/each}
    </div>
    <div class="halfinfo">
        <h1>Talents</h1>
        {#each charatalent as eachtalent,i}
            <div style="background:#444;margin:10px;padding:10px" >
                <img class="" style="width: 50px;" src ='../data/img/source_icon/talent/{eachtalent.icon}.png' alt="{eachtalent.icon}">
                <div class="starContainer starHorizontal">
                    {#each Array(parseInt(eachtalent.talentdata.Star)) as _,sn}
                        <img class="star starSmall" src="../data/img/ui/rarity/StarActive.png" alt="star">
                    {/each}
                </div>
                <div>{lang.cn[eachtalent.talentdata.Talent_Name]}</div>
                <div>{@html TalentDescParser(lang.cn[eachtalent.talentdata.desc])}</div>
            </div>
        {/each}
    </div>
</div>


<script>
    import { dataglobal , langglobal , charaGlobal } from '../js/stores.js';
    import { getContext } from "svelte";
    const {open} = getContext('simple-modal');
    import witchselection from '../witchselection.svelte';

    import Characteravatar from "../components/characteravatar.svelte";
    import { page } from '$app/stores';
    let id = $page.params.id;

    let data = $dataglobal
    let lang = $langglobal

    console.log(id)
    let chara = $dataglobal.cardCharacter.find(character=>{
            return character.Name_EN == id.replace("_"," ")
        })
    let charastat = {
        stat:{
            hp:chara.OrgAttribute[0][1],
            attack:chara.OrgAttribute[1][1],
            defense:chara.OrgAttribute[2][1],
            critHit:chara.OrgAttribute[3][1],
            critDmg:chara.OrgAttribute[4][1]
        },
        level:{
            skill:[1,1,1]
        }
    }
    console.log(chara)
    let charaName = chara.Name_EN
    let charaId = chara.id+"0001"
    let attacktype = chara.AtkType
    let starnum = parseInt(chara.Star)
    let quality = parseInt(chara.Quality) 
    let level = 1
    let charaskill = []
    let charatalent = []

    changeChara(chara)

    const starclick = num=>() => {
        starnum = num
    }

    const selectWitch = () => {
        open(witchselection,{
                changeChara
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

    function changeChara(character) {
        chara = character
        charaId = chara.id+"0001"
        attacktype = chara.AtkType
        starnum = parseInt(chara.Star)
        quality = parseInt(chara.Quality) 
        updateSkill() 
        updateTalent()
    }
    ////Character stuff 

    //Skill
    function updateSkill() {
        charaskill = []
        chara.OrgSkills.forEach(element => {
        let skillObject = {
            icon:element
        }

        skillObject.skillshow = data.witchskillshow.filter(obj =>{
            return obj.id ==element
        })
        skillObject.skill = data.witchskill.filter(obj=>{
            return obj.id == element
        })

        charaskill.push(skillObject)
    });
    }
    

    //Talent
    function updateTalent() {
        charatalent = []
        chara.NewTalentID.forEach(element => {
            let talentObject = {}

            talentObject.talentdata = data.charaTalent.filter(obj =>{
                return obj.id == element[1]
            })[0]
            console.log(talentObject)
            talentObject.icon = talentObject.talentdata.Talent_ICON
            charatalent.push(talentObject)
        });
    }
    function SkillDescParser(skill,skillnumber,starnum,attack){
        let skillLevel = charastat.level.skill[skillnumber]
        let skilldesc 
        let skillstar = skill.skillshow.length>1?starnum-1:0
        if(skill.skillshow.length>1){
            skilldesc = ChangeDescriptionformat(lang.cn[skill.skillshow[starnum-1].SkillInfo])
        }else{
            skilldesc = ChangeDescriptionformat(lang.cn[skill.skillshow[0].SkillInfo])
        }
        // console.log(skilldesc)
        skilldesc = skilldesc.replace(/<#(.+?)#>/g, function(m, text) {
            if(text =="%d") text = Math.floor(attack * parseFloat(skill.skill[skillstar].showRate) * (1 + (skillLevel -1) * parseFloat(skill.skill[skillstar].UpRaate)/100)) 
            return `<span class="" style="color:#FF5522">${text}</span>`
        })

        return skilldesc
    }
    function TalentDescParser(desc) {
        desc = ChangeDescriptionformat(desc)
        desc = desc.replace(/<#(.+?)#>/g, function(m, text) {
            return `<span class="" style="color:#FF5522">${text}</span>`
        })
        return desc
    }
    function ChangeDescriptionformat(desc) {
        console.log(desc)
        desc = desc.replace(/<color=\#(.+?)>(.+?)<\/color>/g, function(m, rtf, text) {
            // console.log(rtf)
            return `<span class="" style="color:#${rtf}">${text}</span>`
        })
        
        return desc
    }

    //MarkUp
    CheckMarkUp()
    function CheckMarkUp() {
        charastat.MarkUpAttrUp = []
        chara.MarkUpAttrUp.forEach(charaStar => {
            let eachStep = []
            for (let i = 0; i < charaStar.length; i+=2) {
                
                let attrType = charaStar[i]
                let attrStat = charaStar[i+1]
                eachStep.push([attrType,attrStat])
            }
            // console.log(eachStep)
            charastat.MarkUpAttrUp.push(eachStep)
        });
        // console.log(charastat)
    }
</script>

<style>
    :global(body) {
        background-color: #222;
        color: #dddddd;
        transition: background-color 0.3s
    }
    .charainfo{
        display: inline-flex;
    }
    .characterfull{
        position: fixed;
        right:50px;
        top:10%;
        z-index: -10;
        /* max-width: 900px; */
        object-fit: scale-down;
        transition: opacity 0.5s, top 0.5s, bottom 0.5s, left 0.5s, right 0.5s;
    }
    .charactercard{
        position: relative;
        display: inline-flex;
        justify-content: center;

        width: 120px;
        height: 220px;
        margin : 0px 0px 0px 0px;
        padding: 0px 0px 8px 0px;
    }
    .charactercard .cardpic{
        width: 100px;
        object-fit: scale-down;
        margin: -5px 0px 0px 0px;
    }
    .charactercard .cardframe{
        position: absolute;
        width: 120px;
        margin: 0px 0px 0px 0px;
        pointer-events: none;
    }
    .charactercard .elementframe{
        position: absolute;
        width: 50px;
        left: 5px;
        bottom: 10px;
    }
    .charactercard .element{
        position: absolute;
        width: 44px;
        left: 7px;
        bottom: 13px;
    }
    .charactercard .typeframe{
        position: absolute;
        width: 50px;
        right: 5px;
        bottom: 10px;
    }
    .charactercard .type{
        position: absolute;
        width: 44px;
        right: 7px;
        bottom: 13px;
    }

    .starContainer{
        display:inline-flex;
        flex-direction: column-reverse;
    }
    .starHorizontal{
        flex-direction: row;
    }

    .starContainer .star{
        display: flex;
        width:50px;
        margin:-10px;
        pointer-events: none;
        transition: filter 0.2s;
    }
    .starContainer .starbutton{
        width: 38px;
        background: none;
        border:none;
        cursor:pointer;
        border-radius: 50%;
    }
    .starContainer .starunbutton{
        cursor:not-allowed;
    }

    .starContainer .starbutton:hover .star{
        filter: drop-shadow(0 0 2px #ffffff);
    }

    .starSmall{
        width:30px !important;
        margin:-5px !important;
    }

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

    .breachFont{
        font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
        font-size: 40px;
    }
    .fullinfo{
        display:inline-flex;
        width:100%
    }
    .halfinfo{
        background:#333;
        padding:1px 5px;
        margin:5px;
        max-width:600px
    }
    @media (max-width: 1000px ){
        .characterfull{
            right:-200px;
            top:5%;
            opacity:10% ;
        }
        .fullinfo{
            display:unset;
            width: 90%;
        }
        .halfinfo{
            display:flexbox;
            max-width: unset;
            width: calc(100% - 10px);
            margin:0px
        }
    }
</style>