let submitbtn = document.getElementById('submit');
let userName  = document.getElementById('username');
let profileInfodiv = document.getElementsByClassName('profileInfo')[0];
let repos = document.getElementsByClassName('repos')[0];
let selectordiv =document.getElementsByClassName('selector')[0];
let selectsortValue = 'default';
let repodata = '';
let sortedrepos ='';
let footer = document.getElementsByClassName("footer")[0];



submitbtn.addEventListener('click',getDetails);



async function getDetails(){
    let res = await fetch(`https://api.github.com/users/${userName.value}`);
    let data = await res.json();
    let repos = await fetch(`https://api.github.com/users/${userName.value}/repos`);
    repodata = await repos.json();
    // console.log(repodata);

    if (res.status==404){
        profileInfodiv.innerHTML = 'There is no such profile';
    }
    else{
        profileInfodiv.innerHTML = '';
        selectordiv.innerHTML = '';
        updateProfile(data);
        showrepo(repodata);
    }
    
    

}

function updateProfile(data){
    profileInfodiv.innerHTML += `
    <img src=${data.avatar_url} alt=${userName}>
    <h1>${data.name}</h1>
    <h3>${data.login}</h3>
    <p>${data.bio}</p>
    <p>Followers ${data.followers}  following ${data.following}</p>
    <button class="submitbtn"><a href="${data.hml_url}" target="_blank">Go to Profile</a></button>
    `
    
    selectordiv.innerHTML +=`
    <h1 id="selectTitle">Top Repos by</h1>
    <select name="select" id="selectsort" onchange="getsort()">
    <option value="Defalut">Default</option>
    <option value="forks">Forks</option>
    <option value="size">Size</option>
    </select>
    `
    repos.innerHTML = '';
}

function getsort(){
    selectsortValue = document.getElementById('selectsort').value;
    console.log(selectsortValue);
    if (selectsortValue == 'forks'){
        sortedrepos=repodata.sort((a,b)=>a.forks-b.forks);
        showrepo(sortedrepos);
        console.log(sortedrepos);
    }
    else if(selectsortValue=='size'){
        sortedrepos = repodata.sort((a,b)=>a.size-b.size);
        showrepo(sortedrepos);
        console.log(sortedrepos)
    }
    else{
        showrepo(repodata);
    }
}


function showrepo(repodata){
    repos.innerHTML = '';

    for(let i =0;i<repodata.length;i++){

    
    repos.innerHTML += `
    <div class = "repodata">
    <h1 class="reponame"> <img class="bookicon" src="./photos/book.png" alt="book"> ${repodata[i].name}</h1>
    <p class="repodesc">${repodata[i].description}<p/>
    <div class="sorting flex">
    <p>${repodata[i].language}</p>
    <p> <img class="forksicon" src="./photos/forks.png" alt="book">${repodata[i].forks}</p>
    <p>${repodata[i].size} KB</p>
    </div>
    <button class="submitbtn"><a href="${repodata[i].html_url}" target="_blank">Go to Project</a></button>
    </div>
    `
    }

    
}