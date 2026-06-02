// 1. 你的 API 網址
const apiUrl = "https://script.google.com/macros/s/AKfycbzMlbLonfEGcrpJcB6EflgVDAvIGhBrnGJDarcQbtgFLa3-3901GWPObToPkec605WCCQ/exec";

// 2. 當網頁載入後，自動執行抓取資料
document.addEventListener("DOMContentLoaded", function() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(allData => {
            console.log("資料讀取成功：", allData);
            // 預設先顯示 "CPU" 分頁的資料
            renderSopCards(allData["CPU"]); 
        })
        .catch(error => {
            console.error('讀取失敗:', error);
            document.querySelector('#table-output').innerHTML = "資料載入失敗，請檢查網路或權限";
        });
});

// 3. 處理 PDF 連結的函式
function linkify(text) {
    if (!text) return "";
    const pattern = /([^\s\[\]]+)(\[(.*?) PDF\])/g;
    return text.toString().replace(pattern, function(match, url, fullTag, pdfName) {
        // 這裡我們修改為連結到你的 PDF 目錄
        return `<a href="PDF file/${pdfName}.pdf" target="_blank" class="pdf-link">${pdfName} PDF</a>`;
    });
}

// 4. 將資料轉成 HTML 卡片顯示的函式
function renderSopCards(dataArray) {
    const output = document.querySelector('#table-output');
    output.innerHTML = ""; // 清空舊內容
    
    // 假設第一行是標題，從第二行開始迴圈
    for(let i = 1; i < dataArray.length; i++) {
        let row = dataArray[i];
        let card = document.createElement('div');
        card.className = "sop-card";
        card.innerHTML = `
            <div class="sop-title-bar">${row[0]}</div>
            <div class="col-box">${linkify(row[1])}</div>
        `;
        output.appendChild(card);
    }
}
