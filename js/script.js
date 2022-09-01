const girl = document.querySelector('.girl');
const skull = document.querySelector('.skull');
const clouds = document.querySelector('.bg');
const refreshButton = document.querySelector('.refresh-button');
const start = document.querySelector('.start');
const pointLabel = document.querySelector('.points');

let damage = 0;
let points = 0;
let isStart = false;
skull.style.visibility = 'hidden';

start.addEventListener('click', () => {
  isStart = true;
  girl.style.opacity = 1;
  skull.style.visibility = 'visible';
  start.style.visibility = 'hidden';
  skull.style.animation = 'skull-animation 2.5s infinite linear';
});

const jump = () => {
  girl.src = 'images/jump.gif';
  girl.classList.add('jump');
  setTimeout(() => {
    girl.src = 'images/girl.gif';
    girl.classList.remove('jump');
  }, 500);
};

const loop = setInterval(() => {
  const skullPositionX = skull.offsetLeft;
  const girlPositionY = +window.getComputedStyle(girl).bottom.replace('px', '');
  pointLabel.textContent = `Points: ${+points}`;

  const gameOver = () => {
    refreshButton.style.visibility = 'visible';

    skull.style.animation = 'none';
    skull.style.left = `${skullPositionX}px`;

    girl.style.animation = 'none';
    girl.style.bottom = `${girlPositionY}px`;

    girl.src = 'images/elemental/PNG animations/13_death/13_death_10.png';
    girl.style.width = '600px';
    girl.style.marginLeft = '-150px';

    clearInterval(loop);
  };
  if (skullPositionX <= 120 && skullPositionX >= 111 && girlPositionY < 80)
    damage += 1;

  if (skullPositionX <= 0 && skullPositionX >= -3 && isStart == true)
    points += 1;

  if (damage >= 3) gameOver();
}, 10);

refreshButton.addEventListener('click', () => location.reload());
document.addEventListener('keydown', jump);
