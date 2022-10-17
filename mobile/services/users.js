

const createUser = async (name, wallet, role, uid, jwt) => {

    const body = JSON.stringify({
        name,
        wallet,
        roles:[role]
    });

    console.log("Sending this body: ",body);
    const url = 'https://fiuber-api-usuarios-node.herokuapp.com/users/'+uid;
    const bearer = 'Bearer '+jwt;
    try {
        const response = await fetch(url,
        {
            method:'POST',
            body:body,
            headers: {
                'Authorization': bearer,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
        });
        const json = await response.json();
        return json;
    } catch (err) {
      console.error(err);
      alert("error",err.message);
    }
  };

const getUser = async (uid, jwt) => {

    const url = 'https://fiuber-api-usuarios-node.herokuapp.com/users/'+uid;
    const bearer = 'Bearer '+jwt;
    try {
        const response = await fetch(url,
        {
            method:'GET',
            headers: {
                'Authorization': bearer,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
        });
        const json = await response.json();
        return json;
    } catch (err) {
      console.error(err);
      alert("error",err.message);
    }

};

export {createUser, getUser}