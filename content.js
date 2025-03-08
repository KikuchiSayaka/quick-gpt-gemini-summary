(() => {
    let content = "";
    document.querySelectorAll("h1, h2, h3, h4, h5, h6, p, a, pre").forEach(el => {
      content += el.innerText + "\n\n";
    });
  
    chrome.runtime.sendMessage({ text: content });
  })();
  