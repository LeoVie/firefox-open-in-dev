function saveOptions(e) {
    e.preventDefault();
    browser.storage.sync.set({
        liveBaseUrl: document.querySelector("#live-base-url").value,
        devBaseUrl: document.querySelector("#dev-base-url").value
    });
}

function restoreOptions() {
    function setCurrentChoice(result) {
        document.querySelector("#live-base-url").value = result.liveBaseUrl || "";
        document.querySelector("#dev-base-url").value = result.devBaseUrl || "";
    }

    function onError(error) {
        console.log(`Error: ${error}`);
    }

    let getting = browser.storage.sync.get(["liveBaseUrl", "devBaseUrl"]);
    getting.then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);