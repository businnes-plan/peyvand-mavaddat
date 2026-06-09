
// ========== کد نهایی و کاملاً سالم script.js ==========
document.addEventListener('DOMContentLoaded', function() {
    console.log("script.js بارگذاری شد");

    const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbxTYL01lrq8ohVkXTMOp4B8zMRlV__hcUkChv2rcruiEC-tZQVLmc3_K5fRS7Pgkno1cw/exec";

    const viewUsersBtn = document.getElementById('viewUsersBtn');
    const usersListContainer = document.getElementById('usersListContainer');
    const usersListDiv = document.getElementById('usersList');
    const closeUsersList = document.getElementById('closeUsersList');

    function loadUsers() {
        if (!usersListDiv) return;
        usersListDiv.innerHTML = '<div>در حال بارگذاری...</div>';
        if (usersListContainer) usersListContainer.style.display = 'block';

        fetch(WEB_APP_URL + '?action=getPublicUsers')
            .then(response => response.json())
            .then(data => {
                if (!data.length) {
                    usersListDiv.innerHTML = '<div>هنوز کاربری ثبت نشده است.</div>';
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
                usersListDiv.innerHTML = html;
            })
            .catch(error => {
                usersListDiv.innerHTML = '<div style="color:red;">خطا در دریافت اطلاعات</div>';
                console.error(error);
            });
    }

    if (viewUsersBtn) viewUsersBtn.addEventListener('click', loadUsers);
    if (closeUsersList) closeUsersList.addEventListener('click', () => usersListContainer.style.display = 'none');

    const adminLoginBtn = document.getElementById('adminLoginBtn');
    const adminLoginBox = document.getElementById('adminLoginBox');
    const submitAdminLogin = document.getElementById('submitAdminLogin');
    const adminPanel = document.getElementById('adminPanel');
    const adminUsersList = document.getElementById('adminUsersList');
    const closeAdminPanel = document.getElementById('closeAdminPanel');
    const adminMessage = document.getElementById('adminMessage');
    const adminPasswordInput = document.getElementById('adminPassword');

    if (adminLoginBtn) {
        adminLoginBtn.addEventListener('click', () => {
            if (adminLoginBox) adminLoginBox.style.display = 'block';
            if (adminPanel) adminPanel.style.display = 'none';
            if (adminMessage) adminMessage.innerHTML = '';
            if (adminPasswordInput) adminPasswordInput.value = '';
        });
    }

    if (submitAdminLogin) {
        submitAdminLogin.addEventListener('click', () => {
            const password = adminPasswordInput ? adminPasswordInput.value : '';
            if (!password) {
                if (adminMessage) adminMessage.innerHTML = '<span style="color:red;">لطفاً رمز را وارد کنید</span>';
                return;
            }
            if (adminMessage) adminMessage.innerHTML = '<span style="color:blue;">در حال بررسی...</span>';

            fetch(WEB_APP_URL + '?action=getAdminData&password=' + encodeURIComponent(password))
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
                        data.forEach(u => {
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
                        });
                        if (adminUsersList) adminUsersList.innerHTML = html;
                    }
                    if (adminPanel) adminPanel.style.display = 'block';
                    if (adminLoginBox) adminLoginBox.style.display = 'none';
                    if (adminMessage) adminMessage.innerHTML = '';
                })
                .catch(error => {
                    if (adminMessage) adminMessage.innerHTML = '<span style="color:red;">خطا در ارتباط با سرور</span>';
                    console.error(error);
                });
        });
    }

    if (closeAdminPanel) {
        closeAdminPanel.addEventListener('click', () => {
            if (adminPanel) adminPanel.style.display = 'none';
        });
    }

    ['phone1', 'phone2'].forEach(id => {
        const inp = document.getElementById(id);
        if (inp) {
            inp.addEventListener('input', function() {
                this.value = this.value.replace(/\D/g, '').slice(0, 11);
            });
        }
    });
});