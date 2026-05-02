// Define types for external libraries (since Typed.js is loaded via CDN)
declare const Typed: any;

// Wait for the DOM to fully load before running scripts
document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Typed.js Initialization ---
    const typed = new Typed('#element', {
        strings: [
            'a passionate <i>Java Application</i> Developer', 
            'a passionate <i>Python</i> Application Developer', 
            'an enthusiastic <i>Web</i> Developer', 
            'an enthusiastic <i>Android</i> Developer', 
            'a <i>Software Developer</i> at TCS'
        ],
        typeSpeed: 50,
    });

    // --- 2. Tab Navigation (About Section) ---
    const tabLinks = document.querySelectorAll('.tab-links');
    const tabContents = document.querySelectorAll('.content');

    function openTab(event: Event) {
        const clickedTab = event.currentTarget as HTMLElement;
        const targetId = clickedTab.getAttribute('data-tab');

        // Remove active class from all links and contents
        tabLinks.forEach(link => link.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));

        // Add active class to clicked tab and corresponding content
        clickedTab.classList.add('active');
        if (targetId) {
            const targetContent = document.getElementById(targetId);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        }
    }

    // Attach event listeners to tabs
    tabLinks.forEach(link => {
        link.addEventListener('click', openTab);
    });

    // --- 3. Mobile Menu Toggle ---
    const navMenu = document.getElementById("navMenu") as HTMLElement;
    const openMenuBtn = document.getElementById("open-menu-btn");
    const closeMenuBtn = document.getElementById("close-menu-btn");

    if (openMenuBtn) {
        openMenuBtn.addEventListener('click', () => {
            navMenu.style.right = "0";
        });
    }

    if (closeMenuBtn) {
        closeMenuBtn.addEventListener('click', () => {
            navMenu.style.right = "-200px";
        });
    }

    // --- 4. "See More" Portfolio Toggle ---
    const moreBtn = document.getElementById("more-btn");
    const hiddenDiv = document.getElementById("hd");
    let isExpanded: boolean = false;

    if (moreBtn && hiddenDiv) {
        moreBtn.addEventListener('click', () => {
            if (!isExpanded) {
                hiddenDiv.style.display = "grid";
                moreBtn.innerHTML = "See Less";
                isExpanded = true;
            } else {
                hiddenDiv.style.display = "none";
                moreBtn.innerHTML = "See More";
                isExpanded = false;
            }
        });
    }

    // --- 5. Contact Form Submission ---
    const scriptURL = 'https://script.google.com/macros/s/AKfycbwgyMoYCjYO7SjLXeOsIWXaGQCIFZcTQJ9Jtd1eG6nrbu4mgh9kqTJr-kbUtWcNSVG0/exec';
    const form = document.forms.namedItem('submit-to-google-sheet');
    
    if (form) {
        form.addEventListener('submit', (e: Event) => {
            e.preventDefault();
            
            const formData = new FormData(form);
            
            fetch(scriptURL, { method: 'POST', body: formData })
                .then(response => alert("Message Sent Successfully"))
                .catch(error => alert("Error in Sending"));
        });
    }
});