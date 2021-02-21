document.getElementById('file').addEventListener('change', function (e){
let file = e.target.files[0];
// ファイルのブラウザ上でのURLを取得する
const blobUrl = window.URL.createObjectURL(file);
let img = new Image();
let flg = true;
let flg2 = false;
let first_x = null;
let first_y = null;
let last_x = null;
let last_y = null;
let base1 = null;
let data = null;
img.src = blobUrl;
let w =null;
let h = null;

const canvas = document.getElementById('screen_image');
if (canvas && canvas.getContext) {
  const ctx = canvas.getContext('2d');
  img.onload = function () {
    w = img.width;
    h = img.height;
    canvas.width = w;
    canvas.height = h;
    ctx.drawImage(img, 0, 0);
    canvas.addEventListener("click", first_click, false);
    canvas.addEventListener("click", fill_rect, false);

  };
  let first_click = function (e) {
    let rect = e.target.getBoundingClientRect();
    if (flg) {
      first_x = e.clientX - rect.left;
      first_y = e.clientY - rect.top;
      flg = false;
    } else {
      last_x = e.clientX - rect.left;
      last_y = e.clientY - rect.top;
      flg = true;
      flg2 = true;
    }
  };
  document.getElementById("btn1").addEventListener("click", function(){
    const link = document.getElementById('download');
    link.href = canvas.toDataURL();
    link.download = 'download.png';
    link.click();
  });

  let fill_rect = function () {
    if (flg2 === true) {
      if (first_x > last_x) {
        [first_x, last_x] = [last_x, first_x];
      }
      if (first_y > last_y) {
        [first_y, last_y] = [last_y, first_y];
      }
      ctx.fillStyle = "rgb(0, 0, 0)";
      ctx.fillRect(first_x, first_y, last_x - first_x, last_y - first_y);
      flg2 = false;
      data = canvas.toDataURL('image/png');
      document.getElementById('screen_image').value = data;
    }
  };
}
});