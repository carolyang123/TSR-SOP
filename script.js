// 1. 全域變數宣告
const apiUrl = "https://script.google.com/macros/s/AKfycbzMlbLonfEGcrpJcB6EflgVDAvIGhBrnGJDarcQbtgFLa3-3901GWPObToPkec605WCCQ/exec";
let ALL_DATA = {}; // ✅ 這裡建立全域儲存區

// 2. 初始化：網頁一載入就先抓資料
document.addEventListener("DOMContentLoaded", function() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(allData => {
            ALL_DATA = allData; // ✅ 把抓到的資料存進去
            console.log("資料已儲存到 ALL_DATA:", ALL_DATA);
            renderSopCards(ALL_DATA["CPU"]); // 預設顯示 CPU
        })
        .catch(error => {
            console.error('讀取失敗:', error);
            document.querySelector('#table-output').innerHTML = "資料載入失敗";
        });
});

// 3. 修改側邊欄點擊觸發函數 (在 index.html 裡面要呼叫這個)
function loadData(category) {
    console.log("切換分類:", category);
    if (ALL_DATA[category]) {
        renderSopCards(ALL_DATA[category]);
    } else {
        document.querySelector('#table-output').innerHTML = "該分類無資料";
    }
}

// 4. PDF 連結處理 (保持不變)
function linkify(text) {
    if (!text) return "";
    const pattern = /([^\s\[\]]+)(\[(.*?) PDF\])/g;
    return text.toString().replace(pattern, function(match, url, fullTag, pdfName) {
        return `<a href="PDF/${pdfName}.pdf" target="_blank" class="pdf-link">${pdfName} PDF</a>`;
    });
}

// 5. 渲染函式 (保持不變)
function renderSopCards(dataArray) {
    if (!dataArray) return;
    const output = document.querySelector('#table-output');
    output.innerHTML = "";
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
