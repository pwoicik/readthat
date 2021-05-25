const postIDs = [
    "create-post-box",
    "create-post-headline",
    "create-post-content",
    "create-post-action-buttons",
    "create-post-submit-button",
    "create-post-cancel-button",
];

const headlinePlaceholder = "Create post";
const headlineActivePlaceholder = "Headline (max 100 characters)";

function expandForm() {
    headlinePlaceholder_el.innerText = headlineActivePlaceholder;
    contentPlaceholder_el.style.display = "inline";
    contentInput_el.style.display = "block";
    actionButtons_el.style.display = "block";
}

function collapseForm() {
    headlinePlaceholder_el.innerText = headlinePlaceholder;
    headlinePlaceholder_el.style.display = "inline";
    contentInput_el.style.display = "none";
    actionButtons_el.style.display = "none";
}

headline_el.onclick = expandForm;

document.onclick = (ev) => {
    console.log(ev.target.id);
    if (!postIDs.includes(ev.target.id) && !headline_el.innerText && !content_el.innerText) {
        collapseForm();
    }
};

headline_el.oninput = () => {
    headlinePlaceholder_el.style.display = headline_el.innerText.length == 0 ? "inline" : "none";
};

content_el.oninput = () => {
    contentPlaceholder_el.style.display = content_el.innerText.length == 0 ? "inline" : "none";
};

cancelActionButton_el.onclick = () => {
    headline_el.innerText = "";
    content_el.innerText = "";
    collapseForm();
};

function createPost(ev) {
    ev.preventDefault();

    const headline = headline_el.innerText.trim();
    const content = content_el.innerText.trim();

    if (!headline.length || !content.length || headline.length > 100) {
        showInvalidMessageAlert();
        return;
    }

    const postData = new FormData();
    postData.append("headline", headline);
    postData.append("content", content);

    fetch("./php/create_post.php", { method: "POST", body: postData }).then(() => location.reload());
}
