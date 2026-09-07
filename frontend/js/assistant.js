document.addEventListener("DOMContentLoaded",()=>{
 const input=document.getElementById("assistant-question"),btn=document.getElementById("assistant-btn"),out=document.getElementById("assistant-answer");
 const answers=[
  {keys:["sea ice"],answer:"Sea ice is frozen seawater that forms, grows and retreats in polar oceans. It affects ocean-atmosphere exchanges, surface reflectivity and polar ecosystems."},
  {keys:["arctic","antarctic","difference"],answer:"The Arctic is an ocean surrounded by continents and the Antarctic is a continent surrounded by the Southern Ocean. Both are polar regions but their geography and climate systems differ."},
  {keys:["glacier"],answer:"A glacier is a persistent body of land ice that flows slowly under its own weight. Glaciers are part of the cryosphere and respond to changes in snow accumulation and melting."},
  {keys:["ice sheet"],answer:"An ice sheet is a very large mass of glacial ice covering extensive land areas. Greenland and Antarctica contain Earth's two major ice sheets."},
  {keys:["polar amplification"],answer:"Polar amplification describes stronger warming or cooling in polar regions compared with the global average over a given period. Feedbacks involving snow, sea ice, clouds and atmosphere-ocean interactions can contribute."},
  {keys:["southern ocean"],answer:"The Southern Ocean surrounds Antarctica and connects major ocean basins. Its circulation and exchanges with the atmosphere and Antarctic ice influence the wider Earth system."},
  {keys:["why","important"],answer:"Polar regions are important because they interact strongly with the atmosphere and oceans, contain major stores of ice and support distinctive ecosystems. Changes there can have effects beyond the polar regions."}
 ];
 function ask(){const q=input.value.trim().toLowerCase();if(!q){out.innerHTML='<div class="search-no-results"><h3>Ask a question</h3><p>Try: What is sea ice? Why are polar regions important?</p></div>';return;}
  const hit=answers.find(x=>x.keys.some(k=>q.includes(k)));
  out.innerHTML=`<article class="search-result"><span class="result-type">POLAR SCIENCE ASSISTANT</span><h3>${hit?'Answer':'I need more information'}</h3><p>${hit?hit.answer:"I can currently explain topics such as sea ice, glaciers, ice sheets, Arctic and Antarctic differences, polar amplification and the Southern Ocean. For detailed research, use All Resources."}</p></article>`;
 }
 btn.addEventListener("click",ask); input.addEventListener("keydown",e=>{if(e.key==="Enter")ask();}); ask();
});