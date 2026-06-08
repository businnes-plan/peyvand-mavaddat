
document.addEventListener('DOMContentLoaded', function () {
    // ========== مدیریت فیلدهای شرطی ==========
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

    // ========== توابع کمکی ==========
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

    // ========== دریافت اطلاعات فرم ==========
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

    // ========== لینک Web App (این رو با لینک خودت جایگزین کن) ==========
    const WEB_APP_URL = "https://script.google.com/macros/s/YOUR_TOKEN/exec";

    // ========== ثبت اطلاعات ==========
    function submitFormData(formData) {
        const age = calculateAge(formData.birthYear, formData.birthMonth, formData.birthDay);
        if (age < 18) return showMessage('❌ سن باید حداقل ۱۸ سال باشد!', true);
        if (!validatePhone(formData.phone1)) return showMessage('❌ شماره تماس اول صحیح نیست', true);
        if (!formData.eitaaId) return showMessage('❌ آیدی ایتا الزامی است', true);
        
        fetch(WEB_APP_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({ data: JSON.stringify(formData) })
        }).then(() => {
            showMessage('✅ اطلاعات شما با موفقیت ثبت شد!', false);
            document.getElementById('userInfoForm').reset();
            document.getElementById('previewData').style.display = 'none';
        }).catch(() => showMessage('❌ خطا در ارتباط با سرور', true));
        
        showPreview(formData);
        return true;
    }

    document.getElementById('userInfoForm')?.addEventListener('submit', function (e) {
        e.preventDefault();
        submitFormData(getFormData());
    });
// ========== نمایش لیست کاربران برای عموم ==========
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

    // ========== پنل ادمین ==========
    const adminLoginBtn = document.getElementById('adminLoginBtn');
    const adminLoginBox = document.getElementById('adminLoginBox');
    const submitAdminLogin = document.getElementById('submitAdminLogin');
    const adminPanel = document.getElementById('adminPanel');
    const adminUsersList = document.getElementById('adminUsersList');
    const closeAdminPanel = document.getElementById('closeAdminPanel');
    const adminMessage = document.getElementById('adminMessage');
    const adminPasswordInput = document.getElementById('adminPassword');

    if (adminLoginBtn) {
        adminLoginBtn.addEventListener('click', function() {
            adminLoginBox.style.display = 'block';
            adminPanel.style.display = 'none';
            if (adminMessage) adminMessage.innerHTML = '';
            if (adminPasswordInput) adminPasswordInput.value = '';
        });
    }

    if (submitAdminLogin) {
        submitAdminLogin.addEventListener('click', function() {
            const password = adminPasswordInput.value;
            if (!password) {
                if (adminMessage) adminMessage.innerHTML = '<span style="color:red;">لطفاً رمز را وارد کنید</span>';
                return;
            }
            
            if (adminMessage) adminMessage.innerHTML = '<span style="color:blue;">در حال بررسی...</span>';
            
            fetch(${WEB_APP_URL}?action=getAdminData&password=${encodeURIComponent(password)})
                .then(response => response.json())
                .then(data => {
                    if (data.error) {
                        if (adminMessage) adminMessage.innerHTML = '<span style="color:red;">' + data.error + '</span>';
                        if (adminPanel) adminPanel.style.display = 'none';
                        return;
                    }
                    
                    if (!data.length) {
                        if (adminUsersList) adminUsersList.innerHTML = '<div>هیچ کاربری ثبت نشده است</div>';
} else {
                        let html = '';
                        for (let i = 0; i < data.length; i++) {
                            const u = data[i];
                            html += 
                                <div class="user-card">
                                    <div class="user-code">🔹 ${u.code || 'کاربر'}</div>
                                    <p>👤 اسم: ${u.firstName || '-'} ${u.lastName || '-'}</p>
                                    <p>🧑 جنسیت: ${u.gender || '-'}</p>
                                    <p>📍 شهر: ${u.city || '-'}</p>
                                    <p>📞 شماره تماس ۱: ${u.phone1 || '-'}</p>
                                    <p>📞 شماره تماس ۲: ${u.phone2 || '-'}</p>
                                    <p>🆔 ایتا: ${u.eitaaId || '-'}</p>
                                </div>
                            ;
                        }
                        if (adminUsersList) adminUsersList.innerHTML = html;
                    }
                    if (adminPanel) adminPanel.style.display = 'block';
                    if (adminLoginBox) adminLoginBox.style.display = 'none';
                    if (adminMessage) adminMessage.innerHTML = '';
                })
                .catch(error => {
                    if (adminMessage) adminMessage.innerHTML = '<span style="color:red;">خطا در ارتباط با سرور</span>';
                    console.error('Error:', error);
                });
        });
    }

    if (closeAdminPanel) {
        closeAdminPanel.addEventListener('click', function() {
            if (adminPanel) adminPanel.style.display = 'none';
        });
    }

    // ========== شماره تماس فقط عدد ==========
    ['phone1', 'phone2'].forEach(id => {
        const inp = document.getElementById(id);
        inp?.addEventListener('input', function () {
            this.value = this.value.replace(/\D/g, '').slice(0, 11);
        });
    });
});