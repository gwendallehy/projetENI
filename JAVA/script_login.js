const loginForm = document.getElementById("login");
loginForm.addEventListener("click", login);

async function login(event) {
    event.preventDefault();

    const emailEntree = document.getElementById("email").value;
    const passwordEntree = document.getElementById("mdp").value;
    const usersJSON = localStorage.getItem("users");

    if (usersJSON) {
        const users = JSON.parse(usersJSON);
        const utilisateur = users.find(user => user.email === emailEntree);

        if (utilisateur) {
            // 🔒 Hacher le mot de passe saisi et comparer avec le hash stocké
            const hashedPassword = await hashPassword(passwordEntree);

            if (hashedPassword === utilisateur.password) {
                console.log("Mot de passe correct ! Connexion réussie.");
                setStatus(emailEntree);
                cancel();
                window.location.href = "account.html";
            } else {
                console.log("Mot de passe incorrect !");
                alert("Email ou mot de passe incorrect !");
                cancel();
            }
        } else {
            console.log("Aucun utilisateur trouvé avec cet email.");
            alert("Aucun utilisateur trouvé avec cet email.");
            cancel();
        }
    } else {
        console.log("Aucun utilisateur enregistré dans le localStorage.");
        alert("Aucun utilisateur enregistré sur le site.");
        cancel();
    }
}
async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hashBuffer))
        .map(byte => byte.toString(16).padStart(2, '0'))
        .join('');
}

function cancel() {
    document.forms["login-user"].reset();
}

function setStatus(emailEntree) {
    let users = JSON.parse(localStorage.getItem('users')) || [];

    if (!Array.isArray(users)) {
        console.error("Les données stockées ne sont pas valides.");
        return;
    }

    let userFound = false;
    users = users.map(user => {
        if (user.email === emailEntree) {
            user.statut = "Active";
            userFound = true;
        }
        return user;
    });

    if (!userFound) {
        console.warn("Utilisateur non trouvé.");
    }

    localStorage.setItem('users', JSON.stringify(users));
    window.location.href = "account.html";
}
