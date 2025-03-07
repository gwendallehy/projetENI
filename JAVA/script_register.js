window.onload = step0();

const submit = document.getElementById("register");
submit.addEventListener("click", register);

const secu = document.getElementById("mdp");
secu.addEventListener("click", security);

document.addEventListener("keyup", formOk);

async function register(event) {
    event.preventDefault();

    let nom = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("mdp").value;
    let confirmPassword = document.getElementById("mdp_confirm").value;

    console.log(nom, email, password, confirmPassword);

    if (nom.length < 3) {
        alert("Le nom d'utilisateur doit contenir au moins 3 caractères.");
        return false;
    }
    if (password.length < 6) {
        alert("Le mot de passe doit contenir au moins 6 caractères.");
        return false;
    }
    if (password !== confirmPassword) {
        alert("Les mots de passe ne correspondent pas.");
        return false;
    }
    if (security() == false) {
        return false;
    }

    // Hachage du mot de passe avant stockage
    const hashedPassword = await hashPassword(password);

    alert("Inscription réussie !");
    saveToLocal(nom, email, hashedPassword);
    cancel();
    window.location.href = "login.html";
    return true;
}

async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hashBuffer))
        .map(byte => byte.toString(16).padStart(2, '0'))
        .join('');
}

function saveToLocal(nom, email, hashedPassword) {
    const usersJSON = localStorage.getItem("users");
    let lastFiveMas = [];
    let lastFiveMem = [];

    let users = usersJSON ? JSON.parse(usersJSON) : [];

    const exists = users.some(user => user.nom === nom);
    if (exists) {
        console.log("Ce nom existe déjà.");
        return;
    }

    console.log("Ce nom est disponible.");

    users.push({
        nom: nom,
        email: email,
        password: hashedPassword, // 🔒 On stocke le mot de passe haché
        lastFiveMas: lastFiveMas,
        lastFiveMem: lastFiveMem
    });

    localStorage.setItem('users', JSON.stringify(users));
}

function cancel() {
    document.forms["register-user"].reset();
}



function security() {
    let password = document.getElementById("mdp").value;
    const caracteres = {
        majuscule: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        minuscule: "abcdefghijklmnopqrstuvwxyz",
        chiffre: "0123456789",
        special: `!"#$%&'()*+,-./`
    };
    let nbCarac = password.length;
    let minCheck = false, maxCheck = false, numCarac = false, speCarac = false;


    for (let i = 0; i < nbCarac; i++) {
        const char = password[i];
        if (!minCheck && caracteres.minuscule.includes(char)) {
            minCheck = true;
        }
        if (!maxCheck && caracteres.majuscule.includes(char)) {

            maxCheck = true;
        }
        if (!numCarac && caracteres.chiffre.includes(char)) {
            numCarac = true;
        }
        if (!speCarac && caracteres.special.includes(char)) {
            speCarac = true;
        }
    }

    let base = 0;
    if (minCheck) {
        base += 26;
    }
    if (maxCheck) {
        base += 26;
    }
    if (numCarac) {
        base += 10;
    }
    if (speCarac) {
        base += 15;
    }

    let securityValue = Math.pow(base, nbCarac);
    // Appel des fonctions en fonction de la force du mot de passe
    // Ces fonctions (step0, step1, step2, step3) devront être définies ailleurs
    if (!securityValue) {
        window.onload = step0();  // Aucune sécurité détectée (mot de passe vide ou non conforme)
    } else if (securityValue <= 62523502209) {
        // Faible sécurité
        window.onload = step1();
    } else if (securityValue >62523502209 && securityValue < 1235736291547681) {
        // Sécurité moyenne
        window.onload = step2();
    } else if (securityValue > 1235736291547681) {
        // Bonne sécurité
        window.onload = step3();
    }

}

function formOk() {
    let nameUser = document.getElementById("name").value;
    let mail = document.getElementById("email").value;
    let password = document.getElementById("mdp").value;
    let re = /\S+@\S+\.\S+/;
    

    if (nameUser.length >= 3) {
        document.getElementById("name").className = "validOk"
    } else {
        document.getElementById("name").className = "valid"
    }
    if (re.test(mail) == true) {
        document.getElementById("email").className = "validOk"
    } else {
        document.getElementById("email").className = "valid"
    }
    document.getElementById("car").className = "valid"
    document.getElementById("num").className = "valid"
    document.getElementById("sym").className = "valid"

    for (let i = 0; i < password.length; i++) {
        const char = password[i];
        console.log("char : "+char);
        const caracteres = {
            chiffre: "0123456789",
            special: `!"#$%&'()*+,-./`,
        };
        if (password.length >= 6) {
            document.getElementById("car").className = "validOk"
        } 
        if (password.length < 6) {
            document.getElementById("car").className = "valid"
        } 
        if (caracteres.chiffre.includes(char)) {
            document.getElementById("num").className = "validOk"

        }
        if (caracteres.special.includes(char)) {
            document.getElementById("sym").className = "validOk"
        }
        if (password.length >= 6 && caracteres.special.includes(char) && caracteres.chiffre.includes(char)) {
            document.getElementById("mdp").className = "validOk"
        }
    }
        
}