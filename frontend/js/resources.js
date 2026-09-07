document.addEventListener("DOMContentLoaded", () => {
    const input=document.getElementById("resource-search"), button=document.getElementById("resource-search-btn");
    const category=document.getElementById("category-filter"), region=document.getElementById("region-filter"), type=document.getElementById("type-filter");
    const grid=document.getElementById("resource-grid"), status=document.getElementById("resource-status");
    const esc=v=>String(v??"").replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
    async function load(){
        status.textContent="Loading resources...";
        grid.innerHTML="";
        try{
            const data=await getResources({category:category.value,region:region.value,resource_type:type.value});
            let items=Array.isArray(data)?data:(data.results||[]);
            const q=input.value.trim().toLowerCase();
            if(q) items=items.filter(x=>`${x.title} ${x.description} ${x.category} ${x.region} ${x.source}`.toLowerCase().includes(q));
            if(!items.length){status.textContent="No resources found. Try climate, ice, glacier, ocean or Arctic.";return;}
            status.textContent=`${items.length} resource${items.length===1?"":"s"} found`;
            grid.innerHTML=items.map((x,i)=>`
                <article class="search-result">
                    <span class="result-type">${esc(x.resource_type||"RESOURCE")}</span>
                    <h3>${esc(x.title)}</h3>
                    <p>${esc(x.description)}</p>
                    <div class="result-meta">Category: ${esc(x.category)} · Region: ${esc(x.region)}</div>
                    <div class="result-meta">Source: ${esc(x.source)} · Status: ${esc(x.status)}</div>
                    ${x.external_url ? `<a class="result-link" href="${esc(x.external_url)}" target="_blank" rel="noopener noreferrer">Open Resource ↗</a>` : `<a class="result-link" href="${esc(x.source_url)}" target="_blank" rel="noopener noreferrer">Open Source ↗</a>`}
                </article>`).join("");
        }catch(e){console.error(e);status.textContent="Unable to load resources. Make sure Django is running.";}
    }
    [category,region,type].forEach(el=>el.addEventListener("change",load));
    button.addEventListener("click",load); input.addEventListener("keydown",e=>{if(e.key==="Enter")load();}); load();
});