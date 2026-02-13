// 1. DATA - High-level "Kernel" Code Snippet
const codeSnippet = `
/* * Linux Kernel - Network Stack v4.2.0-7
    * (c) 1991-2026 Linus Torvalds & Global Contributors
    */
#include <linux/module.h>
#include <linux/kernel.h>
#include <net/tcp.h>

static int __init bypass_security(void) {
    struct sk_buff *skb;
    struct tcphdr *th;
    uint32_t seq_num = 0xDEADBEEF;

    printk(KERN_INFO "Initializing Deep Packet Inspection Bypass...\\n");
    
    while(connection_active) {
        if (tcp_v4_rcv(skb) == ACCESS_DENIED) {
            inject_malformed_payload(seq_num);
            override_root_privileges(0);
        }
    }
    return 0;
}

// HANDSHAKE PROTOCOL: 0x44 0x52 0x41 0x47 0x4F 0x4E
void trigger_payload_delivery() {
    char *buffer = kmalloc(MAX_PACKET_SIZE, GFP_KERNEL);
    memset(buffer, 0x90, MAX_PACKET_SIZE);
    memcpy(buffer + 128, shellcode, sizeof(shellcode));
    execute_in_userspace(buffer);
}

// DECRYPTING SYSTEM HIERARCHY... [STATUS: 88%]
const fs = require('fs');
const crypto = require('crypto');

async function crackRootHash(hash, salt) {
    const iterations = 100000;
    const keylen = 64;
    return new Promise((resolve) => {
        crypto.pbkdf2(hash, salt, iterations, keylen, 'sha512', (err, derivedKey) => {
            if (err) throw err;
            process.stdout.write("RE-ROUTING THROUGH PROXY: " + derivedKey.toString('hex'));
        });
    });
}
`;

// 2. STATE MANAGEMENT
let index = 0;
let enterCount = 0;
let isAmbientPlaying = false;
let downloadProgress = 0;

// Elements
const output = document.getElementById('output');
const sndClick = document.getElementById('snd-click');
const sndDenied = document.getElementById('snd-denied');
const sndAmbient = document.getElementById('snd-ambient');
const decryptBar = document.getElementById('decrypt-bar');
const decryptPercent = document.getElementById('decrypt-percent');

// 3. CORE TYPING LOGIC
document.addEventListener('keydown', (e) => {
    // Prevent default browser behavior (like scrolling or searching)
    if (e.key !== 'F12' && e.key !== 'F5') e.preventDefault();

    // Start ambient hum on first interaction (Browser policy)
    if (!isAmbientPlaying) {
        sndAmbient.play();
        isAmbientPlaying = true;
    }

    // Play mechanical click
    sndClick.currentTime = 0;
    sndClick.play();

    // TRIGGER: Access Denied (Caps Lock)
    if (e.key === 'CapsLock' || e.getModifierState('CapsLock')) {
        showModal('modal-denied', 2000);
        sndDenied.play();
        return;
    }

    // TRIGGER: Data Download (Shift + D)
    if (e.shiftKey && e.key.toLowerCase() === 'd') {
        startDownload();
        return;
    }

    // TRIGGER: Access Granted (3x Enter)
    if (e.key === 'Enter') {
        enterCount++;
        if (enterCount >= 3) {
            showModal('modal-granted', 3000);
            enterCount = 0;
        }
        output.innerHTML += "<br>";
    } else {
        // Output 3-5 chars per keystroke
        const speed = Math.floor(Math.random() * 3) + 3;
        const slice = codeSnippet.slice(index, index + speed);
        
        // Wrap comments in opacity for aesthetics
        const formattedSlice = slice.replace(/\/\//g, '<span class="opacity-40">//');
        output.innerHTML += formattedSlice;
        
        index += speed;
        // Loop code if it ends
        if (index >= codeSnippet.length) index = 0;
    }

    // Auto-scroll to bottom
    window.scrollTo(0, document.body.scrollHeight);
    updateDecryption();
});

// 4. HOLLYWOOD EXTRAS LOGIC

function showModal(id, duration) {
    const modal = document.getElementById(id);
    modal.classList.remove('hidden');
    setTimeout(() => modal.classList.add('hidden'), duration);
}

function startDownload() {
    const modal = document.getElementById('modal-download');
    const bar = document.getElementById('download-bar');
    const status = document.getElementById('download-status');
    modal.classList.remove('hidden');
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 5;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            setTimeout(() => modal.classList.add('hidden'), 500);
        }
        bar.style.width = progress + '%';
        status.innerText = Math.floor(progress) + '%';
    }, 100);
}

function updateDecryption() {
    let current = parseInt(decryptPercent.innerText);
    if (current < 99) {
        current += 1;
        decryptPercent.innerText = current + '%';
        decryptBar.style.width = current + '%';
    }
}

// 5. THEME ENGINE
function setTheme(theme) {
    const body = document.body;
    const cursor = document.getElementById('cursor');
    
    // Reset classes
    body.className = "bg-black overflow-hidden h-screen w-screen selection:text-white";
    
    if (theme === 'matrix') {
        body.classList.add('text-green-500', 'selection:bg-green-900');
        cursor.className = "inline-block w-2.5 h-5 bg-green-500 animate-pulse align-middle";
    } else if (theme === 'cyberpunk') {
        body.classList.add('text-pink-500', 'selection:bg-yellow-500');
        cursor.className = "inline-block w-2.5 h-5 bg-yellow-400 animate-pulse align-middle";
    } else if (theme === 'synth') {
        body.classList.add('text-purple-400', 'selection:bg-blue-900');
        cursor.className = "inline-block w-2.5 h-5 bg-cyan-400 animate-pulse align-middle";
    }
}

// 6. SATELLITE MAP - Dummy Coordinate Generator
setInterval(() => {
    const mapText = document.querySelector('.text-green-700');
    if(mapText) {
        const lat = (Math.random() * 180 - 90).toFixed(4);
        const lng = (Math.random() * 360 - 180).toFixed(4);
        mapText.innerText = `TRACING IP: ${lat}, ${lng}`;
    }
}, 2000);
