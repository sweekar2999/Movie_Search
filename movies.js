let inp = document.querySelector("input");
let btn = document.querySelector("button");
let list = document.querySelector("#list");
let searchValue = '';

btn.addEventListener("click", async () => {
    searchValue = inp.value;
    let dat = await fetchData();
    show(dat);
});

async function fetchData() {
    try {
        let res = await axios.get(`https://api.tvmaze.com/search/shows?q=${searchValue}`);
        console.log(res.data);
        return res.data;
    } catch (err) {
        console.error(err);
        return [];
    }
}

// function show(data) {
//     list.innerText = "";
//     for (let d of data) {
//         let fig = document.createElement("figure");
//         if (d.show.image && d.show.image.medium) {
//             fig.innerHTML = `
//                 <img src=${d.show.image.medium} alt="Show Image"/>
//                 <h2>Name: ${d.show.name}</h2>
//                 <h5>Language: ${d.show.language}</h5>
//             `;
//         } else {
//             fig.innerHTML = `
//                 <img src="https://via.placeholder.com/210x295" alt="No Image Available"/>
//                 <h2>Name: ${d.show.name}</h2>
//                 <h5>Language: ${d.show.language}</h5>
//             `;
//         }
//         list.appendChild(fig);
//     }
// }
function show(data) {
    list.innerText = "";
    for (let d of data) {
        let fig = document.createElement("figure");

        let img = document.createElement("img");
        if (d.show.image && d.show.image.medium) {
            img.setAttribute("src", d.show.image.medium);
            img.setAttribute("alt", "Show Image");
        } else {
            img.setAttribute("src", "https://via.placeholder.com/210x295");
            img.setAttribute("alt", "No Image Available");
        }
        fig.appendChild(img);

        let h2 = document.createElement("h2");
        h2.textContent = `Name: ${d.show.name}`;
        fig.appendChild(h2);

        let h5 = document.createElement("h5");
        h5.textContent = `Language: ${d.show.language}`;
        fig.appendChild(h5);

        list.appendChild(fig);
    }
}
/* we use innerHTML when we just want to display entire content  and dont want to modify
contionously*/
