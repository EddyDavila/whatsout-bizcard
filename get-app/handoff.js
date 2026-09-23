const code=new URLSearchParams(location.search).get('agent');
const valid=/^[a-f0-9]{32}$/.test(code||'');
const url=new URL('./',location.href);if(valid)url.searchParams.set('agent',code);
const root=document.querySelector('#referral');
if(valid){const a=document.createElement('a');a.className='button primary';a.href=`../agent/?mode=customer&agent=${encodeURIComponent(code)}`;a.textContent='Save my business referral';root.append(a);}else{const p=document.createElement('p');p.textContent='No agent reference is attached to this link. If an agent introduced you, ask for their personal Business Owner QR before buying.';root.append(p);}
const text=`Get What’s Out and complete your business setup: ${url.href}\nUse the same verified account when saving your agent referral and purchasing in the Android app.`;
const status=document.querySelector('#status');
async function copy(){try{await navigator.clipboard.writeText(url.href);status.textContent='Setup link copied.';}catch{const input=document.querySelector('#fallback');input.hidden=false;input.value=url.href;input.select();status.textContent='Select and copy the setup link below.';}}
document.querySelector('#copy').onclick=copy;
document.querySelector('#share').onclick=async()=>{if(!navigator.share)return copy();try{await navigator.share({title:'Get What’s Out',text,url:url.href});status.textContent='Share dialog completed. Confirm delivery in your messaging app.';}catch(e){if(e.name!=='AbortError')await copy();}};
document.querySelector('#email').href=`mailto:?subject=${encodeURIComponent('Your What’s Out setup link')}&body=${encodeURIComponent(text)}`;
