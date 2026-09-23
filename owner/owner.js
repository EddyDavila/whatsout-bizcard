import {auth,db,call,message,connect} from '../web-account.js';
import {collection,query,orderBy,limit,getDocs} from 'https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js';
const desk=document.querySelector('#desk');
const panel=document.querySelector('#share-panel');
let invitation=null;
async function refresh() {
  // Firestore's isGod rule is the authority; no client-side role grants access.
  const uid=auth.currentUser?.uid;
  const records=await getDocs(query(collection(db,'sales_invites'),orderBy('createdAt','desc'),limit(25)));
  if(auth.currentUser?.uid!==uid)return;
  const list=document.querySelector('#invites');list.replaceChildren();
  for(const record of records.docs){
    const data=record.data();const card=document.createElement('article');card.className='benefit';
    const title=document.createElement('h3');title.textContent=data.fullName||'Invitation';
    const text=document.createElement('p');const expired=data.expiresAt?.toMillis()<Date.now();
    text.textContent=`${data.emailLower} · ${expired&&data.status==='pending'?'expired':data.status} · ${data.territory||''}`;
    card.append(title,text);
    if(data.status==='pending'){
      const button=document.createElement('button');button.className='button';button.textContent='Revoke invitation';
      button.onclick=async()=>{
        if(!confirm(`Revoke the invitation for ${data.fullName}? Their current invitation will stop working.`))return;
        button.disabled=true;
        try{await call('revokeSalesInvite',{invitationId:record.id});if(invitation?.id===record.id){panel.hidden=true;invitation=null;}await refresh();message('Invitation revoked.');}
        catch(error){message(error.message);button.disabled=false;}
      };card.append(button);
    }list.append(card);
  }
  if(!records.size)list.textContent='No invitations yet.';
}
await connect(async(user)=>{
  desk.hidden=true;panel.hidden=true;invitation=null;document.querySelector('#invites').replaceChildren();
  if(!user)return;
  if(!user.emailVerified){message('Verify your administrator email before continuing.');return;}
  try{await refresh();if(auth.currentUser?.uid===user.uid){desk.hidden=false;message('Owner access verified.');}}
  catch{message('Access denied. Sign in with your authorized God account.');}
});
document.querySelector('#refresh').onclick=()=>refresh().catch(error=>message(error.message));
document.querySelector('#invite-form').onsubmit=async(event)=>{
  event.preventDefault();const button=document.querySelector('#create');button.disabled=true;
  const data=Object.fromEntries(new FormData(event.target));
  for(const key of Object.keys(data))data[key]=data[key].trim();
  data.email=data.email.toLowerCase();message('Creating invitation…');panel.hidden=true;
  try{
    const {data:result}=await call('createSalesInvite',data);
    // The secret stays in the URL fragment, not in HTTP request paths/referrers.
    const url=new URL('../join/',location.href);url.hash=new URLSearchParams({invite:result.inviteCode}).toString();
    const text=`Hi ${data.fullName}, I’m inviting you to join the What’s Out sales team. Open this link, sign in or create an account using ${data.email}, verify your email, and accept within seven days.\n\n${url.href}\n\nEddy Davila · Bitter Softworks`;
    const inner=document.createElement('canvas');QrCreator.render({text:url.href,size:540,radius:0,ecLevel:'M',fill:'#050718',background:'#fff'},inner);
    const canvas=document.createElement('canvas');canvas.width=canvas.height=660;
    const ctx=canvas.getContext('2d');ctx.fillStyle='white';ctx.fillRect(0,0,660,660);ctx.drawImage(inner,60,60);
    const holder=document.querySelector('#invite-qr');holder.replaceChildren(canvas);
    const blob=await new Promise(resolve=>canvas.toBlob(resolve,'image/png'));
    invitation={id:result.inviteCode.split('.')[0],url:url.href,text,file:new File([blob],'whatsout-agent-invitation.png',{type:'image/png'})};
    document.querySelector('#share-title').textContent=`Invitation for ${data.fullName}`;
    document.querySelector('#expires').textContent=`Expires ${new Date(result.expiresAt).toLocaleString()}`;
    document.querySelector('#email-share').href=`mailto:${encodeURIComponent(data.email)}?subject=${encodeURIComponent('Your What’s Out sales invitation')}&body=${encodeURIComponent(text)}`;
    document.querySelector('#sms-share').href=`sms:${data.phone.replace(/[^+0-9]/g,'')}?body=${encodeURIComponent(text)}`;
    document.querySelector('#download').href=canvas.toDataURL('image/png');panel.hidden=false;
    message('Invitation created. Share it now; this private link is shown only in this session.');
    await refresh();panel.scrollIntoView({behavior:'smooth',block:'start'});
  }catch(error){message(error.message||'Could not create the invitation.');}
  finally{button.disabled=false;}
};
document.querySelector('#copy').onclick=async()=>{if(invitation){await navigator.clipboard.writeText(invitation.url);message('Invitation link copied.');}};
document.querySelector('#share').onclick=async()=>{
  if(!invitation)return;
  try{
    if(navigator.canShare?.({files:[invitation.file]}))await navigator.share({title:'What’s Out invitation',text:invitation.text,files:[invitation.file]});
    else if(navigator.share)await navigator.share({title:'What’s Out invitation',text:invitation.text});
    else{await navigator.clipboard.writeText(invitation.text);message('Invitation copied. Paste it into email or messages, or download the QR.');}
  }catch(error){if(error.name!=='AbortError')message('Sharing was unavailable. Use Email link, Text link, or Download QR.');}
};
