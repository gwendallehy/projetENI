init();
function init() {
    let profil = document.getElementsByClassName("profile")

    let users = JSON.parse(localStorage.getItem('users')) || [];
    users = users.map(user => {
        if (user.statut == "Active") {
            score(user.lastFiveMas)
            score2(user.lastFiveMem)
            profile()
            console.log("LE LOG " + user.statut, user.name);
        }
        // if (user.statut == null) {
        //     notProf()
        // }
    });

}

function score(liste) {
    console.log("bien ds fonction");
    let scorePrint = document.getElementById("scoretableMas")
    if (liste) {
        console.log("bien ds fonction 2");
        for (let i = 4; i > -1; i--) {
            let indice = liste[i]
            if (indice != undefined) {
                scorePrint.insertAdjacentHTML("afterend",
                    `<tr>
                    <th scope="row">`+ (i + 1) + `</th>
                    <td>`+ indice + `</td>
                </tr>`)
            }
        }
    }
}

function score2(liste) {
    console.log("bien ds fonction");
    let scorePrint = document.getElementById("scoretableMem")
    if (liste) {
        console.log("bien ds fonction 2");
        for (let i = 4; i > -1; i--) {
            let indice = liste[i]
            if (indice != undefined) {
                scorePrint.insertAdjacentHTML("afterend",
                    `<tr>
                    <th scope="row">`+ (i + 1) + `</th>
                    <td>`+ indice + `</td>
                </tr>`)
            }
        }
    }
}

function profile() {
    let profil = document.getElementsByClassName("profile")
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users = users.map(user => {
        if (user.statut == "Active") {
            let profils = document.getElementsByClassName("profile");

            Array.from(profils).forEach(profil => {
                profil.insertAdjacentHTML("afterbegin",
                    `<div class="info">Votre nom</div>
                    <div class="userInfo">${user.nom}</div>
                    <div class="info">Votre adresse mail</div>
                    <div class="userInfo">${user.email}</div>`
                );
            });
        }
    });
}


function notProf() {
    document.getElementById('profile').style.display = 'none';
    // window.location.href = "login.html";
}