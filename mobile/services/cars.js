
const getSuggestions = async (q) => {
    const url = 'https://api.api-ninjas.com/v1/cars?limit=10&model='+q;
    console.log(url)
    try{
        const response = await fetch(url,
            {
                method:'GET',
                headers: {
                    'X-Api-Key': 'k+CLWyVWWTGhBS2tuAWRJA==zVHA9y8qREW9HiEK',
                    'Content-Type': 'application/json',
                  },
            });
            const json = await response.json();
            console.log("jsonnn ", json)
            return json;
    }catch(err) {
        console.error(err);
        alert("error",err.message);
      }
    

};

export {getSuggestions}