const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const sdk={
  'firebase-app-check.js':'export const initializeAppCheck=()=>({}); export class ReCaptchaEnterpriseProvider {}',
  'firebase-app.js':'export const initializeApp=()=>({});',
  'firebase-auth.js':`const a={currentUser:window.testUser}; export const getAuth=()=>a; export const browserSessionPersistence={}; export const setPersistence=async()=>{}; export const onAuthStateChanged=(_,cb)=>{window.authCallback=cb;cb(a.currentUser);}; export const signOut=async()=>{a.currentUser=null;window.authCallback(null);}; export const signInWithEmailAndPassword=async()=>{}; export const sendPasswordResetEmail=async()=>{}; export const createUserWithEmailAndPassword=async()=>({user:a.currentUser}); export const sendEmailVerification=async()=>{}; export const reload=async()=>{}; export const getIdToken=async()=>'';`,
  'firebase-firestore.js':`export const getFirestore=()=>({});export const collection=()=>({});export const query=()=>({});export const orderBy=()=>({});export const limit=()=>({});export const getDocs=async()=>{if(window.testUser?.email!=='owner@example.com')throw Error('permission-denied');return {docs:[],size:0};};`,
  'firebase-functions.js':`export const getFunctions=()=>({});export const httpsCallable=(_,name)=>async(data)=>{window.calls.push({name,data});if(name==='createSalesInvite')return {data:{inviteCode:'dummy-id.dummy-token',expiresAt:Date.now()+604800000}};if(name==='claimSalesInvite')return {data:{status:'active'}};return {data:{}};};`,
};
(async()=>{
  const browser=await chromium.launch({headless:true,executablePath:'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'});
  async function pageFor(email){
    const page=await browser.newPage({viewport:{width:390,height:844}});
    await page.addInitScript((email)=>{window.testUser=email?{uid:'test',email,emailVerified:true}:null;window.calls=[];},email);
    await page.route('https://www.gstatic.com/firebasejs/**',route=>route.fulfill({contentType:'application/javascript',body:sdk[new URL(route.request().url()).pathname.split('/').pop()]}));
    return page;
  }
  const denied=await pageFor('agent@example.com');await denied.goto('http://127.0.0.1:4173/owner/');
  await denied.getByText('Access denied.',{exact:false}).waitFor();assert.equal(await denied.locator('#desk').isVisible(),false);
  const owner=await pageFor('owner@example.com');await owner.goto('http://127.0.0.1:4173/owner/');await owner.locator('#desk').waitFor();
  for(const [name,value]of Object.entries({fullName:'Test Agent',email:'agent@example.com',phone:'+12015550123',territory:'North Bergen'}))await owner.locator(`[name="${name}"]`).fill(value);
  await owner.locator('#create').click();await owner.locator('#share-panel').waitFor();
  const mail=await owner.locator('#email-share').getAttribute('href');assert(mail.includes('mailto:agent%40example.com'));assert(decodeURIComponent(mail).includes('/join/#invite='));
  assert.equal((await owner.evaluate(()=>window.calls))[0].name,'createSalesInvite');
  await owner.screenshot({path:'artifacts/owner-invitation-mobile.png',fullPage:true});
  assert.equal(await owner.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  const agent=await pageFor('agent@example.com');await agent.goto('http://127.0.0.1:4173/join/#invite=dummy-id.dummy-token');await agent.locator('#accept').waitFor();
  assert.equal(await agent.locator('#invite-code').inputValue(),'dummy-id.dummy-token');assert(!agent.url().includes('#'));
  await agent.locator('#activate').click();await agent.locator('#ready').waitFor();
  const calls=await agent.evaluate(()=>window.calls);assert.equal(calls[0].name,'claimSalesInvite');assert.equal(calls[0].data.inviteCode,'dummy-id.dummy-token');
  await agent.screenshot({path:'artifacts/agent-accept-mobile.png',fullPage:true});
  console.log('PASS denied non-owner, owner form and private QR sharing, fragment handling, and agent acceptance (mock backend; no accounts or invitations created).');
  await browser.close();
})().catch(error=>{console.error(error);process.exit(1);});
