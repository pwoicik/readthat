async function scrollHandler() {
    if (isLoading) return;

    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 5) {
        const lastPostID = getLastPostID();
        const loadedPostsCount = await loadPosts(lastPostID - 1);
        if (loadedPostsCount < 10) {
            window.removeEventListener("scroll", scrollHandler, { passive: true });
        }
    }
}

window.addEventListener("scroll", scrollHandler, { passive: true });
