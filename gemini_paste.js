chrome.storage.local.get("copiedText", (data) => {
    if (data.copiedText) {
        console.log("✅ 保存されたテキストを取得しました (Gemini)");

        // Gemini の入力エリアを取得
        const inputArea = document.querySelector(
            'rich-textarea div.ql-editor.textarea.new-input-ui > p'
        );

        if (inputArea) {
            inputArea.focus();

            // `innerHTML` を使ってテキストをセット
            inputArea.innerHTML = "以下の英文を日本語要約してください。<br><br>" + data.copiedText.replace(/\n/g, "<br>");

            // 変更を Gemini に通知
            inputArea.dispatchEvent(new Event("input", { bubbles: true }));
            inputArea.dispatchEvent(new Event("change", { bubbles: true }));

            console.log("✅ テキストをペーストしました (Gemini)");

            // 送信ボタンのクリック
            setTimeout(() => {
                const sendButton = document.querySelector(
                    "button.send-button"
                );
                if (sendButton) {
                    sendButton.click();
                } else {
                    console.error("Error: Gemini の送信ボタンが見つかりません！");
                }
            }, 1000); // 1秒待機してクリック
        } else {
            console.error("Error: Gemini の入力エリアが見つかりません！");
        }
    }
});
