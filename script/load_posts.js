let isLoading = true;

function getPosts(start) {
    if (start) {
        return fetch(`./php/get_posts.php?start=${start}`).then(data => data.json());
    }
    return fetch("./php/get_posts.php").then(data => data.json());
}

function createPostEl({ id, timestamp, headline, content, comment_count }) {
    const post_el = document.createElement("article");
    post_el.classList.add("post", "bordered", "framed");
    post_el.setAttribute("data-post-id", id);

    const post_link_el = document.createElement("a");
    post_link_el.setAttribute("href", "post?id=" + id);
    post_el.appendChild(post_link_el);

    const header_el = document.createElement("header");
    post_link_el.appendChild(header_el);
    
    const timestamp_el = document.createElement("p");
    timestamp_el.classList.add("timestamp");
    timestamp_el.innerText = new Date(timestamp).toLocaleString();
    header_el.appendChild(timestamp_el);

    const headline_el = document.createElement("h1");
    headline_el.innerText = headline;
    header_el.appendChild(headline_el);

    const content_el = document.createElement("p");
    content_el.classList.add("post-content");
    if (content.length > 600) {
        content_el.innerText = content.substring(0, 599) + "…";
        post_el.classList.add("overflowing-post");
    } else {
        content_el.innerText = content;
    }
    post_link_el.appendChild(content_el);

    const commentCount_el = document.createElement("p");
    commentCount_el.classList.add("comment-count");
    commentCount_el.innerText = comment_count + " comments";
    post_link_el.appendChild(commentCount_el);

    return post_el;
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
