<svelte:head>
    <title>
        {chara.Name_EN} - Burst Witch Codex
    </title>
    <meta property="og:title" content="Burst Witch Codex - {chara.Name_EN}" />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="https://aceship-burstwitchcodex.vercel.app/data/img/source_avatar/hero/head_{chara.Skin[0]}.png" />
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
                {#each chara.musical_use as instrument,i}
                    <div class="instrumentMain">
                        <img class="instrumentframe" src="../data/img/ui/musicframe/frame2.png" alt="{instrument.toString()}">
                        <img class="instrument" src="../data/img/source_icon/musictype/{instrument}.png" alt="{instrument.toString()}">
                    </div>
                {/each}
            </div>
            <div class="buildtypeList">
                {#each chara.Builddotadd as build,i}
                    <div class="buildtypeMain">
                        <img class="buildtypeframe" src="../data/img/ui/musicframe/frame2.png" alt="{build[1]}">
                        <img class="buildtype" src="../data/img/ui/modifier/icon_gouzhu_{build[1]}.png" alt="{build[1]}">
                        
                        <div class="buildstar"> 
                            <!-- {#each Array(parseInt(build[0])) as _,sn}
                                <img class="star" src="../data/img/ui/rarity/smallStarActive.png" alt="">
                            {/each} -->
                            {build[0]} <img class="star" src="../data/img/ui/rarity/smallStarActive.png" alt="">
                        </div>
                    </div>
                {/each}
            </div>
        </div>
        <div class="characterName characterNameBG"></div>
        <div class="charaBg"></div>
        <div class="sidebar">
            <!-- <div>
                <button>skill</button>
            </div>
            <div class="setting">
                <button><i class="fas fa-cog"></i></button>
            </div> -->
            <div>
                <button class:active={infopage===0} on:click={ChangePage(0)}>
                    <img src="../data/img/source_icon/unlock/208.png" alt="">
                    <div>Skills Talents</div>
                </button>
                <button class:active={infopage===1}  on:click={ChangePage(1)}>
                    <img src="../data/img/source_icon/unlock/10203.png" alt="">
                    <div>Build Costs</div>
                </button>
                <button class:active={infopage===2}  on:click={ChangePage(2)}>
                    <img src="../data/img/source_icon/unlock/10204.png" alt="">
                    <div>Story</div>
                </button>
                <!-- <button class:active={infopage===2}  on:click={ChangePage(2)}>Story</button>
                <button class:active={infopage===3}  on:click={ChangePage(3)}>Voice</button> -->
            </div>
        </div>

        <div class="characterName">
            <div class="characterNameEN">{charaEx.name}</div>
            <div class="characterNameCN">{lang.cn[chara.Name]}</div>
            <div class="characterBGName">{charaEx.namebg}</div>
        </div>
        
        <div class="starContainer">
            {#each Array(6) as _,i}
                {#if starnum<=i}
                    <button class="starbutton" on:click={starclick(i+1)}>
                        <img class="star" src="../data/img/ui/rarity/StarInactive.png" alt="">
                    </button>
                {:else}
                    {#if i<parseInt(chara.Quality)-2}
                        <button class="starbutton starunbutton" on:click={starclick(chara.Quality-1)}>
                            <img class="star" src="../data/img/ui/rarity/StarActive.png" alt="">
                        </button>
                    {:else}
                        <button class="starbutton" on:click={starclick(i+1)}>
                            <img class="star" src="../data/img/ui/rarity/StarActive.png" alt="">
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
                <div class='charapiccontainer'>
                    {#each [charabigpicarr[bigpicindex]] as src (bigpicindex)}
                        <img transition:fade class="characterfull" src={src} alt="">
                    {/each}
                </div>
            
                <div class="skincontainer">
                    <button class="skinbutton" class:active={bigpicindex==0} on:click={()=> bigpicindex = 0}>
                        <img src="../data/img/source_avatar/hero/head_{chara.Skin[0]}.png" alt="">
                    </button>
                    <button class="skinbutton" class:active={bigpicindex==1} on:click={()=> bigpicindex = 1}>
                        <img src="../data/img/ui/etc/hg.png" alt="">
                    </button>
                    {#each chara.Skin as skin,i}
                        {#if i!=0}
                        <button class="skinbutton" class:active={bigpicindex==2+i} on:click={()=> bigpicindex = 2+i}>
                            <img src="../data/img/source_avatar/hero/head_{skin}.png" alt="">
                        </button>
                        {/if}
                    {/each}
                </div>
        </div>
        <!-- Right Side -->
        <div class="MenuCharaStats">
            <div style="padding:2px">
                <!-- <div>
                    <label>
                        level : 
                        <input type=number bind:value={level} min=1 max=70>
                        <input type=range bind:value={level} min=1 max=70>
                    </label>
                </div>
                <div class="breachFont">
                    <div class="breach">VIII</div>
                    I II III IV V VI VII VIII
                    i ii iii iv v vi vii viii
                </div> -->
                <div class="jobinfo job-{chara.job}">
                    <div class="jobtitle">{TranslateJobTitle(chara.Name_job)}</div>
                    <div class="jobdesc">{TranslateJobDesc(chara.Name_job_des)}</div>
                </div>
                <div>
                    Attack : <input type=number bind:value={charastat.stat.attack} min=1>
                </div>
                <!-- {parseFloat(chara.OrgAttribute[0][1])+
                (parseFloat(chara.OrgAttribute[0][1])*parseFloat(chara.LvUpAttrRates[0][starnum])*level)+
                parseFloat(chara.StepUpAttrRates[0][starnum])} -->
            </div>
            
            {#if infopage===0}
                <div in:fly={{ x: -200 ,delay:100}} out:fly={{ x: 200 ,duration:100}}  class="fullinfo">
                    <BoxContainer>
                        <span slot='title'>Skills</span>
                        <span slot="container">
                            {#each charaskill as eachskill,i}
                                {#if eachskill.skillshow.length==1}
                                    <SubContainer img='../data/img/source_icon/skill/{eachskill.icon}.png'>
                                        <span slot='infoname'>{SkillNameTL(eachskill,i,starnum)} </span>
                                        <span slot='bgname'>
                                            {#if i==0}
                                                Normal Attack
                                                {:else if i==2}
                                                Auto Skill
                                            {/if}
                                        </span>
                                        <span slot="midcontent">
                                            <div class="infocontent">
                                                <ManaInfo mp={eachskill.skill[0].skill_cost}></ManaInfo>
                                                <CooldownInfo cooldown={eachskill.skill[0].skillCD}></CooldownInfo>
                                                <div class="infoLevel">LV <input class="levelinput" type=number bind:value={charastat.level.skill[i]} min=1 max=20><input class="levelinput" type=range bind:value={charastat.level.skill[i]} min=1 max=20></div>
                                            </div>
                                        </span>
                                        <span slot="containercontent">
                                            {@html SkillDescParser(eachskill,i,starnum,charastat.stat.attack)}
                                        </span>
                                    </SubContainer>
                                {:else}
                                    <SubContainer img='../data/img/source_icon/skill/{eachskill.icon}.png'>
                                        <span slot='infoname'>{SkillNameTL(eachskill,i,starnum)} </span>
                                        <span slot='bgname'>Active Skill</span>
                                        <span slot="midcontent">
                                            <div class="infocontent">
                                                <ManaInfo mp={eachskill.skill[starnum-1].skill_cost}></ManaInfo>
                                                <CooldownInfo cooldown={eachskill.skill[starnum-1].skillCD}></CooldownInfo>
                                                <div class="infoLevel">LV <input class="levelinput" type=number bind:value={charastat.level.skill[i]} min=1 max=20><input class="levelinput" type=range bind:value={charastat.level.skill[i]} min=1 max=20></div>
                                            </div> 
                                        </span>
                                        <span slot="containercontent">
                                            {@html SkillDescParser(eachskill,i,starnum,charastat.stat.attack)}
                                        </span>
                                    </SubContainer>
                                {/if}
                            {/each}
                        </span>
                    </BoxContainer>
                    <BoxContainer>
                        <span slot='title'>Talents</span>
                        <span slot='container'>
                            {#each charatalent as eachtalent,i}
                                <SubContainer img='../data/img/source_icon/talent/{eachtalent.icon}.png'>
                                    <span slot="infoname">{lang.cn[eachtalent.talentdata.Talent_Name]}</span>
                                    <div slot="midcontent">
                                        <div class="starContainer starHorizontal infostar">
                                            {#each Array(parseInt(eachtalent.talentdata.Star)) as _,sn}
                                                <img class="star starSmall" src="../data/img/ui/rarity/StarActive.png" alt="">
                                            {/each}
                                            {#each Array(6-parseInt(eachtalent.talentdata.Star)) as _,sn}
                                                <img class="star starSmall" src="../data/img/ui/rarity/StarInactive.png" alt="">
                                            {/each}
                                        </div>
                                    </div>
                                    <div slot="containercontent">
                                        {@html TalentDescParser(lang.cn[eachtalent.talentdata.desc])}
                                    </div>
                                </SubContainer>
                            {/each}
                        </span>
                    </BoxContainer>
                </div>
                {:else if infopage===1}
                <div in:fly={{ x: -200 ,delay:100}} out:fly={{ x: 200 ,duration:100}} class="fullinfo">
                    <BoxContainer>
                        <span slot='title'>Limit Break Cost</span>
                        <span slot='container'>
                            {#each $dataglobal.witchStep as a ,i}
                            {#if i!=0}
                                <SubContainer>
                                    <span slot="infoname">Limit Break Level {$dataglobal.witchStep[i-1].LevelMax} </span>
                                    <span slot="bgname">Up to level {a.LevelMax}</span>
                                    <div slot='midcontent'>
                                        Item Requirement
                                    </div>
                                    <div slot="containercontent">
                                        {#each a[`StepUpCosts_${chara.attri_type}`] as item, u}
                                            <ItemBox itemid={item[0]} qty={item[1]} ></ItemBox>
                                        {/each}
                                    </div>
                                </SubContainer>
                            {/if}
                        {/each}
                        </span>
                    </BoxContainer>
                    <BoxContainer>
                        <span slot='title'>Affection</span>
                        <span slot='container'>
                                {#each charaFetter as fetter, i}
                                    {#if fetter}
                                        <SubContainer>
                                            <span slot ="infoname">Awakening {i+1} -  {lang.cn[fetter.pic_title]}</span>
                                            <span slot="bgname">Unlock level above {fetter.WitchLevel} </span>
                                            <span slot="midcontent">
                                                {lang.cn[fetter.pic_des]}
                                            </span>
                                            <span slot="containercontent">
                                                <div>
                                                    <div>Item Requirements :</div>
                                                    {#each fetter.RaiseUpCosts as item, i }
                                                        <ItemBox itemid={item[0]} qty={item[1]} ></ItemBox>
                                                    {/each}
                                                </div>
                                                <div>
                                                    <div>Rewards:</div>
                                                    {#each fetter.RaiseUpGifts as item, i }
                                                        <ItemBox itemid={item[1]} qty={item[2]} ></ItemBox>
                                                    {/each}
                                                </div>
                                                
                                            </span>
                                            
                                        </SubContainer>
                                    {/if}
                                {/each}
                        </span>
                    </BoxContainer>
                </div>
                {:else if infopage===2}
                <div in:fly={{ x: -200 ,delay:100}} out:fly={{ x: 200 ,duration:100}} class="fullinfo">
                    <BoxContainer>
                        <span slot='title'>Basic Info</span>
                        <span slot='container'>
                            <SubContainer type="simple">
                                <span slot="content">
                                    <SubContainer type="small">
                                        <span slot ="infoname">CN Name</span>
                                        <span slot="containercontent">{lang.cn[chara.Name]}</span>
                                    </SubContainer>
                                    <SubContainer type="small">
                                        <span slot ="infoname">EN Name</span>
                                        <span slot="containercontent">{chara.Name_EN}</span>
                                    </SubContainer>
                                    <SubContainer type="small">
                                        <span slot ="infoname">Type</span>
                                        <span slot="containercontent">
                                            <div><img class="smallinfoimg" src="../data/img/ui/class/comm_atk_{attacktype}.png" alt=""></div>
                                            <div>{$translateglobal.commonTL.class[attacktype].name}</div>
                                        </span>
                                    </SubContainer>
                                    <SubContainer type="small">
                                        <span slot ="infoname">Attribute</span>
                                        <span slot="containercontent">
                                            <div><img class="smallinfoimg" src="../data/img/ui/element/element{chara.attri_type}.png" alt=""></div>
                                            <div>{$translateglobal.commonTL.attr[chara.attri_type].name}</div>
                                        </span>
                                    </SubContainer>
                                    <SubContainer type="small">
                                        <span slot ="infoname">Rarity</span>
                                        <span slot="containercontent">
                                            <div><img class="smallinfoimg" src="../data/img/ui/rarity/{$translateglobal.commonTL.rarity[chara.Quality].icon}.png" alt=""></div>
                                            <div>{$translateglobal.commonTL.rarity[chara.Quality].fullname}</div>
                                        </span>
                                    </SubContainer>
                                    <SubContainer type="small">
                                        <span slot ="infoname">Characteristic</span>
                                        <span slot="containercontent">
                                            <div><img class="smallinfoimg" src="../data/img/source_icon/music_hall/race_{chara.Appearance[0]}.png" alt=""></div>
                                            <div>{$translateglobal.commonTL.characteristic[chara.Appearance[0]].name}</div>
                                        </span>
                                    </SubContainer>
                                    <SubContainer type="small">
                                        <span slot ="infoname">Race</span>
                                        <span slot="containercontent">
                                            <div>{$translateglobal.commonTL.race[chara.RaceID].name}</div>
                                        </span>
                                    </SubContainer>
                                </span>
                            </SubContainer>
                        </span>
                    </BoxContainer>
                    <BoxContainer>
                        <span slot='title'>Other Info</span>
                        <span slot='container'>
                            <SubContainer type="simple">
                                <span slot="content">
                                    <SubContainer type="small">
                                        <span slot ="infoname">Height</span>
                                        <span slot="containercontent">{chara.CardInfor[0]}</span>
                                    </SubContainer>
                                    <SubContainer type="small">
                                        <span slot ="infoname">Weight</span>
                                        <span slot="containercontent">{chara.CardInfor[2]}</span>
                                    </SubContainer>
                                    <SubContainer type="small">
                                        <span slot ="infoname">Age</span>
                                        <span slot="containercontent">{chara.CardInfor[1]}</span>
                                    </SubContainer>
                                    <SubContainer type="small">
                                        <span slot ="infoname">Blood Type</span>
                                        <span slot="containercontent">{chara.CardInfor[3]}</span>
                                    </SubContainer>
                                    <SubContainer type="small">
                                        <span slot ="infoname">3-Size</span>
                                        <span slot="containercontent">{chara.CardInfor[4].join(" ")}</span>
                                    </SubContainer>
                                    <SubContainer type="small">
                                        <span slot ="infoname">Birthday</span>
                                        <span slot="containercontent">{chara.CardInfor[5]}</span>
                                    </SubContainer>
                                </span>
                            </SubContainer>
                        </span>
                    </BoxContainer>
                    <BoxContainer grow={true}>
                        <span slot='title'>Story</span>
                        <span slot='container'>
                                {#each charaStory as story, i}
                                    {#if story}
                                        <SubContainer>
                                            <span slot ="infoname">Story {i+1} -  {story.title}</span>
                                            <span slot="bgname">Require bonds over {story.req} </span>
                                            
                                            <span slot="containercontent">
                                                {@html story.desc}
                                                
                                            </span>
                                            
                                        </SubContainer>
                                    {/if}
                                {/each}
                        </span>
                    </BoxContainer>
                </div>
            {/if}
        </div>
    </div>
</div>


<script>
    import { fly } from 'svelte/transition';
    import { fade } from 'svelte/transition'
    import { slide } from 'svelte/transition';
    import { dataglobal , langglobal , charaGlobal, translateglobal } from '../js/stores.js';
    import { getContext } from "svelte";
    const {open} = getContext('simple-modal');
    import witchselection from '../witchselection.svelte';
    import BoxContainer from '../components/BoxContainer.svelte';
    import SubContainer from '../components/SubContainer.svelte';
    import ItemBox from '../components/ItemBox.svelte';
    import ManaInfo from '../components/ManaInfo.svelte';
    import CooldownInfo from '../components/CooldownInfo.svelte';

    import Characteravatar from "../components/characteravatar.svelte";
    import { page } from '$app/stores';
import { attr } from 'svelte/internal';
    let id = $page.params.id;

    let data = $dataglobal
    let lang = $langglobal

    let devmode = false;

    // console.log(id)
    console.log($dataglobal)
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

    // console.log($dataglobal.buildDot)
    let charaName = chara.Name_EN
    let charaId = chara.id+"0001"
    let attacktype = chara.AtkType
    let starnum = parseInt(chara.Star)
    let quality = parseInt(chara.Quality) 
    let charabigpic = `../data/img/source_avatar/hero_book/body_${chara.id}.png`
    let charabigpicarr = []
    let bigpicindex = 0
    let level = 1
    let charaskill = []
    let charatalent = []
    let charaFetter = []
    let charaStory = []
    let charaEx={
        name:chara.Name_EN,
        namebg : chara.Name_EN
    }
    let infopage=0

    changeChara(chara)

    const starclick = num=>() => {
        starnum = num
    }
    const ChangePage= num=>() =>{
        infopage=num
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
        charabigpic = `../data/img/source_avatar/hero_book/body_${chara.id}.png`
        attacktype = chara.AtkType
        starnum = parseInt(chara.Star)
        quality = parseInt(chara.Quality) 
        bigpicindex = 0
        infopage = 0
        
        CheckTL()
        CheckFetter() 
        updateSkill() 
        updateTalent()
        CreatePicList()
        CheckStory()
    }
    ////Character stuff 


    function CheckTL(){
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
    //Skill
    function updateSkill() {
        charaskill = []
        chara.OrgSkills.forEach(element => {
            let skillObject = {
                skilltranslate:{}
            }

            skillObject.skillshow = data.witchskillshow.filter(obj =>{
                return obj.id ==element
            })
            skillObject.skill = data.witchskill.filter(obj=>{
                return obj.id == element
            })

            if($translateglobal.charTL[chara.id]&&$translateglobal.charTL[chara.id].skills){
                skillObject.skilltranslate = $translateglobal.charTL[chara.id].skills
            }

            skillObject.icon = skillObject.skillshow[0].skill_icon
            charaskill.push(skillObject)
        });
    }
    
    console.log(charaskill)
    //Talent
    function updateTalent() {
        charatalent = []
        chara.NewTalentID.forEach(element => {
            let talentObject = {}

            talentObject.talentdata = data.charaTalent.filter(obj =>{
                return obj.id == element[1]
            })[0]
            // console.log(talentObject)
            talentObject.icon = talentObject.talentdata.Talent_ICON
            charatalent.push(talentObject)
        });
    }
    // console.log(charatalent)
    function SkillNameTL(skill,skillnumber,starnum){
        let skillname 
        if(skill.skillshow.length>1){
            skillname = lang.cn[skill.skillshow[starnum-1].skill_name]

            if(skill.skilltranslate[skillnumber]&&skill.skilltranslate[skillnumber][starnum-1].name!=""){
                skillname = skill.skilltranslate[skillnumber][starnum-1].name
            }
        }else{
            skillname = lang.cn[skill.skillshow[0].skill_name]
            
            if(skill.skilltranslate[skillnumber]&&skill.skilltranslate[skillnumber].name!=""){
                skillname = skill.skilltranslate[skillnumber].name
            }
        }
        return skillname
    }
    function SkillDescParser(skill,skillnumber,starnum,attack){
        let skillLevel = charastat.level.skill[skillnumber]
        let skilldesc 
        let skillstar = skill.skillshow.length>1?starnum-1:0
        // console.log(skillnumber)
        if(skill.skillshow.length>1){
            skilldesc = ChangeDescriptionformat(lang.cn[skill.skillshow[starnum-1].SkillInfo])

            if(skill.skilltranslate[skillnumber]&&skill.skilltranslate[skillnumber][starnum-1].desc!=""){
                skilldesc = ChangeDescriptionformat(skill.skilltranslate[skillnumber][starnum-1].desc)
            }
        }else{
            skilldesc = ChangeDescriptionformat(lang.cn[skill.skillshow[0].SkillInfo])
            
            if(skill.skilltranslate[skillnumber]&&skill.skilltranslate[skillnumber].desc!=""){
                skilldesc = ChangeDescriptionformat(skill.skilltranslate[skillnumber].desc)
            }
        }
        
        // console.log(skilldesc)
        skilldesc = skilldesc.replace(/%%/g,"%")
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
        // console.log(desc)
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

    function TranslateJobTitle(text){
        var tl = lang.cn[text]
        var jobsplit = tl.split("，")
        
        // console.log(jobsplit)
        var jobs = []
        jobsplit.forEach(job => {
            let jobtl = $translateglobal.jobTL.title[job]
            // console.log(job)
            if(!jobtl){
                jobtl = job
            }
            jobs.push(jobtl)
        });
        return jobs.join(" | ")
    }
    function TranslateJobDesc(text) {
        var tl = lang.cn[text]
        var jobsplit = tl.split(/[，]/g)
        
        var jobs = []
        jobsplit.forEach(job => {
            let jobtl = $translateglobal.jobTL.description[job]
            // console.log(job)
            if(!jobtl){
                jobtl = job
            }
            jobs.push(jobtl)
        });
        return jobs.join(", ")
    }

    function CheckFetter() {
        charaFetter = []
        let fettersearch =  data.cardCharacterSublimation.find(id=>{
            return id.id == chara.StepUp_id
        })
        if (fettersearch)charaFetter.push(fettersearch)
        
    }
    
    function CheckStory() {
        charaStory = []
        chara.Story_id.forEach(element => {
            let storysearch = data.charastory.find(story =>{
                return story.id == element[2]
            })

            let title = lang.cn[storysearch.title].replace(/(?:\r\n|\r|\n)/g, '<br>');
            let desc = lang.cn[storysearch.des].replace(/(?:\r\n|\r|\n)/g, '<br>');
            charaStory.push({req:element[1], title:title, desc:desc})
        });
    }
    function CreatePicList() {
        charabigpicarr = []
        charabigpicarr.push(`../data/img/source_avatar/hero_book/body_${chara.id}.png`)
        charabigpicarr.push(`../data/img/source_avatar/haogan/haogan_${chara.id}.png`)
        chara.Skin.forEach(skin => {
            charabigpicarr.push(`../data/img/source_avatar/hero/body_${skin}.png`)
        });
    }
</script>

<style>
    @font-face{
        font-family : Magiera;
        src : url(/data/font/Magiera-Script-2.ttf) 
    }
    @font-face{
        font-family : AaGothic;
        src : url(/data/font/AaGothic.ttf)
    }
    :global(body) {
        background-color: #111;
        color: #dddddd;
        transition: background-color 0.3s
    }
    
    .Quickmenu {
        position: absolute;
        left:650px;
        top:8px;
        z-index: 20;
        /* filter: drop-shadow(1px 1px 2px #111); */
        
    }
    
    .Quickmenu .charaBg {
        position: absolute;
        width: 0;
        height: 0;
        border: 70px solid transparent;
        border-color:#333;
        top: -70px;
        pointer-events: none;
        /* filter: drop-shadow(1px 1px 2px #111); */
        
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
        pointer-events: none;
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
        pointer-events: none;
        
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
        left:52px;
        padding:6px 10px 10px 75px;
        height:35px;
        background:#444;
        /* filter: drop-shadow(1px 1px 2px #111); */
        /* outline: 1px solid #00000099; */
        border: solid #222;
        border-width: 0px 0px 1px 0px;
        
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
        /* filter: drop-shadow(1px 1px 2px #111); */
        outline: 1px solid #00000099;
    }
    .characterName .characterNameEN{
        font-size: 2.5em;
        /* font-family: aAGothic; */
    }
    .characterName .characterNameCN{
        font-size: 1.1em;
        /* font-family: simhei; */
    }
    .characterName .characterBGName{
        position:absolute;
        font-size:3em;
        top:26px;
        left:170px;
        opacity:20%;
        font-family: Magiera;
    }
    .Quickmenu .starContainer{
        position: absolute;
        left:0px;
        top:100px;
        background: #333;
        padding:5px;
    }

    .sidebar{
        display:inline-flex;
        width:49px;
        height:calc(100vh - 352px);
        background:#333;
        padding:0px;
        padding-top:350px;
        margin-left: -2px;
        margin-top:-20px;
        flex-direction: column;
        border: 1px solid #555;
        outline: 1px solid #00000099;
    }

    .sidebar button{
        position:relative;
        border:none;
        background:#444;
        margin-bottom:2px;
        width:49px;
        height:90px;
        border: solid #222;
        border-width: 1px 0px 1px 0px;
        color:#ddd;
        padding:0px;
        padding-top:35px;
        justify-items: center;
        font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
        /* border-radius: 5px 0px 0px 5px; */
    }
    .sidebar button img{
        position:absolute;
        top:5px;
        left:5px;
        width:40px;
        height:40px;
        object-fit: contain;
    }
    .sidebar button div{
        background:#00000044;
        padding:1px;
    }
    .sidebar button:hover{
        background:#444
    }
    .sidebar button.active{
        /* border-width: 4px 0px 1px 5px; */
        border: solid #333;
        border-width: 1px 0px 1px 0px;
        background:#222;
    }
    .setting{
        justify-self: flex-end;
    }
    /* .setting button{
        font-size: 20px;
        width:34px;
        height:34px;
    } */
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

    .smallinfoimg{
        width:40px;
        height:40px;
        object-fit: contain;
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

    .buildtypeList{
        display:inline-flex;
        margin-top:-5px;
        margin-left:2px;
        padding:4px 10px 4px 10px;
        background:#00000033;
        height:42px;
        /* min-width:60px; */
        justify-content: center;
    }
    .buildtypeMain{
        position: relative;
        display:inline-flex;
        width:40px;
        height:40px;
        justify-content: center;
        align-items: center;
        padding:0px 8px 0px 0px;
    }
    .buildtypeMain .buildtypeframe{
        position: absolute;
        width: 40px;
    }
    .buildtypeMain .buildtype{
        position: absolute;
        width: 30px;
        height: 30px;
        object-fit: contain;
    }
    .buildtypeMain .buildstar{
        position:absolute;
        right:0px;
        bottom:-5px;
        background: #222;
        padding:1px;
        border-radius: 4px;
        /* transform: rotate(45deg); */
    }
    .buildtypeMain .star{
        width:16px;
        height:16px;
        object-fit: contain;
        padding:0px;
        margin:-2px;
        margin-left: -7px;
        /* margin-left: -4px; */
        /* transform: rotate(-45deg); */
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
        height: calc(100vh - 150px);
        padding: 140px 0px 0px 14px;
        overflow-y: scroll;
    }
    .charapiccontainer{
        display:inline-flex;
        align-items: center;
        justify-content: center;
        position:relative;
        height: calc(100vh - 20px);
        width: 680px;
        z-index:-1;
    }
    .characterfull{
        /* position: fixed;
        right:50px;
        top:10%;
        z-index: -10; */
        position:absolute;
        height: calc(100vh - 20px);
        width: 680px;
        object-fit: scale-down;
        /* transition: opacity 0.5s, width 0.5s, height 0.5s, src 0.5s; */
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
        font-variant: lighter;
    }
    .breach{
        display:inline-flex;
        transform:scaleX(70%)
    }
    .fullinfo{
        display:inline-flex;
        width:100%;
        flex-wrap: wrap;
        gap: 5px 2px;
    }
    .infocontent{
        display:inline-flex;
        align-items:center;
        padding:6px 0px;
    }
    
    .infoLevel{
        display:inline-flex;
        padding:0px 4px 0px 4px;
        margin-left:6px;
        align-items:center;
        background:#222;
    }
    .levelinput[type=number]{
        padding:2px;
        margin-left:4px;
        width:30px;
        text-align: center;
    }

    .infostar{
        display: inline-flex;
        min-width:190px;
        margin-top:4px;
        padding:4px 5px;
        align-items:flex-end;
        /* background:#222; */
    }
    .skilldesc{
        background:#343434;
        padding:4px 4px;
        border-radius: 0px 0px 12px 12px;
    }
    input[type=number]{
        -webkit-appearance: none;
        -moz-appearance: textfield;
        background-color: #111;
        border: solid 1px #888;
        font-size:15px;
        min-width:unset;
        width:unset;
        color: white;
    }


    .jobinfo{
        display:inline-flex;
        margin: 6px 1px;
        padding:2px 2px;
        border-radius: 6px;
        justify-content: center;
        align-items: stretch;
        text-align: center;
        flex-direction: column;
        /* filter: drop-shadow(1px 1px 2px #000); */
        outline: 1px solid #00000099;
        /* border: 1px solid #444; */
    }
    .jobtitle{
        /* display:inline-flex; */
        padding:4px 8px 4px 8px;
        background:#222;
        color:#ccc;
        break-after: always;
        page-break-after: always;
        border-radius: 3px 3px 0px 0px;
        margin-bottom:0px;
        
    }
    .job-1{  /*Attack*/
        background:rgb(249, 100, 42);
    }
    .job-2{  /*Defense*/
        background:rgb(103, 189, 244);
    }
    .job-3{  /*Support*/
        background:rgb(197, 244, 150);
    }
    .jobdesc{
        padding:2px 8px;
        background:#999;
        color:black;
        border-radius: 0px 0px 4px 4px;
        border: 1px solid #444;
    }
    .skincontainer{
        position:absolute;
        display:inline-flex;
        flex-direction: column;
        top:50px;
        left:0px;
    }
    .skinbutton{
        display:inline-flex;
        width:80px;
        height:80px;
        border:1px solid #444;
        outline: 2px solid #00000099;
        background: #111;
        padding:0px;
        margin:1px;
        border-radius: 6px;
        align-items: center;
        justify-content: center;
    }
    .skinbutton.active{
        background:#222;
        border:1px solid #888;
    }
    .skinbutton img{
        width:76px;
        height:76px;
        border-radius: 4px;
    }

    @media (max-width: 1500px){
        .Quickmenu{
            left:calc(40vw - 30px);
        }
        .Quickmenu .characterName{
            width: 50vw;
        }
        .MenuFull{
            grid-template-columns: 40vw ;
        }
        .charapiccontainer{
            width:500px;
        }
        .characterfull{
            width:500px;
        }
    }
    @media (max-width: 1370px){
        .MenuFull{
            grid-template-columns: 40vw ;
        }
        .Quickmenu .characterName{
            width: 46vw;
        }
    }
    @media (max-width: 1080px){
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
            width:calc(100vw - 30px);
            height: min(70vh,800px);
            padding-top: 120px;
        }
        .charapiccontainer{
            width:calc(100vw - 30px);
            height: min(70vh,800px)
        }
        .characterfull{
            width:calc(100vw - 30px);
            height: min(70vh,800px)
        }
        .MenuCharaStats{
            padding:2px 2px 2px 46px;
            width: calc(100vw - 78px);
            height:unset;
            overflow-y:visible;
            border-top: 1px solid #444;
            border-radius: 12px 12px 0px 0px;
        }
        .skincontainer{
            top:160px;
            left:unset;
            right:-10px;
            transform:scale(75%)
        }
    }
    @media (max-width: 900px ){
        .MenuCharaStats{
            width: calc(100vw - 58px);
        }
        .characterName .characterBGName{
            font-size:2em;
            top:unset;
            left:unset;
            bottom:-8px;
            right:30px;
        }
    }

    
    /* .charactercard{
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
    } */
</style>