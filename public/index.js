document.querySelectorAll('.like-btn').forEach(likeBtn => {
  likeBtn.addEventListener('click', async (event) => {
    const pictureId = event.target.dataset.pictureId;

    try {
      const response = await fetch('/pictures/like', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pictureId }),
      });

      if (response.ok) {
          console.log('Like request successful');

          // Find the corresponding like count element based on the picture ID
          const likesCount = document.querySelector(`.likes-count[data-picture-id="${pictureId}"]`);

          // Update the like count in the UI
          const currentLikes = parseInt(likesCount.textContent);
          likesCount.textContent = `${currentLikes + 1} likes`;
      } else {
          console.error('Like request failed');
      }
    } catch (error) {
      // Handle fetch errors
    }
  });
});