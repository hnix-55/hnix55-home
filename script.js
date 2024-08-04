document.addEventListener("DOMContentLoaded", function () {
    // Add fade-in effect to the current main content
    document.querySelectorAll('main').forEach(mainElement => {
        mainElement.classList.add('fade-in', 'active');
    });

    // Function to handle page transitions
    function loadPage(url) {
        fetch(url)
            .then(response => response.text())
            .then(html => {
                const newMain = document.createElement('main');
                newMain.id = 'main';
                newMain.classList.add('fade-in'); // Add fade-in class
                newMain.innerHTML = html;
                document.body.appendChild(newMain);

                // Add fade-in effect after a short delay to ensure the new content is in the DOM
                setTimeout(() => {
                    document.querySelector('main').classList.add('hidden');
                    newMain.classList.add('active');
                }, 50); // Short delay for smooth transition

                // Remove old content after the transition is complete
                setTimeout(() => {
                    document.querySelector('main.hidden')?.remove();
                }, 1050); // Ensure this matches the duration of the fade-in transition
            })
            .catch(error => console.error('Error loading page:', error));
    }

    // Handle link clicks for page transitions
    document.body.addEventListener('click', function (e) {
        const target = e.target.closest('a[data-page]');
        if (target) {
            e.preventDefault();
            const url = target.getAttribute('href');
            loadPage(url);
            history.pushState(null, '', url);
        }
    });

    // Modal functionality
    const modal = document.getElementById("modal");
    const modalImage = document.getElementById("modal-image");
    const modalDescription = document.getElementById("modal-description");
    const closeModal = document.querySelector(".close");

    document.querySelectorAll('.portfolio-item').forEach(item => {
        item.addEventListener('click', function () {
            const projectId = this.getAttribute('data-project');
            const imageUrl = `project${projectId}.jpg`;
            const descriptionText = projectId === "1" 
                ? "A web application that helps users track their daily tasks and goals. Built with React and Node.js."
                : "An e-commerce site built with Django and PostgreSQL, featuring user authentication and payment integration.";

            modalImage.src = imageUrl;
            modalDescription.textContent = descriptionText;
            modal.style.display = "block";
        });
    });

    closeModal.addEventListener('click', function () {
        modal.style.display = "none";
    });

    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    // Handle back/forward browser navigation
    window.addEventListener('popstate', function () {
        loadPage(location.href);
    });

    // Apply fade-in effect on initial page load
    document.querySelectorAll('main').forEach(mainElement => {
        mainElement.classList.add('fade-in', 'active');
    });
});
