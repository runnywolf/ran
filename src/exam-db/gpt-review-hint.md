# 用來協助 gpt 維護 exam db

## how to add a exam
讀取我給的 exam pdf, 依照以下規則:
1. 將題本頁面的黑色細線框內的題目和說明區塊轉成純文字, 每一個題目或說明的 "文字區塊" 用一行空白分開,
,題目區塊內不能出現任何空白行, 每一行的文字長度控制在 100 ~ 150 bytes
2. 不要解析圖片
3. 不要翻譯題目的任何中文和英文
4. 修改中英文的錯字, 但是不能添加額外的單字來修正語法
5. 中英文句子可以補上句點
6. 如果英文單字出現 `-` 需要改成 Non-Breaking Hyphen (`‑`) 避免單字被切斷, latex 除外 
7. 英文需要將 '單引號' 和 "雙引號" 改成 ‘單引號’ 和 “雙引號”
8. latex 語法請用 `\(...\)` 包裹行內 latex 語法, latex 置中語法請用 `\[...\]` 包裹
9. `\[...\]` 語法請這樣寫 `\[...\]`, 不要寫成 `\[\n...\n\]`, 但是單行太長不需要遵守此規則, 直接從中間換行
10. 使用 `docs/components/vue-katex` 的 latex macro
11. 不要附上詳解
12. temp file 都暫存到 `src/exam-db-tool`, 執行完記得清理, 用 git 檢查是否有殘留

將題本解析內容複寫到 `src/exam-db-tool/raw-exam-text.txt`

## add tag
參考 `src/exam-db/tag-tree.json`  
將指定題本的 `src/exam-db/<uni>/<year>/config.json` 內的 `problemConfigs` 的每一題的 `tags` 填入標籤  
如果分類是 "向量空間" 就填入 `"la-vs"`
1. 混合題可以填入多個標籤, 盡可能的精簡
2. 如果出現多選題 (A ~ E) 或多子題 (a, b, c), 每個子題或選項都能填入一個標籤
3. 同一題不要同時添加 "子集型子標籤" 例如同時加入 "dm-cp-c" & "dm-cp", 但是 "dm-st" & "dm-st-br" 這種偏向 "延伸型子標籤" 不需要遵守
4. 如果你認為子標籤不太適合此題目, 使用父標籤是能被接受的
5. 當判定完所有標籤之後, 列表說明每一題的題號 `<uni>-<year>-<no>` 以及 `tags`, 並簡短說明選擇這些 tag 的理由, 如果有疑義也提出

## tag maintain
1. 機率問題 (單純只是排列組合除以所有可能個數這種機率) 暫時放在 dm-c-pc
2. euler function 暫時歸類在 dm-nt-gl
3. linearly independent 判定問題歸類在 la-vs-bd

有些題目雖然關連到多個 tag, 但是題目核心為 tag A 衍伸出 tag B, C
這種情況下仍然會只添加 tag A, 但還是需要提醒我一下
例子:
ncu-111/19
ncu-106/20 (la-m): 由 covariance matrix 衍生, 判定為 la-m

以下題目的 tag 基於一些理由, 不需要修改 tag:
ntu-114/8 (la-ips-p): 這題算 function proj 的一種
ncku-110/3 (dm-nt): 第二子題並不屬於整數分解 (dm-c-ic), 整數分解為 x1 + x2 + x3 = N, xi \in N 這種
ncku-111/6 (la-ips-dm): Rayleigh quotient 會被暫時分類為定性矩陣
ncku-108/6 (ag): 等 ag-flow
ncu-113/12 (dm-gt): dm-gt-bg 僅 A 選項
nycu-107/11 (la-m): 太雜, skip
nycu-115/2 (la-m): 這題基本矩陣運算可解
