let selectedImages = []; // 存儲已選擇的圖片索引
let imageElements = []; // 保留9張圖片對應的 img 元素

document.addEventListener("DOMContentLoaded", () => {
    const maleBtn = document.getElementById("maleBtn");
    const femaleBtn = document.getElementById("femaleBtn");
    const resetBtn = document.getElementById("resetBtn");
    const mainBtn = document.getElementById("mainBtn");

    function addBorder(color) {
       // ✅ 讓按鈕本身加上邊框
        maleBtn.style.border = color === "blue" ? "3px solid blue" : "none";
        femaleBtn.style.border = color === "pink" ? "3px solid pink" : "none";
    }


    // ✅ 預設為英文男聲
    maleVoice();

    const images = Array.from({length: 108}, (_, i) => `uno/images/UNO_B${i+1}.png`);
    const audioFiles = Array.from({length: 108}, (_, i) => `uno/audio/english/audio${i+1}.mp3`);
    const madrineAudio = Array.from({length: 108}, (_, i) => `uno/audio/madrine/audio${i+1}.mp3`);

    const grid = document.getElementById("grid");
//    let selectedImages = []; // 存儲已選擇的圖片索引
//    let imageElements = []; // 保留9張圖片對應的 img 元素

    //隨機產生圖形索引
    function getRandomImages() {
        const shuffledIndexes = Array.from({length: images.length}, (_, i) => i).sort(() => 0.5 - Math.random());
        selectedImages = shuffledIndexes.slice(0, 9); // 只取前 9 個隨機索引
        return selectedImages.map(index => images[index]); // 返回對應的圖片路徑
    }

    function createGrid() {
        // 確保九宮格的結構不變，只替換圖片
        if (grid.children.length === 0) {
            // 第一次生成九宮格
            const selectedImagePaths = getRandomImages();
            selectedImagePaths.forEach((src, index) => {

                const img = document.createElement("img");
                img.src = src;
                img.dataset.index = selectedImages[index]; // 存入原始索引
                img.addEventListener("click", handleClick);
                img.addEventListener("touchstart", handleClick);

                const cell = document.createElement("div");
                cell.className = "cell";
                cell.style.position = "relative";

                const mask = document.createElement("div");
                mask.className = "mask";
                cell.appendChild(img);
                cell.appendChild(mask);
                grid.appendChild(cell);
                // 儲存 img 參考
                imageElements[index] = { img, mask };
            });
        } else {
                // 只更新圖片，不變動佈局
                const selectedImagePaths = getRandomImages();
                Array.from(imageElements).forEach((ref, index) => {
                   ref.img.src = selectedImagePaths[index]; // 重新分配隨機圖片
                   ref.img.dataset.index = selectedImages[index]; // 更新索引
                   });
               }

     }
    
     function handleClick(event) {
         const img = event.target;
         const index = img.dataset.index;

         const offset = imageElements.findIndex(ref => ref.img === event.currentTarget);

         if (offset == -1) return;

         // 關閉遮罩播放音檔
         imageElements[offset].mask.style.display = "none"; // 關閉遮罩

         const audio = document.getElementById("audio");
       
         if (maleBtn.style.border == "none") {
             audio.src = madrineAudio[index];
         } else {
             audio.src = audioFiles[index];
         }

         audio.play();

         // 設定延遲，音檔播放後恢復原圖
         setTimeout(() => {
             imageElements[offset].mask.style.display = "block"; // 重置遮罩
         }, 1000); // 1 秒後恢復
                                
     }

    function resetGrid() { createGrid(); } // 重新產生九宮格

     function maleVoice(){addBorder("blue");}
 
     function femaleVoice(){addBorder("pink");}

     function mainmenu(){window.location.href = `index.html`;}             

     resetBtn.addEventListener("click", resetGrid); // 綁定重置按鈕事件
     maleBtn.addEventListener("click", maleVoice); // 點擊男性按鈕
     femaleBtn.addEventListener("click", femaleVoice); // 點擊女性按鈕 
     mainBtn.addEventListener("click",mainmenu);// 回主畫面

     createGrid(); // 初始執行
});

