console.log("JS Loaded");

const API_URL = "https://script.google.com/macros/s/AKfycbxMShJwEu4UseiCkOv97kgv08gzmtT673zUsZbZJMP2Re6DuxZkkGbRzcld1zg2hZfx/exec";

async function submitForm() {

    const phoneRegex = /^09\d{9}$/;

    if (!phoneRegex.test(phone1.value)) {
        alert("شماره تماس ۱ اشتباه است");
        return;
    }

    if (phone2.value && !phoneRegex.test(phone2.value)) {
        alert("شماره تماس ۲ اشتباه است");
        return;
    }

    const data = {
        gender: gender.value,
        fullName: fullName.value,
        province: province.value
    };

    try {
        const res = await fetch(API_URL + "?action=submit", {
            method: "POST",
            body: JSON.stringify(data)
        });

        const result = await res.json();
        alert("ثبت شد ✔ کد: " + result.code);

    } catch (err) {
        console.error(err);
        alert("خطا");
    }
}

function adminLogin(){
    const pass = prompt("رمز:");
    if(pass === "1234"){
        localStorage.setItem("admin","1");
        alert("OK");
    }
}

async function loadUsers(){

    if(localStorage.getItem("admin") !== "1"){
        alert("No access");
        return;
    }

    const res = await fetch(API_URL + "?action=list");
    const users = await res.json();

    const box = document.getElementById("usersList");
    box.innerHTML = "";

    users.forEach((u,i)=>{
        box.innerHTML += 
            <div>
                ${u.gender} - ${u.province}
            </div>
        ;
    });
}
