


<div class="starContainer">
    {#each Array(6) as _,i}
        {#if starnum<=i}
            <button class="starbutton" on:click={starclick(i+1)}>
                <img class="star" src="./data/img/ui/rarity/StarInactive.png" alt="star">
            </button>
        {:else}
            {#if i<parseInt(chara.Quality)-2}
                <button class="starbutton starunbutton" on:click={starclick(chara.Quality-1)}>
                    <img class="star" src="./data/img/ui/rarity/StarActive.png" alt="star">
                </button>
            {:else}
                <button class="starbutton" on:click={starclick(i+1)}>
                    <img class="star" src="./data/img/ui/rarity/StarActive.png" alt="star">
                </button>
            {/if}
        {/if}
    {/each}
</div>
<div class="charactercard">
    <img class="cardpic" src={card} alt="">
    <img class="cardframe" src="./data/img/ui/chara_frame/cardframe_{quality-1+ Math.floor((starnum-quality+1)/2)}.png" alt="">
    <img class="elementframe" src="./data/img/ui/element/elementframe1.png" alt="{element}">
    <img class="element" src="./data/img/ui/element/element{element}.png" alt="{element}">
    <img class="typeframe" src="./data/img/ui/element/elementframe1.png" alt="{attacktype}">
    <img class="type" src="./data/img/ui/class/comm_atk_{attacktype}.png" alt="{attacktype}">
</div>
<div class="characteravatar">
    <Modal>
        <Content quality={quality-1}/>
    </Modal>
</div>


<div class="charainfo">
    {charaName}
</div>

<div style="background:#333;padding:1px 5px;margin:5px">
    <h1>Skills</h1>
    {#each charaskill as eachskill,i}
        <div>
            <div style="background:#444;margin:10px;padding:10px" >
                <img class="" style="width: 50px;" src ='./data/img/source_icon/skill/{eachskill.icon}.png' alt="{eachskill.icon}">
                {#if eachskill.skillshow.length==1}
                    <div>{lang.cn[eachskill.skillshow[0].skill_name]}</div>
                    <div>{lang.cn[eachskill.skillshow[0].SkillInfo]}</div>
                {:else}
                    <div>{lang.cn[eachskill.skillshow[starnum-1].skill_name]}</div>
                    <div>{lang.cn[eachskill.skillshow[starnum-1].SkillInfo]}</div>
                {/if}
            </div>
        </div>
    {/each}
</div>
<div style="background:#333;padding:1px 5px;margin:5px">
    <h1>Talents</h1>
    {#each charatalent as eachtalent,i}
        <div style="background:#444;margin:10px;padding:10px" >
            <img class="" style="width: 50px;" src ='./data/img/source_icon/talent/{eachtalent.icon}.png' alt="{eachtalent.icon}">
            <div class="starContainer starHorizontal">
                {#each Array(parseInt(eachtalent.talentdata.Star)-1) as _,sn}
                    <img class="star starSmall" src="./data/img/ui/rarity/StarActive.png" alt="star">
                {/each}
            </div>
            <div>{lang.cn[eachtalent.talentdata.Talent_Name]}</div>
            <div>{lang.cn[eachtalent.talentdata.desc]}</div>
        </div>
    {/each}
</div>


<script>
    import Content from './modalselect.svelte';
    import Modal from 'svelte-simple-modal';
    import { dataglobal , langglobal , charaGlobal } from './js/stores.js';
    import './css/maincodex.css'

    let data = $dataglobal
    let lang = $langglobal

    let chara = $charaGlobal
    let charaName = chara.Name_EN
    let charaId = chara.id+"0001"
    let element = chara.attri_type
    let attacktype = chara.AtkType
    let starnum = parseInt(chara.Star)
    let quality = parseInt(chara.Quality) 

    console.log(chara.OrgSkills)
    let avatar = "./data/img/source_avatar/hero_main/head_"+charaId+".png"

    // console.log(cardCharacter)
    let card = "./data/img/source_avatar/hero/card_"+charaId+".png"

    const starclick = num=>() => {
        starnum = num
    }


    ////Character stuff 

    //Skill
    let charaskill = []
    chara.OrgSkills.forEach(element => {
        let skillObject = {
            icon:element
        }

        skillObject.skillshow = data.witchskillshow.filter(obj =>{
            return obj.id ==element
        })

        charaskill.push(skillObject)
    });

    //Talent
    let charatalent = []
    chara.NewTalentID.forEach(element => {
        let talentObject = {}

        talentObject.talentdata = data.charaTalent.filter(obj =>{
            return obj.id == element[1]
        })[0]
        console.log(talentObject)
        talentObject.icon = talentObject.talentdata.Talent_ICON
        charatalent.push(talentObject)
    });
</script>