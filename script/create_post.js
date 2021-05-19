const postIDs = [
    "create-post-box",
    "create-post-headline",
    "create-post-content",
    "create-post-cancel-button",
    "create-post-post-button",
];

const invalidMessageAlert_el = document.getElementById("invalid-message-alert");
const headline_el = document.getElementById("create-post-headline");
const content_el = document.getElementById("create-post-content");
const action_buttons_el = document.getElementById("create-post-action-buttons");
headline_el.onclick = () => {
    headline_el.placeholder = "Headline";
    content_el.style.display = "block";
    action_buttons_el.style.display = "block";
};

document.onclick = (ev) => {
    if (!headline_el.value && !content_el.value && !postIDs.includes(ev.target.id)) {
        headline_el.placeholder = "Create post";
        content_el.style.display = "none";
        action_buttons_el.style.display = "none";
    }
};

function createPost(ev) {
    ev.preventDefault();

    const headline = headline_el.value.trim();
    const content = content_el.value.trim();

    if (!headline.length || !content.length) {
        invalidMessageAlert_el.classList.add("visible");
        setTimeout(() => {
            if (invalidMessageAlert_el.classList.contains("visible"))
                invalidMessageAlert_el.classList.remove("visible");
        }, 2000);

        return;
    }

    const postData = new FormData();
    postData.append("headline", headline);
    postData.append("content", content);

    fetch("./php/create_post.php", { method: "POST", body: postData }).then(() => location.reload());
}
