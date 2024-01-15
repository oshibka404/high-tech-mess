const blinkBlock = document.getElementById('blink')

blinkBlock.innerHTML = blinkBlock.innerText.split('').map((char, i) => {
    return `<span class="blink-char" style="animation-delay: ${Math.random()}s">${char}</span>`;
}).join('');