import { initializeApp } from 'firebase/app';
import { getRemoteConfig } from "firebase/remote-config";

const firebaseConfig = {
    apiKey: "AIzaSyCg9LFnynmoLt1mIn4Bk5GqMXNweIAmIzU",
    authDomain: "mediocre-melodies.firebaseapp.com",
    projectId: "mediocre-melodies",
    storageBucket: "mediocre-melodies.appspot.com",
    messagingSenderId: "562409812690",
    appId: "1:562409812690:web:3eeb3748f36f31de29330b",
    measurementId: "G-PHQRCCTNK1"
};

const app = initializeApp(firebaseConfig);
export const remoteConfig = getRemoteConfig(app);

remoteConfig.settings.minimumFetchIntervalMillis = 3600000;

remoteConfig.defaultConfig = {
    "interestedLink": "https://forms.gle/SsybM4tfgGmvwKhF7",
    "cashRaised": "10,069"
};