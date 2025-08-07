import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';

export const firebaseConfig = {
    apiKey: 'AIzaSyAran2bK8dDbj5oClz_5k4-JdUa9j-E5q8',
    authDomain: 'cv-landing-primeng.firebaseapp.com',
    projectId: 'cv-landing-primeng',
    storageBucket: 'cv-landing-primeng.firebasestorage.app',
    messagingSenderId: '142411574106',
    appId: '1:142411574106:web:bf135a6ec76072e6d3a163',
    measurementId: 'G-HBJ2QDFSPQ',
};

export const app = initializeApp(firebaseConfig);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const analytics = getAnalytics(app);
