async function fetchHtmlAsText(url){
    return await (await fetch(url)).text();
}
async function importPage(target,file){
    target.innerHTML = await fetchHtmlAsText(file);
}

// const room = document.querySelector("article#room");
// importPage(room,"room.html");
// article#room에 room.html을 import

const Project = document.querySelector("section#Project");
importPage(Project,"projectForm.html");
// section#Project에 projectForm.html을 import