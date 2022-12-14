
const getSuggestions = async (q) => {
    const url = 'https://api.api-ninjas.com/v1/cars?limit=1&model='+q;
    console.log(url)
    const response = await fetch(url,
        {
            method:'GET',
            headers: {
                'X-Api-Key': 'k+CLWyVWWTGhBS2tuAWRJA==zVHA9y8qREW9HiEK',
                'Content-Type': 'application/json',
              },
        });
    const json = await response.json();
    console.log("Cars suggestions ", json)
    return json;
    

};

export {getSuggestions}