
document.addEventListener('DOMContentLoaded', function () {
    // مدیریت فیلدهای شرطی
    const physicalStatus = document.getElementById('physicalStatus');
    const disabilityContainer = document.getElementById('disabilityContainer');
    if (physicalStatus) {
        physicalStatus.addEventListener('change', function () {
            if (this.value === 'معلول') disabilityContainer.classList.remove('hidden');
            else disabilityContainer.classList.add('hidden');
        });
    }

    const marriageHistory = document.getElementById('marriageHistory');
    const marriageDetailsContainer = document.getElementById('marriageDetailsContainer');
    if (marriageHistory) {
        marriageHistory.addEventListener('change', function () {
            if (this.value !== 'مجرد و بدون سابقه ازدواج' && this.value !== '')
                marriageDetailsContainer.classList.remove('hidden');
            else marriageDetailsContainer.classList.add('hidden');
        });
    }

    // تبدیل تاریخ شمسی به میلادی (برای محاسبه سن)
    function convertPersianToGregorian(year, month, day) {
        let gYear = parseInt(year) - 621;
        let gMonth = parseInt(month) + 3;
        let gDay = parseInt(day) + 20;
        if (gMonth > 12) {
            gYear++;
            gMonth -= 12;
        }
        return new Date(gYear, gMonth - 1, gDay);
    }

    function calculateAge(year, month, day) {
        if (!year || !month || !day) return null;
        const birth = convertPersianToGregorian(year, month, day);
        const today = new Date();
        let age = today.getFullYear() - birth.getFullYear();
        const m = today.getMonth() - birth.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
        return age;
    }

    function validatePhone(phone) {
        return /^09[0-9]{9}$/.test(phone);
    }

    function getFormData() {
        return {
            gender: document.getElementById('gender')?.value || '',
            firstName: document.getElementById('firstName')?.value.trim() || '',
            lastName: document.getElementById('lastName')?.value.trim() || '',
            birthYear: document.getElementById('birthYear')?.value || '',
            birthMonth: document.getElementById('birthMonth')?.value || '',
            birthDay: document.getElementById('birthDay')?.value || '',
            height: document.getElementById('height')?.value || '',
            weight: document.getElementById('weight')?.value || '',
            fatherJob: document.getElementById('fatherJob')?.value.trim() || '',
            motherJob: document.getElementById('motherJob')?.value.trim() || '',
            skinColor: document.getElementById('skinColor')?.value || '',
            eyeColor: document.getElementById('eyeColor')?.value || '',
            dressCode: document.getElementById('dressCode')?.value || '',
            jobType: document.getElementById('jobType')?.value || '',
            jobDescription: document.getElementById('jobDescription')?.value.trim() || '',
            physicalStatus: document.getElementById('physicalStatus')?.value || '',
            disabilityDesc: document.getElementById('disabilityDesc')?.value.trim() || '',
            smoking: document.getElementById('smoking')?.value || '',
            familyCount: document.getElementById('familyCount')?.value || '',
            childOrder: document.getElementById('childOrder')?.value || '',
            province: document.getElementById('province')?.value.trim() || '',
            city: document.getElementById('city')?.value.trim() || '',
            village: document.getElementById('village')?.value.trim() || '',
            phone1: document.getElementById('phone1')?.value.trim() || '',
            phone2: document.getElementById('phone2')?.value.trim() || '',
moralFeatures: document.getElementById('moralFeatures')?.value.trim() || '',
            spouseCriteria: document.getElementById('spouseCriteria')?.value.trim() || '',
            marriageHistory: document.getElementById('marriageHistory')?.value || '',
            marriageDetails: document.getElementById('marriageDetails')?.value.trim() || '',
            acceptedProvinces: document.getElementById('acceptedProvinces')?.value.trim() || '',
            acceptedJobs: document.getElementById('acceptedJobs')?.value || '',
            ageDifference: document.getElementById('ageDifference')?.value || '',
            minEducation: document.getElementById('minEducation')?.value || '',
            educationStatus: document.getElementById('educationStatus')?.value || '',
            monthlyIncome: document.getElementById('monthlyIncome')?.value.trim() || '',
            hasHouse: document.getElementById('hasHouse')?.value || '',
            hasCar: document.getElementById('hasCar')?.value || '',
            additionalNotes: document.getElementById('additionalNotes')?.value.trim() || '',
            eitaaId: document.getElementById('eitaaId')?.value.trim() || '',
            baleId: document.getElementById('baleId')?.value.trim() || '',
            soroushId: document.getElementById('soroushId')?.value.trim() || '',
            rubikaId: document.getElementById('rubikaId')?.value.trim() || '',
            contactMethod: document.getElementById('contactMethod')?.value || ''
        };
    }

    function showMessage(msg, isError = false) {
        const div = document.getElementById('formMessage');
        div.textContent = msg;
        div.className = message-area ${isError ? 'error' : 'success'};
        setTimeout(() => {
            div.className = 'message-area';
            div.textContent = '';
        }, 5000);
    }

    function showPreview(data) {
        const previewDiv = document.getElementById('previewData');
        const age = calculateAge(data.birthYear, data.birthMonth, data.birthDay);
        previewDiv.innerHTML = 
            <h3>📋 خلاصه اطلاعات ثبت شده</h3>
            <p>👤 نام: ${data.firstName} ${data.lastName}</p>
            <p>🧑 جنسیت: ${data.gender}</p>
            <p>🎂 تاریخ تولد: ${data.birthYear}/${data.birthMonth}/${data.birthDay} ${age ? (سن: ${age} سال) : ''}</p>
            <p>📞 شماره تماس: ${data.phone1} ${data.phone2 ? و ${data.phone2} : ''}</p>
            <p>🆔 آیدی ایتا: ${data.eitaaId}</p>
        ;
        previewDiv.style.display = 'block';
    }

    const WEB_APP_URL = "https://script.google.com/macros/s/TOKEN_AT/exec"; // ← لینک خودتو اینجا بذار

    function submitFormData(formData) {
        const age = calculateAge(formData.birthYear, formData.birthMonth, formData.birthDay);
        if (age < 18) return showMessage('❌ سن باید حداقل ۱۸ سال باشد!', true);
        if (!validatePhone(formData.phone1)) return showMessage('❌ شماره تماس اول صحیح نیست', true);
        if (!formData.eitaaId) return showMessage('❌ آیدی ایتا الزامی است', true);
        
        fetch(WEB_APP_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({ action: 'saveUserData', data: JSON.stringify(formData) })
        }).then(() => {
            showMessage('✅ اطلاعات شما با موفقیت ثبت شد!', false);
            document.getElementById('userInfoForm').reset();
        }).catch(() => showMessage('❌ خطا در ارتباط با سرور', true));
        
        showPreview(formData);
        return true;
    }

    document.getElementById('userInfoForm')?.addEventListener('submit', function (e) {
        e.preventDefault();
        submitFormData(getFormData());
    });

    // نمایش لیست کاربران
    const viewBtn = document.getElementById('viewUsersBtn');
    const listContainer = document.getElementById('usersListContainer');
    const usersDiv = document.getElementById('usersList');
    const closeBtn = document.getElementById('closeUsersList');
function loadUsers() {
        usersDiv.innerHTML = '<div>در حال بارگذاری...</div>';
        listContainer.style.display = 'block';
        fetch(${WEB_APP_URL}?action=getPublicUsers)
            .then(res => res.json())
            .then(data => {
                if (!data.length) {
                    usersDiv.innerHTML = '<div>هنوز کاربری ثبت نشده است.</div>';
                    return;
                }
                let html = '';
                data.forEach(u => {
                    let age = 'نامشخص';
                    if (u.birthYear && u.birthYear > 1300) {
                        let a = new Date().getFullYear() - 1379 - (u.birthYear - 1379);
                        if (a >= 18) age = a + ' سال';
                    }
                    html += 
                        <div class="user-card">
                            <div class="user-code">🔹 ${u.code || 'کاربر'}</div>
                            <p>🧑 جنسیت: ${u.gender || '-'}</p>
                            <p>🎂 سن: ${age}</p>
                            <p>📍 شهر: ${u.city || '-'}</p>
                        </div>
                    ;
                });
                usersDiv.innerHTML = html;
            })
            .catch(() => usersDiv.innerHTML = '<div style="color:red;">خطا در دریافت اطلاعات</div>');
    }

    viewBtn?.addEventListener('click', loadUsers);
    closeBtn?.addEventListener('click', () => listContainer.style.display = 'none');

    // شماره تماس فقط عدد
    ['phone1', 'phone2'].forEach(id => {
        const inp = document.getElementById(id);
        inp?.addEventListener('input', function () {
            this.value = this.value.replace(/\D/g, '').slice(0, 11);
        });
    });
});