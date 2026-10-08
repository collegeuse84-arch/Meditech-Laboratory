const WA='919370591948';
const $=s=>document.querySelector(s);
let cart=JSON.parse(localStorage.getItem('mt-cart')||'[]'), cat='all';
const save=()=>localStorage.setItem('mt-cart',JSON.stringify(cart));
function chips(){ $('#chips').innerHTML=[{id:'all',name:'All tests'},...CATEGORIES].map(c=>`<button class="chip" aria-pressed="${c.id===cat}" data-c="${c.id}">${c.name}</button>`).join(''); }
function render(){
  const q=$('#q').value.trim().toLowerCase(); let n=0;
  $('#list').innerHTML=CATEGORIES.filter(c=>cat==='all'||c.id===cat).map(c=>{
    const t=c.tests.filter(x=>!q||x.toLowerCase().includes(q)||c.name.toLowerCase().includes(q)); if(!t.length)return''; n+=t.length;
    return `<section class="cat"><h3><span aria-hidden="true">${c.icon}</span> ${c.name}</h3><p class="about">${c.about}</p>${c.note?`<p class="note">${c.note}</p>`:''}<ul>${t.map(x=>c.referral?`<li class="ref">${x}</li>`:`<li><label><input type="checkbox" data-t="${x.replace(/"/g,'&quot;')}" ${cart.includes(x)?'checked':''}> ${x}</label></li>`).join('')}</ul></section>`}).join('')||'<p class="empty">No test found. Try another name, or call the lab. Special tests can be sent to partner labs.</p>';
  $('#count').textContent=n+' tests shown';
}
function cartUI(){ $('#cn').textContent=cart.length; $('#sel').innerHTML=cart.length?cart.map(x=>`<li>${x} <button data-r="${x.replace(/"/g,'&quot;')}" aria-label="Remove ${x}">×</button></li>`).join(''):'<li class="empty">Nothing selected yet. Tick tests in the directory.</li>'; }
document.addEventListener('change',e=>{ if(e.target.dataset.t){const t=e.target.dataset.t; cart=e.target.checked?[...new Set([...cart,t])]:cart.filter(x=>x!==t); save(); cartUI(); }});
document.addEventListener('click',e=>{ const d=e.target.dataset; if(d.c){cat=d.c;chips();render();} if(d.r){cart=cart.filter(x=>x!==d.r);save();cartUI();render();} });
$('#q').addEventListener('input',render);
$('#clear').onclick=()=>{cart=[];save();cartUI();render();};
$('#send').onclick=()=>{
  const nm=$('#pn').value.trim(), ag=$('#pa').value.trim(), dr=$('#dr').value.trim();
  if(!cart.length){alert('Please select at least one test.');return;} if(!nm){alert('Please enter the patient name.');return;}
  const msg=`Hello Meditech Laboratory,\nI would like to enquire / book these tests:\n${cart.map((x,i)=>(i+1)+'. '+x).join('\n')}\n\nPatient: ${nm}${ag?'\nAge: '+ag:''}${dr?'\nReferring doctor: '+dr:''}\nPlease confirm preparation instructions and timings.`;
  open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`,'_blank');
};
chips(); render(); cartUI();
if('serviceWorker' in navigator && location.protocol.startsWith('http')) navigator.serviceWorker.register('sw.js');
let dp; addEventListener('beforeinstallprompt',e=>{e.preventDefault();dp=e;$('#install').hidden=false;});
$('#install').onclick=()=>dp&&dp.prompt();
