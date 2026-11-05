
const style = document.createElement('style');
style.textContent = `
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { width: 100%; height: 100%; overflow: hidden; background: black; position: relative; }
  #animation { width: 100vw; height: 100vh; position: absolute; top: 0; left: 0; z-index: 1; }
  #animation img { width: 100%; height: 100%; object-fit: cover; display: block; }
  #paper-canvas { position: absolute; top: 0; left: 0; width: 100vw; height: 100vh; z-index: 2; pointer-events: auto; }
`;
document.head.appendChild(style);

const animationDiv = document.createElement('div');
animationDiv.id = 'animation';
const frame = document.createElement('img');
frame.id = 'frame';
frame.src = 'imagiologia/1.png';
frame.alt = 'Animação';
animationDiv.appendChild(frame);
document.body.appendChild(animationDiv);

const canvas = document.createElement('canvas');
canvas.id = 'paper-canvas';
canvas.setAttribute('resize', 'true');
document.body.appendChild(canvas);


const images = Array.from({ length: 139 }, (_, i) => `imagiologia/${i + 1}.png`);

let currentFrame = 0;
let targetFrame = 0;
const sensitivity = 0.012;
const smoothness = 0.08;

// Substituído o player HTML padrão por um objeto Audio (equivalente ao createAudio do p5.js)
const beat = new Audio('cocktaildetormentas.mp3');
beat.loop = true;
let isStopped = true;


function toggleSound() {
  if (isStopped === true) {
    beat.play().then(() => { 
      isStopped = false; 
    }).catch(error => console.log("Erro ao reproduzir áudio:", error));
  } else {
    beat.pause();
    beat.currentTime = 0;
    isStopped = true;
  }
}

const loadedImages = images.map(src => {
  const img = new Image();
  img.src = src;
  return img;
});

window.addEventListener('wheel', (event) => {
  event.preventDefault();
  const speed = Math.abs(event.deltaY);
  if (event.deltaY < 0) {
    targetFrame += speed * sensitivity;
  } else if (event.deltaY > 0) {
    targetFrame -= speed * sensitivity;
  }
  targetFrame = Math.max(0, Math.min(images.length - 1, targetFrame));
}, { passive: false });


window.addEventListener('keydown', (event) => {
  if (event.code === "Space" || event.key === " ") {
    event.preventDefault();
    toggleSound();
  }
});

function animate() {
  currentFrame += (targetFrame - currentFrame) * smoothness;
  const index = Math.round(currentFrame);

  if (frame.src !== loadedImages[index].src &&
      loadedImages[index].complete &&
      loadedImages[index].naturalWidth > 0) {
    frame.src = loadedImages[index].src;
  }

  window.currentAnimationIndex = index;
  requestAnimationFrame(animate);
}
animate();

paper.install(window);

window.onload = function() {
  paper.setup(canvas);

  var customColors = [
    "#001514", "#1b1110", "#290f0e", "#360d0c", "#440b0a",
    "#4b0a09", "#510908", "#5e0706", "#650605", "#6b0504"
  ];

  project.currentStyle.selectedColor = 'white';

  var values = {
    paths: 35,
    minPoints: 6,
    maxPoints: 16,
    minRadius: 25,
    maxRadius: 85
  };

  var hitOptions = {
    segments: true,
    stroke: true,
    fill: true,
    tolerance: 8
  };

  var framePathsStore = {};
  var currentActiveIndex = 0;
  var currentGroup = new Group();

  function createBlob(center, maxRadius, points) {
    var path = new Path();
    path.closed = true;
    for (var i = 0; i < points; i++) {
      var randomFactor = 0.3 + (Math.random() * 0.7);
      var delta = new Point({
        length: maxRadius * randomFactor,
        angle: (360 / points) * i + (Math.random() * 15 - 7.5)
      });
      path.add(center.add(delta));
    }
    path.smooth();
    return path;
  }

  function switchFrame(newIndex) {
    if (currentGroup.children.length > 0) {
      framePathsStore[currentActiveIndex] = currentGroup.children.map(function(item) {
        return item.clone(false);
      });
    }

    currentGroup.removeChildren();

    if (framePathsStore[newIndex]) {
      var savedItems = framePathsStore[newIndex];
      for (var i = 0; i < savedItems.length; i++) {
        currentGroup.addChild(savedItems[i]);
      }
    } else {
      var radiusDelta = values.maxRadius - values.minRadius;
      var pointsDelta = values.maxPoints - values.minPoints;

      for (var i = 0; i < values.paths; i++) {
        var radius = values.minRadius + Math.random() * radiusDelta;
        var points = values.minPoints + Math.floor(Math.random() * pointsDelta);
        var randomPoint = new Point(
          Math.random() * view.size.width,
          Math.random() * view.size.height
        );
        var path = createBlob(randomPoint, radius, points);

        var c1 = customColors[Math.floor(Math.random() * customColors.length)];
        var c2 = customColors[Math.floor(Math.random() * customColors.length)];
        var c3 = customColors[Math.floor(Math.random() * customColors.length)];

        var randomOffset = new Point(Math.random() * 20, Math.random() * 20);
        path.fillColor = {
          gradient: {
            stops: [c1, c2, c3],
            radial: true
          },
          origin: path.position.add(randomOffset),
          destination: path.position.add(new Point(radius * 1.2, radius * 0.8))
        };

        path.strokeColor = new Color(0, 0, 0, 0.001);
        path.strokeWidth = 6;
        path.opacity = 0.6 + Math.random() * 0.3;
        path.blendMode = 'multiply';

        currentGroup.addChild(path);
      }

      framePathsStore[newIndex] = currentGroup.children.map(function(item) {
        return item.clone(false);
      });
    }

    currentActiveIndex = newIndex;
  }

  switchFrame(0);

  view.onFrame = function(event) {
    var globalIndex = window.currentAnimationIndex || 0;
    if (globalIndex !== currentActiveIndex) {
      switchFrame(globalIndex);
    }
  };

  var segment, path;
  var movePath = false;

  var tool = new Tool();

  tool.onMouseDown = function(event) {
    // Adicionado o comportamento do clique do rato para o som (equivalente ao seu mousePressed)
    // Nota: Se clicar num blob para o arrastar/editar, o som também alternará se o evento for na área geral. 
    // Caso queira que o som toque apenas quando clica fora dos blobs, podemos ajustar, mas aqui segue o equivalente direto:
    toggleSound();

    segment = path = null;
    var hitResult = project.hitTest(event.point, hitOptions);
    if (!hitResult) return;

    if (currentGroup.children.indexOf(hitResult.item) === -1) return;

    if (event.modifiers.shift) {
      if (hitResult.type === 'segment') {
        hitResult.segment.remove();
      }
      return;
    }

    if (hitResult) {
      path = hitResult.item;
      if (hitResult.type === 'segment') {
        segment = hitResult.segment;
      } else if (hitResult.type === 'stroke') {
        var location = hitResult.location;
        segment = path.insert(location.index + 1, event.point);
        path.smooth();
      }
    }
    movePath = (hitResult.type === 'fill');
    if (movePath) {
      currentGroup.addChild(hitResult.item);
    }
  };

  tool.onMouseMove = function(event) {
    project.activeLayer.selected = false;
    var hitResult = project.hitTest(event.point, hitOptions);
    if (hitResult && currentGroup.children.indexOf(hitResult.item) !== -1) {
      hitResult.item.selected = true;
    }
  };

  tool.onMouseDrag = function(event) {
    if (segment) {
      segment.point = segment.point.add(event.delta);
      path.smooth();
    } else if (path && movePath) {
      path.position = path.position.add(event.delta);
    }
  };
};