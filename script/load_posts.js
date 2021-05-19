let isLoading = true;

function createPostEl({ id, timestamp, headline, content }) {
    const post_el = document.createElement("a");
    post_el.setAttribute("href", "post?id=" + id);
    post_el.setAttribute("data-post-id", id);
    post_el.classList.add("post", "bordered", "framed");

    const timestamp_el = document.createElement("span");
    timestamp_el.classList.add("timestamp");
    timestamp_el.innerText = new Date(timestamp).toLocaleString();

    const headline_el = document.createElement("header");
    headline_el.innerText = headline;

    const content_el = document.createElement("p");
    if (content.length > 600) {
        content_el.innerText = content.substring(0, 600);
        post_el.classList.add("overflowing-post");
    } else {
        content_el.innerText = content;
    }

    post_el.appendChild(timestamp_el);
    post_el.appendChild(headline_el);
    post_el.appendChild(content_el);

    return post_el;
}

function getPosts(start) {
    return start ?
        fetch(`./php/get_posts.php?start=${start}`).then(data => data.json()) :
        fetch("./php/get_posts.php").then(data => data.json());
}

function showPosts(posts) {
    for (const post of posts) {
        const post_el = createPostEl(post);
        postBoard.appendChild(post_el);
    }
}

async function loadPosts(start) {
    isLoading = true;
    const posts = await getPosts(start);

    showPosts(posts);
    isLoading = false;
    return posts.length;
}

loadPosts();
