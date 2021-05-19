const board = document.getElementById("posts");

function showPosts(posts) {
    for (const post of posts) {
        const sec = document.createElement("section");
        sec.setAttribute("data-post-id", post["id"]);
        sec.classList.add("post", "bordered", "frame");
        sec.onclick = () => {
            window.location.assign("post?id=" + post["id"]);
        };
        const header = document.createElement("header");
        header.innerText = post["headline"];
        const p = document.createElement("p");
        p.innerText = post["content"];
        sec.appendChild(header);
        sec.appendChild(p);
        board.appendChild(sec);
    }
}

fetch("./php/get_posts.php").then(data => data.json()).then(showPosts);
