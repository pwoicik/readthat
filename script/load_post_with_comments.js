function getPost(id) {
    return fetch(`../php/get_posts.php?id=${id}`);
}

function getComments(postID, start) {
    if (typeof start !== "undefined") {
        return fetch(`../php/get_comments.php?post_id=${postID}&start=${start}`);
    }
    return fetch(`../php/get_comments.php?post_id=${postID}`);
}

function createPostEl({ id, timestamp, headline, content }) {
    const post_el = document.createElement("article");
    post_el.classList.add("post", "background-grey");
    post_el.setAttribute("data-post-id", id);

    const header_el = document.createElement("header");
    post_el.appendChild(header_el);

    const timestamp_el = document.createElement("p");
    timestamp_el.classList.add("timestamp");
    timestamp_el.innerText = "Posted on " + new Date(timestamp + ":00").toLocaleString();
    header_el.appendChild(timestamp_el);

    const headline_el = document.createElement("h1");
    headline_el.innerText = headline;
    header_el.appendChild(headline_el);

    const content_el = document.createElement("p");
    content_el.classList.add("post-content");
    content_el.innerText = content;
    post_el.appendChild(content_el);

    return post_el;
}

function createCommentFormEl() {
    const form_el = document.createElement("form");
    form_el.classList.add("bordered");
    form_el.id = "create-comment-box";

    const inputDiv_el = document.createElement("div");
    inputDiv_el.id = "comment-input";
    inputDiv_el.classList.add("custom-input");
    form_el.appendChild(inputDiv_el);

    const placeholder_el = document.createElement("span");
    placeholder_el.classList.add("placeholder");
    placeholder_el.id = "comment-placeholder";
    placeholder_el.innerText = "Write your comment here";
    inputDiv_el.appendChild(placeholder_el);

    const textbox_el = document.createElement("span");
    textbox_el.classList.add("editable");
    textbox_el.id = "comment-content";
    textbox_el.role = "textbox";
    textbox_el.contentEditable = true;
    textbox_el.oninput = () => {
        placeholder_el.style.display = textbox_el.innerText.length == 0 ? "inline" : "none";
    };

    inputDiv_el.appendChild(textbox_el);

    const bottomDiv_el = document.createElement("div");
    bottomDiv_el.id = "bottom-form-bar";
    form_el.appendChild(bottomDiv_el);

    const sendButton_el = document.createElement("button");
    sendButton_el.id = "send-button";
    sendButton_el.classList.add("submit-button");
    sendButton_el.innerText = "Comment";
    bottomDiv_el.appendChild(sendButton_el);

    form_el.onsubmit = createComment;

    return form_el;
}

function createCommentEl({ id, timestamp, content }) {
    const comment_el = document.createElement("article");
    comment_el.classList.add("comment");
    comment_el.setAttribute("data-comment-id", id);

    const timestamp_el = document.createElement("p");
    timestamp_el.classList.add("timestamp");
    timestamp_el.innerText = new Date(timestamp + ":00").toLocaleString();
    comment_el.appendChild(timestamp_el);

    const content_el = document.createElement("p");
    content_el.classList.add("comment-content");
    content_el.innerText = content;
    comment_el.appendChild(content_el);

    return comment_el;
}

function appendCommentsToPost(post_el, comments) {
    const form_el = createCommentFormEl();
    post_el.appendChild(form_el);

    const separator_el = document.createElement("div");
    separator_el.classList.add("separator");
    post_el.appendChild(separator_el);

    commentsSection_el = document.createElement("section");
    commentsSection_el.id = "comments-section";
    post_el.appendChild(commentsSection_el);

    for (const comment of comments) {
        const comment_el = createCommentEl(comment);
        commentsSection_el.appendChild(comment_el);
    }
}

function showPostWithComments(post, comments) {
    const post_el = createPostEl(post);
    appendCommentsToPost(post_el, comments);
    mainSection.appendChild(post_el);
}

async function loadPostWithComments() {
    isLoading = true;

    const postID = getPostID();
    const post = await getPost(postID).then(data => data.json());
    const comments = await getComments(postID).then(data => data.json());

    showPostWithComments(post, comments);
    isLoading = false;
    return comments.length;
}

loadPostWithComments();

function showComments(comments) {
    for (const comment of comments) {
        const comment_el = createCommentEl(comment);
        commentsSection_el.appendChild(comment_el);
    }
}

async function loadComments(start) {
    isLoading = true;

    const postID = getPostID();
    const comments = await getComments(postID, start).then(data => data.json());

    if (comments.length) {
        showComments(comments);
    }

    isLoading = false;
    return comments.length;
}
