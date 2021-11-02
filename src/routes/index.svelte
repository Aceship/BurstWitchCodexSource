


<div class="starContainer">
    {#each Array(6) as _,i}
        {#if starnum<=i}
            <button class="starbutton" on:click={starclick(i+1)}>
                <img class="star starinactive" alt="star">
            </button>
            {:else}
            {#if i<parseInt(chara.Quality)-2}
                    <button class="starbutton starunbutton" on:click={starclick(chara.Quality-1)}>
                        <img class="star staractive" alt="star">
                    </button>
                {:else}
                    <button class="starbutton" on:click={starclick(i+1)}>
                        <img class="star staractive" alt="star">
                    </button>
            {/if}
        {/if}
    {/each}
</div>
<div class="charactercard">
    <img class="cardpic" src={card} alt="">
    <img class="cardframe" src="/data/img/ui/chara_frame/cardframe_{quality-1+ Math.floor((starnum-quality+1)/2)}.png" alt="">
    <img class="elementframe" alt="{element}">
    <img class="element element-{element}" alt="{element}">
    <img class="typeframe" alt="{attacktype}">
    <img class="type type-{attacktype}" alt="{attacktype}">
</div>

<div class="characteravatar">
    <img class="displaypic" src={avatar} alt="">
    <img class="avatarframe" src="/data/img/ui/chara_frame/avatarframe_{quality-1+ Math.floor((starnum-quality+1)/2)}.png" alt="">
    <img class="elementframe" alt="{element}">
    <img class="element element-{element}" alt="{element}">
</div>
<div class="charainfo">
    {charaName}
</div>

<div style="background:#333;padding:1px 5px;margin:5px">
    <h1>Skills</h1>
    {#each charaskill as eachskill,i}
        <div>
            <div style="background:#444;margin:10px;padding:10px" >
                <img class="" style="width: 50px;" src ='/data/img/source_icon/skill/{eachskill.icon}.png' alt="{eachskill.icon}">
                {#if eachskill.skillshow.length==1}
                        {lang.cn[eachskill.skillshow[0].skill_name]}
                        <br>
                        {lang.cn[eachskill.skillshow[0].SkillInfo]}
                    {:else}
                        {lang.cn[eachskill.skillshow[starnum-1].skill_name]}
                        <br>
                        {lang.cn[eachskill.skillshow[starnum-1].SkillInfo]}
                {/if}
            </div>
        </div>
    {/each}
</div>
<div style="background:#333;padding:1px 5px;margin:5px">
    <h1>Talents</h1>
    {#each charatalent as eachtalent,i}
        <div style="background:#444;margin:10px;padding:10px" >
            <img class="" style="width: 50px;" src ='/data/img/source_icon/talent/{eachtalent.icon}.png' alt="{eachtalent.icon}">
            <div class="starContainer starHorizontal">
                {#each Array(parseInt(eachtalent.talentdata.Star)-1) as _,sn}
                    <img class="star staractive starSmall" alt="star">
                {/each}
            </div>
            <br>
            {lang.cn[eachtalent.talentdata.Talent_Name]}
            <br><br>
            {lang.cn[eachtalent.talentdata.desc]}
        </div>
    {/each}
</div>


<script>
    import _cardCharacter from '$lib/gamedata/source_gameconfig/CardCharacter.txt?raw'
    import _witchskillshow from '$lib/gamedata/source_gameconfig/witch_skill_show.txt?raw'
    import _localization_CHS from '$lib/gamedata/xlua/lua_game/language/localization_CHS.lua.txt?raw'
    import _talent from '$lib/gamedata/source_gameconfig/Talent.txt?raw'
    let data = {};
    let lang = {}
    data.cardCharacter = ParseCSVtoObject(_cardCharacter)
    data.witchskillshow = ParseCSVtoObject(_witchskillshow)
    data.charaTalent = ParseCSVtoObject(_talent)
    lang.cn = ParseLuaLang(_localization_CHS)
    
    let chara = data.cardCharacter[3]
    let charaName = chara.Name_EN
    let id = chara.id+"0001"
    let element = chara.attri_type
    let attacktype = chara.AtkType
    let starnum = parseInt(chara.Star)
    let quality = parseInt(chara.Quality) 

    $: console.log(starnum)

    console.log(chara.OrgSkills)
    let avatar = "/data/img/source_avatar/hero_main/head_"+id+".png"

    // console.log(cardCharacter)
    let card = "/data/img/source_avatar/hero/card_"+id+".png"

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

    ////Data Parser

    function ParseLuaLang(lang){
        let langtext = lang.split(/\r?\n/g)
        langtext.shift()
        langtext.shift()
        langtext.unshift("{\r\n")
        let langfilter = langtext.filter((a) => a);
        for (let i = 0; i < langfilter.length; i++) {
            langfilter[i] = langfilter[i].replace(/\\2件套/g,"\\n2件套")
            langfilter[i] = langfilter[i].replace(/\[(.+)\] = "(.+)?",?/g, function(m, rtf, text) {
                if(i==langfilter.length-2){
                    return `"${rtf}" : "${text}"\n`
                }
                return `"${rtf}" : "${text}",\n`
            })    
        }
        return JSON.parse(langfilter.join(""))
    }
    function ParseCSVtoObject(csvtxt) {
        let csvsplit = csvtxt.split(/\r?\n/g)
        let csvjson = []
        let csvheader = csvsplit.slice(0,3)
        let csvcolname = csvheader[1].split(/,/g)
        let csvcoltype = csvheader[2].split(/,/g)
        let csvcontent = csvsplit.slice(3,csvsplit.length)
    
        csvcontent.forEach(row => {
            let csvobject = {}
            let csvrowsplit = row.split(/,/g)
            for (let i = 0; i < csvcolname.length; i++) {
                const col = csvcolname[i];
                // console.log(csvcoltype[i])
                if(csvcoltype[i].includes("array")){
                    let arraysplithead = csvcoltype[i].split(/_/g)
                    arraysplithead = arraysplithead.slice(1,arraysplithead.length)
                    csvobject[col]=csvrowsplit[i].split(arraysplithead[arraysplithead.length-1])
                    if(arraysplithead.length==2){
                        for (let j = 0; j < csvobject[col].length; j++) {
                            csvobject[col][j] = csvobject[col][j].split(arraysplithead[0])
                        }
                    }else if(arraysplithead.length>2){
                        console.log(`its ${arraysplithead.length} kind of split array ( ${arraysplithead} )`)
                    }
                }
                else{
                    csvobject[col]=csvrowsplit[i]
                }
                
            }
            csvjson.push(csvobject)
        });
        return csvjson
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
    .characteravatar{
        position: relative;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        width: 120px;
        height: 120px;
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
    .characteravatar .elementframe{
        position: absolute;
        width: 40px;
        right:0px;
        bottom: 0px;
    }
    .characteravatar .element{
        position: absolute;
        width: 34px;
        right: 3px;
        bottom: 3px;
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
    .starContainer .staractive{
        content: url("/data/img/ui/rarity/StarActive.png");
    }
    .starContainer .starinactive{
        content: url("/data/img/ui/rarity/StarInactive.png");
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

    .elementframe{
        content: url("/data/img/ui/element/elementframe1.png");
    }
    .element-0{
        content: url("/data/img/ui/element/element0.png");
    }
    .element-1{
        content: url("/data/img/ui/element/element1.png");
    }
    .element-2{
        content: url("/data/img/ui/element/element2.png");
    }
    .element-3{
        content: url("/data/img/ui/element/element3.png");
    }

    .typeframe{
        content: url("/data/img/ui/element/elementframe1.png");
    }
    .type-1{
        content: url("/data/img/ui/class/comm_atk_1.png");
    }
    .type-2{
        content: url("/data/img/ui/class/comm_atk_2.png");
    }
    .type-3{
        content: url("/data/img/ui/class/comm_atk_3.png");
    }
    .type-4{
        content: url("/data/img/ui/class/comm_atk_4.png");
    }
    .type-5{
        content: url("/data/img/ui/class/comm_atk_5.png");
    }
    .type-6{
        content: url("/data/img/ui/class/comm_atk_6.png");
    }
    

</style>