const API_URL = "https://script.google.com/macros/s/AKfycbxMShJwEu4UseiCkOv97kgv08gzmtT673zUsZbZJMP2Re6DuxZkkGbRzcld1zg2hZfx/exec";
// =====================
// ارسال فرم
// =====================
async function submitForm() {

    // اعتبارسنجی شماره
    const phoneRegex = /^09\d{9}$/;

    if (!phoneRegex.test(phone1.value)) {
        alert("شماره تماس ۱ اشتباه است");
        return;
    }

    if (phone2.value && !phoneRegex.test(phone2.value)) {
        alert("شماره تماس ۲ اشتباه است");
        return;
    }

    // جمع‌آوری اطلاعات
    const data = {
        gender: gender.value,
        fullName: fullName.value,

        birthYear: year.value,
        birthMonth: month.value,
        birthDay: day.value,

        height: height.value,
        weight: weight.value,

        fatherJob: fatherJob.value,
        motherJob: motherJob.value,

        skinColor: skinColor.value,
        eyeColor: eyeColor.value,
        dressType: dressType.value,

        jobType: jobType.value,
        jobDesc: jobDesc.value,

        physicalStatus: physicalStatus.value,
        smoking: smoking.value,

        familyCount: familyCount.value,
        childOrder: childOrder.value,

        province: province.value,
        county: county.value,
        village: village.value,

        phone1: phone1.value,
        phone2: phone2.value,

        traits: traits.value,
        spouseCriteria: spouseCriteria.value,

        marriageHistory: marriageHistory.value,
        acceptedProvinces: acceptedProvinces.value,

        jobPreference: jobPreference.value,
        ageGap: ageGap.value,

        educationMin: educationMin.value,
        educationSelf: educationSelf.value,

        income: income.value,
        assets: assets.value,

        description: description.value,

        eita: eita.value,
        rubika: rubika.value,
        bale: bale.value,
        soroush: soroush.value,

        contactMethod: contactMethod.value
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
        alert("خطا در ارسال اطلاعات");
    }
}


// =====================
// ورود ادمین ساده
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
// گرفتن لیست کاربران (ادمین)
// =====================
async function loadUsers() {

    if (localStorage.getItem("admin") !== "1") {
        alert("دسترسی ندارید");
        return;
    }

    const res = await fetch(API_URL + "?action=list");
    const users = await res.json();

    const box = document.getElementById("usersList");
    box.innerHTML = "";

    users.forEach((u, i) => {
        box.innerHTML += 
            <div style="background:#eee;padding:10px;margin:5px;border-radius:8px">
                <b>کد:</b> ${i + 1}<br>
                <b>جنسیت:</b> ${u.gender}<br>
                <b>استان:</b> ${u.province}
            </div>
        ;
    });
}