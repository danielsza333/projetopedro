// Atualizar avatar
const profilePictureInput = document.getElementById('profilePicture');
if (profilePictureInput) {
    const reader = new FileReader();
    profilePictureInput.onchange = function (event) {
        const avatarImg = document.getElementById('avatarImage');
        reader.onload = function () {
            avatarImg.src = reader.result;
            document.getElementById('avatar').style.backgroundColor = 'transparent';
        };
        reader.readAsDataURL(event.target.files[0]);
    };
}

// Salvar dados e redirecionar
const submitButton = document.getElementById('submitBtn');
if (submitButton) {
    submitButton.onclick = function () {
        const username = document.getElementById('username').value;
        const age = document.getElementById('age').value;
        const gender = document.querySelector('input[name="gender"]:checked')?.value;
        const avatar = document.getElementById('avatarImage').src;

        if (username && age && gender) {
            localStorage.setItem("username", username);
            localStorage.setItem("age", age);
            localStorage.setItem("gender", gender);
            localStorage.setItem("avatar", avatar);

            window.location.href = "/perfil/perfil.html"; // Ajuste o caminho aqui
        } else {
            alert("Por favor, preencha todos os campos!");
        }
    };
}

