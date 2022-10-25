const body = document.querySelector("body")

// nastavení hodnoty username cookie na určitou dobu z prompt funknce
const setCookie = (cookieName, value, exdays) => {
    // vytvoří dobu za kterou vyprší platnost cookies
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();

    // uloží všechny hodnoty a vytvoří novou položku cookies
    document.cookie = `${cookieName}=${value}; ${expires}; path=/;`;
}
  
// získání username cookie data pokud existuje
const getCookie = (cookieName) => {
    // dá všechny cookies do listu
    let allCookieArr = document.cookie.split(";");

    for(let i = 0; i < allCookieArr.length; i++) {
        // uloží do proměnné cookiePair jen název a hodnotu username
        let cookiePair = allCookieArr[i].split("=");

        if(cookieName == cookiePair[0].trim()) {
            // získá hodnotu z username 
            return decodeURIComponent(cookiePair[1]);
        }
    }

    // pokud neexistují žádné cookies pošle to null
    return null;
}

// funkce na smazání username z cookies
const deleteCookie = (cookieName) => {
    // přepíše určité cookie platnost na 0
    document.cookie = `${cookieName}=; max-age=0; path=/;`;
    // znovu načte stránku pro načtení změn
    location.reload();
}

// zkontrolování, jestli username existuje v cookies 
const checkCookie = () => {
    // získá hodnotu z username
    let username = getCookie("username");

    // toto se vykoná pokud username neexistuje
    if(username == null || username == "" || username == "null") {
        // zobrazí prompt okénko pro vyplnění hodnoty username
        username = prompt("Zadejte vaše jméno:");
        // zkontroluje zda je username z prompt správně zadán
        if (username != "" || username != null || username != "null") {
            // vytvoří nový soubor cookies 
            setCookie("username", username, 30);
        }
    // toto se vykoná pokud username existuje
    } else {
        // získá hodnotu z username a zobrazí ji, dále je tu také tlačítko na smazání username hodnoty
        body.innerHTML = 
        `
        <h1 class="yourName">Vaše jméno je ${username}</h1> 
        <button onclick="deleteCookie('username')">Smazat soubor cookies</button>
        `
    }
}
