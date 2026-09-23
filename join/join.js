import {auth,call,message,connect} from '../web-account.js';
import {createUserWithEmailAndPassword,sendEmailVerification,reload,getIdToken} from 'https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js';
const input=document.querySelector('#invite-code');
const incoming=new URLSearchParams(location.hash.slice(1)).get('invite');
if(incoming&&incoming.length<=300)sessionStorage.setItem('whatsout-invitation',incoming);
input.value=sessionStorage.getItem('whatsout-invitation')||'';
if(location.hash)history.replaceState(null,'',location.pathname);
function render(user){
  document.querySelector('#signup').hidden=!!user;
  document.querySelector('#verify').hidden=!user||user.emailVerified;
  document.querySelector('#accept').hidden=!user||!user.emailVerified;
  document.querySelector('#ready').hidden=true;
  if(user)document.querySelector('#identity').textContent=user.email;
}
await connect(render);
document.querySelector('#signup-form').onsubmit=async(event)=>{
  event.preventDefault();const button=document.querySelector('#register');button.disabled=true;
  const data=Object.fromEntries(new FormData(event.target));
  let profileReady=false;
  message('Creating your account…');
  try{
    const result=await createUserWithEmailAndPassword(auth,data.email.trim(),data.password);
    await call('completeSignupProfile',{nickName:data.nickName.trim()});
    profileReady=true;
    await sendEmailVerification(result.user);event.target.reset();
    message('Account created. Check your email, verify it, then return and select “I verified my email”.');
  }catch(error){message(error.code==='auth/email-already-in-use'?'This email already has an account. Sign in above or reset your password.':(error.message||'Account setup could not finish.'));
    if(auth.currentUser&&!profileReady){document.querySelector('#signup').hidden=false;document.querySelector('#register').textContent='Finish profile setup';}
    if(profileReady)message('Account created. Use “Send verification email” below to request your verification link.');
  }finally{button.disabled=false;}
};
// Recover a partial signup without trying to create the same Auth account again.
document.querySelector('#register').addEventListener('click',async(event)=>{
  if(!auth.currentUser)return;
  event.preventDefault();
  const nick=document.querySelector('[name="nickName"]').value.trim();
  if(!nick){message('Enter your nickname to finish setup.');return;}
  try{await call('completeSignupProfile',{nickName:nick});await sendEmailVerification(auth.currentUser);document.querySelector('#signup').hidden=true;message('Profile ready. Check your verification email.');}
  catch(error){message(error.message);}
});
document.querySelector('#resend').onclick=async()=>{
  try{await sendEmailVerification(auth.currentUser);message('Verification email sent.');}
  catch(error){message(error.message||'Unable to send verification email.');}
};
document.querySelector('#check').onclick=async()=>{
  try{await reload(auth.currentUser);await getIdToken(auth.currentUser,true);render(auth.currentUser);message(auth.currentUser.emailVerified?'Email verified. You can accept your invitation.':'Email is not verified yet. Check the inbox link first.');}
  catch(error){message(error.message);}
};
document.querySelector('#activate').onclick=async()=>{
  const button=document.querySelector('#activate');button.disabled=true;message('Checking your invitation…');
  try{
    await getIdToken(auth.currentUser,true);
    await call('claimSalesInvite',{inviteCode:input.value.trim()});
    sessionStorage.removeItem('whatsout-invitation');input.value='';
    document.querySelector('#accept').hidden=true;document.querySelector('#ready').hidden=false;
    message('Welcome to the What’s Out sales team. Your personal BizCard is ready to generate.');
  }catch(error){message(error.message||'The invitation could not be accepted.');
    if((error.message||'').includes('Complete your user profile')){document.querySelector('#signup').hidden=false;document.querySelector('#register').textContent='Finish profile setup';}
  }
  finally{button.disabled=false;}
};
