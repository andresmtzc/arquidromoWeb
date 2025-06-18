const hexGrid = document.getElementById("hexGrid");

const cols = 6;
const rows = 6;
const hexW = 100;
const hexH = 115;
const horizontalSpacing = 110;
const verticalSpacing = 130;

const images = [
  "https://picsum.photos/id/1011/300/345",
  "https://picsum.photos/id/1012/300/345",
  "https://picsum.photos/id/1015/300/345",
  "https://picsum.photos/id/1016/300/345",
  "https://picsum.photos/id/1021/300/345",
  "https://picsum.photos/id/1024/300/345",
  "https://picsum.photos/id/1025/300/345",
  "https://picsum.photos/id/1035/300/345",
  "https://picsum.photos/id/1039/300/345",
  "https://picsum.photos/id/1043/300/345",
  "https://picsum.photos/id/1050/300/345",
  "https://picsum.photos/id/1052/300/345",
  "https://picsum.photos/id/1060/300/345",
  "https://picsum.photos/id/1062/300/345",
  "https://picsum.photos/id/1067/300/345",
  "https://picsum.photos/id/1070/300/345",
  "https://picsum.photos/id/1071/300/345",
  "https://picsum.photos/id/1072/300/345",
  "https://picsum.photos/id/1080/300/345",
  "https://picsum.photos/id/1081/300/345",
  "https://picsum.photos/id/1082/300/345",
  "https://picsum.photos/id/1084/300/345",
  "https://picsum.photos/id/1085/300/345",
  "https://picsum.photos/id/1086/300/345",
  "https://picsum.photos/id/1087/300/345",
  "https://picsum.photos/id/1088/300/345",
  "https://picsum.photos/id/1089/300/345",
  "https://picsum.photos/id/1090/300/345",
  "https://picsum.photos/id/1091/300/345",
  "https://picsum.photos/id/1092/300/345",
  "https://picsum.photos/id/1093/300/345",
  "https://picsum.photos/id/1094/300/345",
  "https://picsum.photos/id/1095/300/345",
  "https://picsum.photos/id/1096/300/345",
  "https://picsum.photos/id/1097/300/345",
  "https://picsum.photos/id/1098/300/345",
  "https://picsum.photos/id/1099/300/345",
];

const hexes = [];

for(let r = 0; r < rows; r++) {
  for(let c = 0; c < cols; c++) {
    const hex = document.createElement("div");
    hex.classList.add("hex");

    const left = c * horizontalSpacing + (r % 2) * (horizontalSpacing / 2);
    const top = r * verticalSpacing;

    hex.style.left = `${left}px`;
    hex.style.top = `${top}px`;

    const imgIndex = (r * cols + c) % images.length;
    hex.style.backgroundImage = `url(${images[imgIndex]})`;

    hexGrid.appendChild(hex);
    hexes.push({el: hex, row: r, col: c, left, top});
  }
}

function hexDistance(r1, c1, r2, c2) {
  const dx = c2 - c1;
  const dy = r2 - r1;
  return (Math.abs(dx) + Math.abs(dy) + Math.abs(dx + dy)) / 2;
}

function hoverHex(row, col) {
  const maxPush = 30;

  hexes.forEach(({el, row: r, col: c, left, top}) => {
    const dist = hexDistance(row, col, r, c);

    if(r === row && c === col) {
      el.style.transform = "scale(1.5)";
      el.style.zIndex = 10;
      el.style.filter = "opacity(1)";
      el.style.left = `${left}px`;
      el.style.top = `${top}px`;
    } else {
      const dx = (c - col);
      const dy = (r - row);

      const pushX = (dx === 0 ? 0 : Math.sign(dx)) * Math.max(0, maxPush - dist * 8);
      const pushY = (dy === 0 ? 0 : Math.sign(dy)) * Math.max(0, maxPush - dist * 8);

      el.style.transform = "scale(1)";
      el.style.zIndex = 1;
      el.style.filter = `opacity(${0.3 + Math.min(dist * 0.15, 0.7)})`;
      el.style.left = `${left + pushX}px`;
      el.style.top = `${top + pushY}px`;
    }
  });
}

function resetHexes() {
  hexes.forEach(({el, left, top}) => {
    el.style.transform = "scale(1)";
    el.style.zIndex = 1;
    el.style.filter = "opacity(1)";
    el.style.left = `${left}px`;
    el.style.top = `${top}px`;
  });
}

// Hover listeners for desktop
hexes.forEach(({el, row, col}) => {
  el.addEventListener("mouseenter", () => hoverHex(row, col));
  el.addEventListener("mouseleave", () => resetHexes());
});

// Scroll highlight logic for mobile simulation / horizontal scroll

const hexWrapper = hexGrid.parentElement;
let scrollTimeout = null;

function highlightCenteredHex() {
  const containerRect = hexWrapper.getBoundingClientRect();
  const containerCenterX = containerRect.left + containerRect.width / 2;

  let closestHex = null;
  let minDist = Infinity;

  hexes.forEach(({el, left, top, row, col}) => {
    const hexCenterX = containerRect.left + left + hexW / 2;
    const dist = Math.abs(hexCenterX - containerCenterX);

    if(dist < minDist) {
      minDist = dist;
      closestHex = {el, row, col};
    }
  });

  if(closestHex) {
    hoverHex(closestHex.row, closestHex.col);
  }
}

function onScroll() {
  if(scrollTimeout) clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    highlightCenteredHex();
  }, 80);
}

hexWrapper.addEventListener("scroll", onScroll);

// Initial highlight on load
highlightCenteredHex();
