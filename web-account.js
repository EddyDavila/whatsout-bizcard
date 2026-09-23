import {initializeApp} from 'https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js';
import {getAuth,setPersistence,browserSessionPersistence,signInWithEmailAndPassword,signOut,onAuthStateChanged,sendPasswordResetEmail} from 'https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js';
import {getFunctions,httpsCallable} from 'https://www.gstatic.com/firebasejs/11.10.0/firebase-functions.js';
import {getFirestore} from 'https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js';
const app=initializeApp({apiKey:'AIzaSyCZMzP5MbhN4S5XqETm6C08kR7vXV6JZ7U',authDomain:'whatsout-fcc29.firebaseapp.com',projectId:'whatsout-fcc29',appId:'1:208246724865:web:b1e51a58667cac884de300'});
export const auth=getAuth(app);
export const db=getFirestore(app);
export const call=(name,data={}) => httpsCallable(getFunctions(app,'us-central1'),name)(data);
export const message=(text) => {document.querySelector('#status').textContent=text;};
export async function connect(onUser) {
  await setPersistence(auth,browserSessionPersistence);
  document.querySelector('#login').addEventListener('submit',async(event)=>{
    event.preventDefault(); message('Signing in…');
    try {await signInWithEmailAndPassword(auth,document.querySelector('#email').value.trim(),document.querySelector('#password').value);document.querySelector('#password').value='';}
    catch {message('Unable to sign in. Check your email and password.');}
  });
  document.querySelector('#logout').addEventListener('click',()=>signOut(auth));
  document.querySelector('#reset').addEventListener('click',async()=>{
    const email=document.querySelector('#email').value.trim();
    if(!email){message('Enter your email first.');return;}
    try {await sendPasswordResetEmail(auth,email);message('Password reset requested. Check your inbox.');}
    catch {message('Unable to request a reset. Check your email and try again.');}
  });
  onAuthStateChanged(auth,async(user)=>{
    document.querySelector('#login').hidden=!!user;
    document.querySelector('#logout').hidden=!user;
    message('');
    await onUser(user);
  });
}
