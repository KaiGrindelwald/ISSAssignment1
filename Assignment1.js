//Assignment1.js


document.addEventListener('DOMContentLoaded', function() {
    const starsContainer = document.querySelector('.stars');
    
    function createStars() {
        starsContainer.innerHTML = '';
        const starCount = 500; // Adjust for desired density
        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            const size = Math.random() * 3 + 1; // Random size for snowflakes
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            // Position snowflakes randomly within the viewport
            star.style.left = `${Math.random() * 100}%`;
            star.style.animationDuration = `${Math.random() * 3 + 2}s`; // Randomize fall duration
            star.style.animationDelay = `-${Math.random() * 5}s`; // Randomize delay for a varied effect
            starsContainer.appendChild(star);
        }
    }
    function clearStars() {
        starsContainer.innerHTML = '';
    }
    document.getElementById('toggleThemeBtn').addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        updateThemeStylesheet();
        if (document.body.classList.contains('dark-theme')) {
            createStars();
            localStorage.setItem('theme', 'dark'); // Save theme preference as dark
        } else {
            clearStars();
            localStorage.setItem('theme', 'light'); // Save theme preference as light
        }
    });
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        updateThemeStylesheet();
        createStars();
    }
    // Function to update the theme stylesheet link
    function updateThemeStylesheet() {
        const themeStylesheet = document.getElementById('dark-theme-stylesheet');
        themeStylesheet.href = document.body.classList.contains('dark-theme') ? 'Assignment1dark.css' : 'Assignment1.css';
    }
    // Toggle stars based on initial theme
    if (document.body.classList.contains('dark-theme')) {
        createStars();
    }
    // Dynamic content loading for navigation
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const sectionId = this.getAttribute('href').substring(1);
            loadSectionContent(sectionId);
        });
    });
    
    window.addEventListener('resize', responsiveNavbar);

    // Dynamic section content loading
    function loadSectionContent(sectionId) {
        const contentFilename = `${sectionId}.html`;
        fetch(contentFilename)
            .then(response => response.ok ? response.text() : Promise.reject('Failed to load'))
            .then(html => {
                document.getElementById('main-content').innerHTML = html;
    
                // Show or hide profile picture based on the loaded section
                toggleProfilePicture(sectionId);
            })
            .catch(error => document.getElementById('main-content').innerHTML = `<p>Content could not be loaded. ${error}</p>`);
    }
    loadSectionContent('Aboutme');
    function handleDropdownNavigation() {
        const navDropdown = document.getElementById('nav-dropdown');
        navDropdown.addEventListener('change', function() {
            // Directly use the value attribute without the '#' character
            const selectedSection = this.value.replace('#', '');
            if (selectedSection) {
                loadSectionContent(selectedSection); // Load content for the selected section
            }
        });
    }
    
    handleDropdownNavigation();
    // Function to toggle the profile picture visibility
    function toggleProfilePicture(sectionId) {
        const profilePictureContainer = document.querySelector('.profile-picture-container');
        if (!profilePictureContainer) return; // Exit if the profile picture container is not found

        // Show the profile picture only if the 'About Me' section is active
        if (sectionId === 'Aboutme') {
            profilePictureContainer.style.display = 'block'; // Adjust this to your display preference
        } else {
            profilePictureContainer.style.display = 'none';
        }
    }

    // Initialize features for blogs
    initializeBlogFeatures();

    function initializeBlogFeatures() {
        document.querySelectorAll('.blog-post').forEach(blog => {
            const blogId = blog.dataset.blogId; // Assuming data-blog-id attribute is "1" or "2"
            
            // Fetch and display comments for each blog
            fetchAndDisplayComments(blogId);

            // Update like counter display (keep this functionality as is)
            updateLikeCounterDisplay(blogId);

            // Assume like functionality remains the same
            const likeButton = blog.querySelector('.like-button');
            likeButton.addEventListener('click', () => incrementLikeCounter(blogId));

            // Remove the comment form submission logic if comments are now fetched from files
            // Or adjust it according to your new requirements for handling comments
        });
    }
    function updateLikeCounterDisplay(blogId) {
        const likes = localStorage.getItem(`blog_${blogId}_likes`) || 0;
        document.querySelector(`#blog_${blogId}_likes`).textContent = likes;
    }
    function incrementLikeCounter(blogId) {
        const currentLikes = parseInt(localStorage.getItem(`blog_${blogId}_likes`) || 0);
        localStorage.setItem(`blog_${blogId}_likes`, currentLikes + 1);
        updateLikeCounterDisplay(blogId);
    }

    
});
