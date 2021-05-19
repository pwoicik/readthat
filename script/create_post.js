const postIDs = [
    "create-post-button",
    "create-post-cancel-button",
    "create-post-post-button",
    "create-post-content",
    "create-post-box"
];

const content = document.getElementById("create-post-content");
const action_buttons = document.getElementById("create-post-action-buttons");
const trigger_button = document.getElementById("create-post-button");
trigger_button.onclick = () => {
    trigger_button.placeholder = "Headline";
    content.style.display = "block";
    action_buttons.style.display = "block";
};

document.onclick = (ev) => {
    if (!postIDs.includes(ev.target.id)) {
        trigger_button.placeholder = "Create post";
        content.style.display = "none";
        action_buttons.style.display = "none";
    }
};
