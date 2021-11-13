import { readable, writable } from 'svelte/store'

import _cardCharacter from '$lib/gamedata/source_gameconfig/CardCharacter.txt?raw'
import _witchskillshow from '$lib/gamedata/source_gameconfig/witch_skill_show.txt?raw'
import _witch_skill from '$lib/gamedata/source_gameconfig/witch_skill.txt?raw'
import _localization_CHS from '$lib/gamedata/xlua/lua_game/language/localization_CHS.lua.txt?raw'
import _talent from '$lib/gamedata/source_gameconfig/Talent.txt?raw'
import _buildDot from '$lib/gamedata/source_gameconfig/BuildDot.txt?raw'
import _jobTranslate from '$lib/custom/translate/Job.json'
import _charTranslate from '$lib/custom/translate/chara.json'
import _witchStep from '$lib/gamedata/source_gameconfig/witch_step.txt?raw'
import _item from '$lib/gamedata/source_gameconfig/item.txt?raw'
let data2 = {
    cardCharacter   : ParseCSVtoObject(_cardCharacter),
    witchskillshow  : ParseCSVtoObject(_witchskillshow),
    witchskill      : ParseCSVtoObject(_witch_skill),
    charaTalent     : ParseCSVtoObject(_talent),
    buildDot        : ParseCSVtoObject(_buildDot),
    witchStep       : ParseCSVtoObject(_witchStep),
    item            : ParseCSVtoObject(_item)
};
let lang = {
    cn : ParseLuaLang(_localization_CHS)
}
let translate = {
    jobTranslate : _jobTranslate,
    charTranslate: _charTranslate
};
let chara = data2.cardCharacter[0]

export const dataglobal = readable(data2)
export const langglobal = readable(lang)
export const translateglobal = readable(translate)
export let charaGlobal = writable(chara)
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