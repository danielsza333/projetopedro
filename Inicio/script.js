document.addEventListener('DOMContentLoaded', () => {
    const starsContainer = document.getElementById('starRating');
    const ratingMessage = document.getElementById('ratingMessage');
    const reviewText = document.getElementById('reviewText');
    const submitReviewButton = document.getElementById('submitReview');
    const reviewsList = document.getElementById('reviewsList');

    let userRating = 0; // Avaliação do usuário (de 1 a 10)

    // Cria 10 estrelas para a avaliação
    for (let i = 1; i <= 10; i++) {
        const star = document.createElement('span');
        star.classList.add('star');
        star.dataset.value = i;

        // Efeito visual ao passar o mouse
        star.addEventListener('mouseover', () => {
            updateStars(i); // Atualiza as estrelas conforme a posição do mouse
        });

        // Retorna ao valor de avaliação quando o mouse sai
        star.addEventListener('mouseout', () => {
            updateStars(userRating); // Retorna ao valor de avaliação atual
        });

        // Permite ao usuário clicar para definir a avaliação
        star.addEventListener('click', () => {
            userRating = i;
            updateStars(userRating); // Atualiza as estrelas no clique
            ratingMessage.textContent = `Você avaliou com ${userRating} estrelas`;
        });

        starsContainer.appendChild(star);
    }

    // Função para atualizar as estrelas
    function updateStars(rating) {
        const stars = document.querySelectorAll('.star');
        stars.forEach(star => {
            const starValue = parseFloat(star.dataset.value);
            if (starValue <= rating) {
                star.classList.add('filled');
            } else {
                star.classList.remove('filled');
            }
        });
    }

    // Recuperar e renderizar as resenhas do localStorage
    const savedReviews = JSON.parse(localStorage.getItem('reviews')) || [];

    function renderReviews() {
        reviewsList.innerHTML = '';
        savedReviews.forEach(review => {
            const reviewItem = document.createElement('div');
            reviewItem.classList.add('review-item');
            reviewItem.innerHTML = `
                <div class="review-author">Avaliação: ${review.rating}/10</div>
                <div class="review-text">${review.text}</div>
            `;
            reviewsList.appendChild(reviewItem);
        });
    }

    renderReviews();

    // Enviar nova resenha
    submitReviewButton.addEventListener('click', () => {
        if (reviewText.value && userRating) {
            const newReview = {
                rating: userRating,
                text: reviewText.value
            };
            savedReviews.push(newReview);
            localStorage.setItem('reviews', JSON.stringify(savedReviews));
            reviewText.value = ''; // Limpa o campo de texto após enviar
            renderReviews(); // Atualiza as resenhas
        }
    });
});
