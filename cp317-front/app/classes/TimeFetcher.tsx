// fetches time from api endpoint /api/time

export default class TimeFetcher{
    private apiurl: string;

    constructor(){
        this.apiurl = "http://127.0.0.1:8000/api/time/";
    }



    async fetchTime(): Promise<string>{
        try {
            const response = await fetch(this.apiurl) 
            const data: {time:string} = await response.json();

            console.log(data); // check :3
            return data.time;
        } catch (error){
            console.error("time fucky", error);
            throw error;
        }
    }
}