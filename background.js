chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.text) {
      chrome.storage.local.set({ copiedText: message.text }, () => {
          chrome.storage.local.get("selectedAI", (data) => {
              let aiURL = "https://chatgpt.com/";
              let pasteScript = "chat_gpt_paste.js";

              if (data.selectedAI === "gemini") {
                  aiURL = "https://gemini.google.com/";
                  pasteScript = "gemini_paste.js";
              }

              // 既に開いているタブを探す
              chrome.tabs.query({ url: aiURL + "*" }, (tabs) => {
                  if (tabs.length > 0) {
                      // 既存のタブがあれば、そのタブをアクティブにしてスクリプトを実行
                      const existingTab = tabs[0];
                      chrome.tabs.update(existingTab.id, { active: true });

                      setTimeout(() => {
                          chrome.scripting.executeScript({
                              target: { tabId: existingTab.id },
                              files: [pasteScript]
                          }, () => {
                              console.log(`✅ 既存のタブで ${pasteScript} を実行しました！`);
                          });
                      }, 1000);
                  } else {
                      // 既存のタブがなければ、新しいタブを開く
                      chrome.tabs.create({ url: aiURL }, (newTab) => {
                          setTimeout(() => {
                              chrome.scripting.executeScript({
                                  target: { tabId: newTab.id },
                                  files: [pasteScript]
                              }, () => {
                                  console.log(`✅ ${pasteScript} を実行しました！`);
                              });
                          }, 3000);
                      });
                  }
              });
          });
      });
  }
});
