// Add this at the top of your file

//component to export

interface HelloWorldResponse{
    time: string;
}


const HelloWorld = async () => {

    const response = await fetch("http://127.0.0.1:8000/api/time/", {next : {revalidate: 1}})
    const j: HelloWorldResponse = await response.json();
    

    
    return (
        <div>
            <h1>Home</h1>
            <p>{j.time}</p>
        </div>
    );
};

export default HelloWorld;