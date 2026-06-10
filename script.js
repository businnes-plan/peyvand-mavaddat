console.log("JS Loaded");

const API_URL = "https://script.google.com/macros/s/AKfycbxMShJwEu4UseiCkOv97kgv08gzmtT673zUsZbZJMP2Re6DuxZkkGbRzcld1zg2hZfx/exec";


// =====================
// ثبت فرم
// =====================
async function submitForm() {

    const phone1Input = document.getElementById("phone1");
    const phone2Input = document.getElementById("phone2");

    if (!phone1Input) {
        alert("فیلد phone1 پیدا نشد");
        return;
    }

    const phoneRegex = /^09\d{9}$/;

    if (!phoneRegex.test(phone1Input.value)) {
        alert("شماره تماس ۱ اشتباه است");
        return;
    }

    if (
        phone2Input &&
        phone2Input.value &&
        !phoneRegex.test(phone2Input.value)
    ) {
        alert("شماره تماس ۲ اشتباه است");
        return;
    }

    const data = {
        gender: document.getElementById("gender")?.value || "",
        fullName: document.getElementById("fullName")?.value || "",
        province: document.getElementById("province")?.value || "",
        phone1: phone1Input.value,
        phone2: phone2Input ? phone2Input.value : ""
    };

    try {

        const res = await fetch(API_URL + "?action=submit", {
            method: "POST",
            body: JSON.stringify(data)
        });

        const result = await res.json();

        alert("ثبت شد ✔️");

        console.log(result);

    } catch (err) {

        console.error(err);
        alert("خطا در ارسال اطلاعات");

    }
}


// =====================
// ورود ادمین
// =====================
function adminLogin() {

    const pass = prompt("رمز ادمین:");

    if (pass === "1234") {

        localStorage.setItem("admin", "1");
        alert("ورود موفق");

    } else {

        alert("رمز اشتباه");

    }
}


// =====================
// مشاهده کاربران
// =====================
async function loadUsers() {

    if (localStorage.getItem("admin") !== "1") {

        alert("دسترسی ندارید");
        return;

    }

    try {

        const res = await fetch(API_URL + "?action=list");
        const users = await res.json();

        const box = document.getElementById("usersList");

        if (!box) {
            alert("المان usersList پیدا نشد");
            return;
        }

        box.innerHTML = "";

        users.forEach((u, i) => {

            box.innerHTML += 
                <div style="background:#eee;padding:10px;margin:5px;border-radius:8px">
                    <b>کد:</b> ${i + 1}<br>
                    <b>جنسیت:</b> ${u.gender || ""}<br>
                    <b>استان:</b> ${u.province || ""}
                </div>
            ;

        });

    } catch (err) {

        console.error(err);
        alert("خطا در دریافت کاربران");

    }
}
