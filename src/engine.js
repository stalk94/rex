const gurl = "http://localhost:3000/";

export function send(url, data, metod) {
    let response;


    if(metod==="GET"){
        response = fetch(gurl + url, {
            method: "GET",
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            redirect: 'follow', 
            referrerPolicy: 'no-referrer'
        });
    }
    else response = fetch(gurl + url, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      redirect: 'follow', 
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data)
    });

    return response
}

