// 你的連結處理函式 (這裡處理你 [AC BOX PDF] 的問題)
function linkify(text) {
  if (!text) return "";
  const pattern = /([^\s\[\]]+)(\[(.*?) PDF\])/g;
  return text.toString().replace(pattern, function(match, url, fullTag, pdfName) {
    return `<span class="pdf-link" onclick="alert('點擊了 ${pdfName}')">${pdfName}</span>`;
  });
}

// 這裡假設你有個函數處理資料，我們之後再補上抓取 Google Sheet 的 fetch 邏輯
console.log("網頁已載入");