chrome.storage.local.get("copiedText", (data) => {
    if (data.copiedText) {
        const textarea = document.querySelector(
            "#prompt-textarea > p"
        );
        const textareaWrapper = document.querySelector(
            "#composer-background > div.flex.flex-col.justify-start > div > div.min-w-0.max-w-full.flex-1 > div > textarea"
        );
        
        if (textarea) {
            // textareaWrapper.style.display = "block"; // display:none解除
            textarea.focus();
            textarea.innerHTML = "以下の英文を日本語要約してください。<br><br>" + data.copiedText.replace(/\n/g, "<br>");
            textareaWrapper.focus();
            textareaWrapper.value = "以下の英文を日本語要約してください。\n\n" + data.copiedText;

            // 変更を ChatGPT に通知
            textarea.dispatchEvent(new Event("input", { bubbles: true }));
            textarea.dispatchEvent(new Event("change", { bubbles: true }));



            // 送信ボタン
            setTimeout(() => {
                const sendButton = document.querySelector(
                    "#composer-background > div.mb-2.mt-1.flex.items-center.justify-between.sm\\:mt-5 > div:nth-child(2) > button"
                );
                
                if (sendButton) {
                    sendButton.click();

                    // 下スクロールボタンを探してクリック
                    setTimeout(() => {
                        const scrollButton = document.querySelector(
                            "body > div.flex.h-full.w-full.flex-col > div > div.relative.flex.h-full.w-full.flex-row.overflow-hidden > div.relative.flex.h-full.max-w-full.flex-1.flex-col.overflow-hidden > main > div.composer-parent.flex.h-full.flex-col.focus-visible\:outline-0 > div.flex-1.grow.basis-auto.overflow-hidden.\@container\/thread > div > div > div > div:nth-child(91) > button"
                        );
                        if (scrollButton) {
                            scrollButton.click();
                        } else {
                            console.warn("⚠️ 下にスクロールボタンが見つかりませんでした");
                        }
                    }, 1500);
                }
            }, 500);
        } else {
            console.error("Error: ChatGPTの入力エリアが見つかりません！");
        }
    }
});
