const endpoint = 'https://api-football-beta.p.rapidapi.com/coachs?';
const client_id= 'a501e56a8c7f9f3';
const client_secret= '6f7c3a1c722ee494e3a77b0169c1a08f8e5ce563';
const richiesta_token= 'https://api.imgur.com/oauth2/authorize';
const a ='https://api.imgur.com/3/account/KDBr17/images/0'; 


/* cercare zanetti,zidane,henry,ronaldo,cannavaro, cristiano ronaldo*/



let token;
let refresh_token="4dcce83a8b871bf5a683b7ea8dde0bafcf7e5db7";


function cerca(event)
{
    
    event.preventDefault();
    const val = document.querySelector('#content');
    const sel = document.querySelector('#tipo');
    if(sel.value==='Allenatore')
    {
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'a7a2dedebbmsha5990aa1e6a40b9p118055jsn2d59e092555b',
                'X-RapidAPI-Host': 'api-football-beta.p.rapidapi.com'
            }
        };
    
        const url = endpoint+'search='+encodeURIComponent(val.value);
        
        fetch(url, options)
            .then(onResponse)
            .then(onJson);

    }

    else
    {
    
    const formdata = new FormData();
    formdata.append('refresh_token', refresh_token);
    formdata.append('client_id', client_id);
    formdata.append('client_secret', client_secret);
    formdata.append('grant_type', 'refresh_token');

    fetch('https://api.imgur.com/oauth2/token', {
    method: 'POST',
    body: formdata
    }).then(onResponse).then(onJsonT);
    //Tramite questa fetch genero di volta in volta un token di accesso differente


}

}


function onJsonDato(json)
{
    console.log(json);
    const cont = document.querySelector('#content');
    let input= cont.value.toLowerCase();
    console.log(input);
    if(array.length!=0)
    {
        elimina();
        array=[];
    }

    const head = document.querySelector('header');
    
    for(let i = 0; i<json.data.length; i++)
    {
        if(json.data[i].name===input)
        {
            const img = document.createElement('img');
            img.classList.add('calciatore');
            img.src=json.data[i].link;
            const sec = document.querySelector('#risultato');
            const art = document.createElement('article');
            art.appendChild(img);
            sec.appendChild(art);
            array.unshift(img);
            break;
        }
    }
}





function onJsonT(json)
{
    console.log(json);
    token= json.access_token;
    addimg();
}

function addimg()
{
    const header = {
        method: 'GET',
        headers: {
            'Authorization': ' Bearer '+token,
        }
    }

    fetch(a, header)
    .then(onResponse)
    .then(onJsonDato);

}



function onResponse(response)
{
    return response.json();
}

function onJson(json)
{
    if(array.length!=0)
    {
        elimina();
        array=[];
    }
    
    console.log(json);
    const img = document.createElement('img');
    img.classList.add('foto');
    img.src=json.response[0].photo;
    const sec = document.querySelector('#risultato');
    const art = document.createElement('article');
    art.appendChild(img);
    const carriera = json.response[0].career;
    

    for(let i = 0; i<carriera.length; i++)
    {
        const logo = document.createElement('img');
        logo.src = carriera[i].team.logo;
        logo.classList.add('stemma')
        const span = document.createElement('span');
        span.classList.add('data');
        const div = document.createElement('div');
        div.classList.add('contenitore');
        span.textContent=carriera[i].start+' -- '+carriera[i].end;
        const span2 = document.createElement('span');
        span2.classList.add('squadra');
        if(carriera[i].end==null)
        {
            span.textContent=carriera[i].start+'   --   ';
            logo.classList.add('first');
        }
          
        div.appendChild(span);
        div.appendChild(logo);
        span2.textContent=carriera[i].team.name;
        div.appendChild(span2);
        art.appendChild(div);
    }

    sec.appendChild(art);
    array.unshift(img);

}

function elimina()
{
    const art = document.querySelector('article');
    art.remove();
}




let array = [];
const form = document.querySelector('form');
form.addEventListener('submit',cerca);
