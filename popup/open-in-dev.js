function listenForClicks() {
    document.addEventListener("click", (e) => {
        redirect();
    });
}

function redirect() {
    function setCurrentChoice(result) {
        browser.tabs.query({currentWindow: true, active: true}).then((tabs) => {
            const tab = tabs[0];
            const currentUrl = tab.url;

            const redirectUrl = currentUrl.replace(result.liveBaseUrl, result.devBaseUrl);

            browser.tabs.create({url: redirectUrl});
        }, console.error);
    }

    function onError(error) {
        console.log(`Error: ${error}`);
    }

    let getting = browser.storage.sync.get(["liveBaseUrl", "devBaseUrl"]);
    getting.then(setCurrentChoice, onError);
}

listenForClicks();