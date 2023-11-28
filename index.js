"use strict"

let url = "http://localhost:3000/movies";

// let innerHTML = "";
let div = document.getElementById("movieList");
let showAllBtn = document.getElementById("showAll");
showAllBtn.addEventListener("click", () => showAll(url));
let showDetailBtn = document.getElementById("showDetail");
showDetailBtn.addEventListener("click", () => showDetail());

async function showAll(url){
    try {
        div.innerHTML = "";
        let response = await fetch(url);
        if (!response.ok) throw new Error(response.message);
        let data = await response.json();
        data.forEach(d => {
            // div.innerHTML += `<p id="${d.id}">${d.title}</p>`
            let link = document.createElement("p");
            link.id = d.id;
            link.textContent = d.title;
            link.addEventListener("click", () => showDetail(link.id));
            div.appendChild(link);
        })
        console.log(data);
    } catch (error) {
        console.error(error.message);
    }
}

async function showDetail(id) {
    try {
        // let id = parseInt(prompt("Id de la pelicula", "1"));
        div.innerHTML = "";
        let response = await fetch(url + `/${id}`);
        if (!response.ok) throw new Error(response.message);
        let data = await response.json();
        let actors = await Promise.all(data.actors.map(a => getActor(a)));
        let actorsHTML = "<h3>Actores:</h3>";
        actors.forEach(a => {
            // actorsHTML += `<p id="${a.id}">${a.name}</p>`
            let actorLink = document.createElement("p");
            actorLink.id = a.id;
            actorLink.textContent = a.name;
            actorLink.addEventListener("click", () => showActorDetail(actorLink.id));
            div.appendChild(actorLink);
        })
        div.innerHTML += `<h1>${data.title}</h1><p>Año: ${data.year}</p><p>Año: ${data.runtime}</p>` + actorsHTML;
    } catch (error) {
        console.error(error);
    }
}

async function getActor(id) {
    try {
        let response = await fetch(`http://localhost:3000/actors/${id}`);
        if (!response.ok) throw new Error(response.message);
        return await response.json();
    } catch (error) {
        console.error(error);
    }
}

async function showActorDetail(id) {
    console.log(id);
}



