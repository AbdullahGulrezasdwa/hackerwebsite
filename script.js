// 1. FAIL-SAFE DATA (This ensures it works even if source.txt fails)
let codeSnippet = `/* * SECURITY OVERRIDE: SECTOR 7-G 
 * BYPASSING ENCRYPTION... 
 */

#include <uapi/linux/ptrace.h>
#include <linux/sched.h>

void trigger_payload_delivery() {
    char *buffer = kmalloc(4096, GFP_KERNEL);
    memset(buffer, 0x90, 4096); 
    memcpy(buffer + 128, shellcode, sizeof(shellcode));
    execute_in_userspace(buffer);
}

// ESTABLISHING CONNECTION TO 184.22.109.55...
// LOCALHOST BYPASS INITIATED...
`;

// 2. ELEMENT SELECTORS
const output = document.getElementById('output');
const sndClick = document.getElementById('snd-click');
const sndAmbient = document.getElementById('snd-ambient');
const decryptBar = document.getElementById('decrypt-bar');
const decryptPercent = document.getElementById('decrypt-percent');

let index = 0;
let isAmbientPlaying = false;

// 3. TRY TO LOAD EXTERNAL FILE (If it fails, it keeps the fallback above)
fetch('source.txt')
    .then(res => res.text())
    .then(data => {
        if(data) codeSnippet = data;
        console.log("Source.txt loaded successfully.");
    })
    .catch(err => console.log("Using internal code fallback (Local File mode)."));

// 4. THE KEYDOWN ENGINE
// We attach this to 'window' so it catches typing no matter where you click
window.addEventListener('keydown', (e) => {
    // Ignore system keys like F12, F5, Cmd, etc.
    if (e.key.length > 1 && e.key !== 'Enter' && e.key !== 'Backspace') return;

    // A. Prevent default browser behavior (scrolling, etc)
    e.preventDefault();

    // B. Sound Management
    if (!isAmbientPlaying && sndAmbient) {
        sndAmbient.play().catch(() => {}); // Catch browser block
        isAmbientPlaying = true;
    }
    if (sndClick) {
        sndClick.currentTime = 0;
        sndClick.play().catch(() => {});
    }

    // C. The Typing Logic
    // Grab a chunk of characters (3-5 at a time)
    const speed = 4; 
    const slice = codeSnippet.slice(index, index + speed);
    
    // Add to screen
    output.innerHTML += slice.replace(/\n/g, '<br>');
    
    // Move index forward
    index += speed;

    // Loop if we reach the end
    if (index >= codeSnippet.length) index = 0;

    // D. Auto-Scroll
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
    });

    // E. Update the "Hollywood" Progress Bar
    if (decryptBar) {
        let progress = (index / codeSnippet.length) * 100;
        decryptBar.style.width = `${progress}%`;
        decryptPercent.innerText = `${Math.floor(progress)}%`;
    }
});
