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
    <!-- Header -->
    <div class="Quickmenu">
        <!-- <div class="charactercard">
            <img class="cardpic" src="../data/img/source_avatar/hero/card_{charaId}.png" alt="">
            <img class="cardframe" src="../data/img/ui/chara_frame/cardframe_{quality-1+ Math.floor((starnum-quality+1)/2)}.png" alt="">
            <img class="elementframe" src="../data/img/ui/element/elementframe1.png" alt="{chara.attri_type}">
            <img class="element" src="../data/img/ui/element/element{chara.attri_type}.png" alt="{chara.attri_type}">
            <img class="typeframe" src="../data/img/ui/element/elementframe1.png" alt="{attacktype}">
            <img class="type" src="../data/img/ui/class/comm_atk_{attacktype}.png" alt="{attacktype}">
        </div> -->
        <div class="charaDetails">
            <div class="elementMain charadetailback">
                <img class="elementframe" src="../data/img/ui/element/elementframe1.png" alt="{chara.attri_type}">
                <img class="element" src="../data/img/ui/element/element{chara.attri_type}.png" alt="{chara.attri_type}">
            </div>
            <div class="typeMain charadetailback">
                <img class="typeframe" src="../data/img/ui/element/elementframe1.png" alt="{attacktype}">
                <img class="type" src="../data/img/ui/class/comm_atk_{attacktype}.png" alt="{attacktype}">
            </div>
            <div class="instrumentList">
                {#each chara.MusicInstrument as instrument,i}
                    <div class="instrumentMain">
                        <img class="instrumentframe" src="../data/img/ui/musicframe/frame2.png" alt="{instrument[0]}">
                        <img class="instrument" src="../data/img/source_icon/musictype/{instrument[0]}.png" alt="{instrument[0]}">
                    </div>
                {/each}
            </div>
        </div>
        <div class="characterName characterNameBG"> </div>
        <div class="charaBg"> </div>

        <div class="characterName">
            <div class="characterNameEN">{chara.Name_EN}</div>
            <div class="characterNameCN">{lang.cn[chara.Name]}</div>
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
        <div class="characterIcon">
            <button class="invisibleButton" on:click={selectWitch}>
                <div class="rotateicon">
                    <Characteravatar chara={chara} quality={quality} starnum={starnum}>
                    </Characteravatar>
                </div>
            </button>  
        </div>
        
    </div>
    <div class="MenuFull">
        <!-- Left Side -->
        <div class="MenuCharaPic">
            <img class="characterfull" src="../data/img/source_avatar/hero_book/body_{chara.id}.png" alt="body">
        </div>
        <!-- Right Side -->
        <div class="MenuCharaStats">
            <div style="padding:10px 10px 10px 10px">
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
        </div>
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
        background-color: #111;
        color: #dddddd;
        transition: background-color 0.3s
    }
    .Quickmenu {
        position: absolute;
        left:650px;
        top:8px;
        filter: drop-shadow(1px 1px 2px #111);
    }
    
    .Quickmenu .charaBg {
      position: absolute;
      width: 0;
      height: 0;
      border: 70px solid transparent;
      border-color:#333;
      top: -70px;

      filter: drop-shadow(1px 1px 2px #111);
    }
    .Quickmenu .charaBg:before {
      content: '';
      position: absolute;
      left: -70px;
      top: 70px;
      width: 0;
      height: 0;
      border: 35px solid transparent;
      background: #333;
    }
    .Quickmenu .charaBg:after {
      content: '';
      position: absolute;
      left: -70px;
      top: 70px;
      width: 0;
      height: 0;
      border: 70px solid transparent;
      border-top-color: #333;
    }
    
    .Quickmenu .characterIcon{
        /* padding:5px 0px 10px 0px; */
        position:absolute;
        top:20px;
        left:20px;
        z-index: 20;
    }
    .Quickmenu .charaDetails{
        position: absolute;
        display: inline-flex;
        top:80px;
        left:40px;
        padding:6px 10px 10px 75px;
        height:35px;
        background:#444;
        filter: drop-shadow(1px 1px 2px #111);
    }
    .Quickmenu .charaDetails:after{
      content: '';
      position: absolute;
      right:-51px;
      top:0px;
      /* left: -70px;
      top: 70px; */
      width: 0;
      height: 0;
      border: 26px solid transparent;
      border-top-color: #444;
      border-left-color: #444;
    }

    .Quickmenu .characterName{
        position: absolute;
        top:-20px;
        left:120px;
        background:#333;
        padding:12px;
        padding-top:22px;
        height:66px;
        width:calc(100vw - 820px);
    }
    .Quickmenu .characterNameBG{
        filter: drop-shadow(1px 1px 2px #111);
    }
    .characterName .characterNameEN{
        font-size: 2.5em;
    }
    .Quickmenu .starContainer{
        position: absolute;
        left:0px;
        top:110px;
        background: #333;
        padding:5px;
        border-radius: 5px;
    }

    .MenuFull{
        display:grid;
        grid-template-columns: 680px ;
        grid-template-areas: "CharacterPic CharacterStats";
        height: calc(100vh - 20px);
    }
    .MenuCharaPic{
        grid-area: "CharacterPic";
        text-align: center ;
    }
    .MenuCharaStats{
        grid-area: "CharacterStats";
        background-color: #222;
        height: calc(100vh - 180px);
        padding: 150px 0px 0px 10px;
    }
    .characterfull{
        /* position: fixed;
        right:50px;
        top:10%;
        z-index: -10; */
        height: calc(100vh - 20px);
        width: 680px;
        object-fit: scale-down;
        /* transition: opacity 0.5s, top 0.5s, bottom 0.5s, left 0.5s, right 0.5s; */
    }
    .charadetailback{
        width:42px !important;
        height:42px !important;
        background:#00000033;
        margin:-5px 2px 0px 2px;
        padding:4px 4px 4px 4px;
    }

    .elementMain{
        position: relative;
        display:inline-flex;
        width:40px;
        height:40px;
        justify-content: center;
        align-items: center;
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
        position: relative;
        display:inline-flex;
        width:40px;
        height:40px;
        justify-content: center;
        align-items: center;
    }
    .typeMain .typeframe{
        position: absolute;
        width: 40px;
    }
    .typeMain .type{
        position: absolute;
        width: 34px;
    }
    .instrumentList{
        display:inline-flex;
        margin-top:-5px;
        margin-left:2px;
        padding:4px 10px 4px 10px;
        background:#00000033;
        height:42px;
        /* min-width:60px; */
        justify-content: center;
    }
    .instrumentMain{
        position: relative;
        display:inline-flex;
        width:40px;
        height:40px;
        justify-content: center;
        align-items: center;
    }
    .instrumentMain .instrumentframe{
        position: absolute;
        width: 40px;
    }
    .instrumentMain .instrument{
        position: absolute;
        width: 30px;
        height: 30px;
        object-fit: contain;
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
        background: #222;
        border: none;
        cursor: pointer;
        text-decoration: none;
        color: inherit;
        transform:rotate(45deg);
        transition: transform 0.2s, filter 0.2s;
        width:90px;
        height:90px;
        border-radius: 10px;
    }
    .rotateicon{
        position:absolute;
        left:-14px;
        top:-14px;
        pointer-events: none;
        transform:rotate(-45deg);
    }

    .invisibleButton:hover{
        filter: drop-shadow(1px 1px 2px #ddd);
        transform: rotate(45deg) scale(1.1);
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
        width:50%
    }
    @media (max-width: 1000px ){
        .Quickmenu{
            position: fixed;
            left:0px;
            top:0px;
        }
        .Quickmenu .characterName{
            width: 72vw;
        }
        .Quickmenu .starContainer{
            left:0px
        }
        .MenuFull{
            grid-template-areas: "CharacterPic" "CharacterStats";
        }
        .MenuCharaPic{
            width:100vw;
            height: min(70vh,800px);
            padding-top: 80px;
        }
        .characterfull{
            width:100vw;
            height: min(70vh,800px)
        }
        .MenuCharaStats{
            padding:2px 2px 2px 50px;
            width: calc(100vw - 80px);
            height:unset;
        }
        .fullinfo{
            display:unset;
            
        }
        .halfinfo{
            display:flexbox;
            max-width: unset;
            width: calc(100% - 10px);
            margin:0px
        }
    }
</style>