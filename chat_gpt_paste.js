function waitForElement(selector, timeout = 5000) {
    return new Promise((resolve, reject) => {
        const intervalTime = 100;
        const maxAttempts = timeout / intervalTime;
        let attempts = 0;

        const interval = setInterval(() => {
            const element = document.querySelector(selector);
            if (element) {
                clearInterval(interval);
                resolve(element);
            } else if (++attempts > maxAttempts) {
                clearInterval(interval);
                reject(new Error(`⏰ タイムアウト: ${selector} が見つかりませんでした`));
            }
        }, intervalTime);
    });
}

chrome.storage.local.get("copiedText", async (data) => {
    if (data.copiedText) {
        try {
            const textarea = document.querySelector("#prompt-textarea > p");
            const textareaWrapper = await waitForElement(
                "#composer-background textarea"
            );

            if (textarea && textareaWrapper) {
                textarea.focus();
                textarea.innerHTML = "以下の英文を日本語要約してください。<br><br>" + data.copiedText.replace(/\n/g, "<br>");
                textareaWrapper.focus();
                textareaWrapper.value = "以下の英文を日本語要約してください。\n\n" + data.copiedText;

                textareaWrapper.dispatchEvent(new Event("input", { bubbles: true }));
                textareaWrapper.dispatchEvent(new Event("change", { bubbles: true }));

                setTimeout(() => {
                    waitForElement('button[aria-label="プロンプトを送信する"]', 5000)
                        .then((sendButton) => {
                            console.log("✅ sendButton: ", sendButton);
                            sendButton.click();
                            console.log("✅ ボタンを押した！");

                            // 下スクロールボタンを探してクリック
                            setTimeout(() => {
                                const scrollIconPath = 'M12 21C11.7348 21 11.4804 20.8946 11.2929 20.7071L4.29289 13.7071C3.90237 13.3166 3.90237 12.6834 4.29289 12.2929C4.68342 11.9024 5.31658 11.9024 5.70711 12.2929L11 17.5858V4C11 3.44772 11.4477 3 12 3C12.5523 3 13 3.44772 13 4V17.5858L18.2929 12.2929C18.6834 11.9024 19.3166 11.9024 19.7071 12.2929C20.0976 12.6834 20.0976 13.3166 19.7071 13.7071L12.7071 20.7071C12.5196 20.8946 12.2652 21 12 21Z';
                            
                                const scrollButton = Array.from(document.querySelectorAll("button"))
                                    .find(btn => {
                                        const path = btn.querySelector("svg path");
                                        return path && path.getAttribute("d") === scrollIconPath;
                                    });
                            
                                if (scrollButton) {
                                    scrollButton.click();
                                    console.log("✅ スクロールボタンを押した！");
                                } else {
                                    console.warn("⚠️ 下にスクロールボタンが見つかりませんでした");
                                }
                            }, 2000);
                            
                        })
                        .catch((err) => {
                            console.warn("⚠️ 送信ボタンが見つからなかったか、表示に時間がかかっています:", err);
                        });
                }, 500);
            } else {
                console.error("❌ textarea または wrapper が見つかりません！");
            }
        } catch (e) {
            console.error("🚨 エラー発生:", e);
        }
    }
});
