// `popup.html` のボタンのクリックを監視
document.addEventListener("DOMContentLoaded", () => {
    const copyButton = document.getElementById("copyTextBtn");
    const aiSelect = document.getElementById("aiSelect");

    if (copyButton) {
        copyButton.addEventListener("click", () => {

            const selectedAI = aiSelect.value;
            chrome.storage.local.set({ selectedAI }, () => {
            });

            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                if (tabs.length === 0) {
                    console.error("Error: アクティブなタブが見つかりません！");
                    return;
                }

                chrome.scripting.executeScript({
                    target: { tabId: tabs[0].id },
                    files: ["content.js"]
                });
            });
        });
    } else {
        console.error("Error: ボタンが見つかりません！");
    }
});
