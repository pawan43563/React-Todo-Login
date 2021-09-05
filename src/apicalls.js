

const apicall=async ({url:url,obj={}})=>{
    try{
        let response=await fetch(url,obj)
        let data=await response.json()
        return await data
    }catch(error){
        console.log("Error",error);
    }
}

export default apicall;