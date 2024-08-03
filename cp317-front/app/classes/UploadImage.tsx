//import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
//import { storage } from './firebaseConfig'; // Adjust the path to your firebaseConfig file

export default class UploadImage{
    private file:File;

    constructor(file:File){
        this.file = file;
    }

}