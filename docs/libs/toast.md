---
outline: [2, 3] # 顯示 h2, h3
head:
  - - link
    - rel: stylesheet
      href: https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css # katex 語法支援
---

# Toast - 彈出式訊息
在 app 頂部彈出一個訊息方塊。

## 範例
```js
import { showToast, ToastType } from "toast";

showToast("顯示黑色的彈出訊息 (預設)", ToastType.DEFAULT);
showToast("顯示藍色的彈出訊息 (訊息)", ToastType.INFO);
showToast("顯示綠色的彈出訊息 (成功)", ToastType.SUCCESS);
showToast("顯示黃色的彈出訊息 (警告)", ToastType.WARNING);
showToast("顯示紅色的彈出訊息 (錯誤)", ToastType.ERROR);
```
