let lastKnownScrollPosition = 0;

let screenWidth = window.innerWidth;
let screenHeight = window.innerHeight;
const mainContent = document.getElementById('main-content');
const title = document.getElementById('title');
const high = document.getElementsByClassName('title-high');
const tech = document.getElementsByClassName('title-tech');
const mess = document.getElementsByClassName('title-mess');
const tickets = document.getElementById('tickets-top')
const tickets2 = document.getElementById('tickets-bottom')

const whereWhen = document.getElementById('wherewhen-left');
const whereWhenInitialPosition = whereWhen.offsetTop;

const maxDistanceToMoveWhereWhen = 250;
const minLogoSize = 200;

function onScroll(scrollPosition) {
    const percentScrolled = Math.min(scrollPosition / screenHeight, 1);
    mainContent.style.left = 50 - (50 * percentScrolled) + '%';
    mainContent.style.height = `${Math.max(title.clientHeight, screenHeight - (screenHeight * percentScrolled))}px`;
    mainContent.style.width = `${Math.max(title.clientWidth, (screenWidth - (screenWidth * percentScrolled)) / 2)}px`;
    mainContent.style.top = `${Math.min(scrollPosition, screenHeight + maxDistanceToMoveWhereWhen)}px`
    mainContent.style.fontSize = `${Math.max(48, 160 - (percentScrolled * 140))}px`
    
    const horizontalShift = Math.sin(percentScrolled * 2 * Math.PI) * 50
    const horizontalShift2 = Math.sin(percentScrolled * Math.PI) * 50
    const verticalShift = Math.sin(horizontalShift)

    high[0].style.marginLeft = `${-horizontalShift2 / 2}%`
    high[1].style.marginLeft = `${-horizontalShift}%`
    high[0].style.marginTop = `${verticalShift}%`
    high[1].style.marginTop = `${verticalShift}%`
    
    mess[0].style.marginLeft = `${horizontalShift2}%`
    mess[1].style.marginLeft = `${horizontalShift / 2}%`
    mess[0].style.marginTop = `${-verticalShift}%`
    mess[1].style.marginTop = `${-verticalShift}%`

    if (scrollPosition > whereWhenInitialPosition - minLogoSize) {
        whereWhen.style.top = `${Math.max(Math.min(scrollPosition - whereWhenInitialPosition + minLogoSize, maxDistanceToMoveWhereWhen + minLogoSize), 0)}px`
    }

    if (scrollPosition > screenHeight) {
        tickets.style.boxShadow = `4px 4px 0px 0px ${color}`
        tickets2.style.boxShadow = `4px 4px 0px 0px ${color}`
    } else {
        tickets.style.boxShadow = '4px 4px 0px 0px #000'
        tickets2.style.boxShadow = '4px 4px 0px 0px #000'
    }
}
  
document.addEventListener("scroll", () => {
    lastKnownScrollPosition = window.scrollY;

    if (!ticking) {
        window.requestAnimationFrame(() => {
            onScroll(lastKnownScrollPosition);
            ticking = false;
        });

        ticking = true;
    }
});
  