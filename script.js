//date
var currentDate = new Date();
document.addEventListener('DOMContentLoaded', function () {
    var dateElement = document.querySelector('#current-date');
    if (dateElement) {
        var options = { year: 'numeric', month: 'long', day: 'numeric' };
        dateElement.textContent = currentDate.toLocaleDateString('en-US', options);
    }
});
//theme toggle
document.addEventListener('DOMContentLoaded', function () {
    const toggleBtn = document.querySelector('#toggle');
    if (toggleBtn) {
        const body = document.querySelector('body');
        toggleBtn.addEventListener('click', function () {
            const currentTheme = body.getAttribute('data-bs-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            localStorage.setItem('theme', newTheme);
            body.setAttribute('data-bs-theme', newTheme);
            if (newTheme === 'dark') {
                toggleBtn.innerHTML = '<img src="assets/moon.svg" alt="Dark Mode">';
                toggleBtn.className = 'btn btn-dark';
            } else {
                toggleBtn.innerHTML = '<img src="assets/sun.svg" height="30px" alt="Light Mode">';
                toggleBtn.className = 'btn btn-light';
            }
        });
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            body.setAttribute('data-bs-theme', savedTheme);
            if (savedTheme === 'dark') {
                toggleBtn.innerHTML = '<img src="assets/moon.svg" alt="Dark Mode">';
                toggleBtn.className = 'btn btn-dark';
            } else {
                toggleBtn.innerHTML = '<img src="assets/sun.svg" height="30px" alt="Light Mode">';
                toggleBtn.className = 'btn btn-light';
            }
        }
    }















    //subject page
    const subjectGrid = document.querySelector('#subject-grid');
    const form = document.querySelector('#add-subject-form');
    const subjectmodal = document.getElementById('addsubjectmodal');
    class Subject {
        constructor(name, startdate) {
            this.startdate = new Date(startdate);
            this.name = name;
            this.attended = 0;
            this.extraclasses = 0;
        }
        getTotalClasses() {
            const timetable = getTimetableData();
            let oneweekclasses = 0;
            const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            for (const day of days) {
                if (timetable[day].findIndex(sub => sub === this.name) !== -1) {
                    oneweekclasses++;
                }
            }

            const startDate = new Date(this.startdate);
            //no of weeks since start date
            const weeksSinceStart = Math.floor((currentDate - startDate) / (1000 * 60 * 60 * 24 * 7));
            const remainder = ((currentDate - startDate) % (1000 * 60 * 60 * 24 * 7)) / (1000 * 60 * 60 * 24);
            let startday = startDate.getDay();
            let extra = 0;
            for (let i = 0; i <= remainder; i++) {
                const dayIndex = (startday + i) % 7;
                const dayName = days[dayIndex];
                if (timetable[dayName] && timetable[dayName].includes(this.name)) {
                    extra++;
                }
            }


            return (oneweekclasses * weeksSinceStart) + extra;
        }
        leftbunks() {
            const totalclasses = this.getTotalClasses() + this.extraclasses;
            const leftbunks = Math.floor(this.attended * 4 / 3 - totalclasses);
            if (leftbunks <= 0) {
                const need = 3 * totalclasses - 4 * this.attended;
                if (need <= 0) {
                    return ["You need to attend the next class 🥲", "#f1e20dff"];
                }
                return [`You need to attend ${need} more class${need == 1 ? '' : 'es'}😭`, "#f10d3b"];
            }
            return [`Hell yeah!! you can bunk ${leftbunks == 1 ? 'next class' : `${leftbunks} classes`}🥳`, "#0df12bff"];
        }
    }
    function getSubjects() {
        const data = localStorage.getItem('subjects');
        if (data) {
            return JSON.parse(data).map(obj => Object.assign(new Subject(), obj));
        }
        return [];
    }

    function saveSubjects(subjects) {
        localStorage.setItem('subjects', JSON.stringify(subjects));
    }
    if (subjectGrid && form && subjectmodal) {


        // Render subjects cards
        function renderSubjects() {
            const subjects = getSubjects();
            subjectGrid.innerHTML = '';
            subjects.forEach((sub, idx) => {
                let totalclasses = sub.getTotalClasses() + sub.extraclasses;
                let percent = (totalclasses > 0) ? ((sub.attended / totalclasses) * 100).toFixed(2) : '0.00';
                let [stringleft, colorstring] = sub.leftbunks();
                const card = document.createElement('div');
                card.classList.add('col', 'mb-4');
                card.innerHTML = `
            <div class="card shadow h-100 rounded-3 bg-transparent">
            <div style="height: 100px;">
    <img src="assets/header1.jpeg" class="w-100 h-100 object-fit-cover" style="border-radius:8px" alt="header">
  </div>
                <div class="card-body">
                <div class="d-flex justify-content-between align-items-center mb-5">
                    <h5 class="card-title">${sub.name}</h5>
                    <div>
                    <button class="btn btn-danger btn-sm" data-idx="${idx}" data-action="delete"><img src="assets/trash.svg" alt="delete"></button>
                    <button class="btn btn-info btn-sm" data-idx="${idx}" data-action="undo"><img src="assets/undo.svg" alt="undo"></button>
                    </div>
                </div>
                <div class="flex-col mt-5 mb-4">
                    <p class="card-text merriweather-font">Attendance: ${percent}% / 75.00%</p>
                    <p class="card-text merriweather-font" style="font-size: 0.8rem;">Attended: ${sub.attended} | Total: ${totalclasses}</p>
                    <p class="card-text playwrite-au-qld-LOGO" style="color:${colorstring}">${stringleft}</p>
                </div>
                <div class="mt-5">
                    <button class="btn btn-success btn-sm" data-idx="${idx}" data-action="attend">Attended</button>
                    <button class="btn btn-primary btn-sm" data-idx="${idx}" data-action="extra">Extra class</button>
                    <button class="btn btn-secondary btn-sm" data-idx="${idx}" data-action="free">No class</button>
                    <button class="btn btn-warning btn-sm" data-idx="${idx}" data-action="twoclass">Double class</button>
                </div>
                </div>
            </div>
            `;
                subjectGrid.appendChild(card);
            });
        }

        // Initial render
        renderSubjects();

        // Handle form submission to add new subject
        const subjectform = document.querySelector('#add-subject-form');
        if (subjectform) {
            subjectform.addEventListener('submit', function (event) {
                event.preventDefault();
                const subjectName = document.querySelector('#subjectname').value.trim();
                const startDate = document.querySelector('#startdate').value;
                if (!subjectName || !startDate) return; // simple validation

                let subjects = getSubjects();
                subjects.push(new Subject(subjectName, startDate));
                saveSubjects(subjects);

                let modalInstance = bootstrap.Modal.getInstance(subjectmodal);
                if (!modalInstance) {
                    modalInstance = new bootstrap.Modal(subjectmodal);
                }
                modalInstance.hide();
                subjectform.reset();

                renderSubjects();
            });
        }
        // Handle clicks on subject grid buttons
        subjectGrid.addEventListener('click', function (e) {
            const btn = e.target.closest('button[data-action]');
            if (!btn) return;
            const idx = parseInt(btn.dataset.idx, 10);
            const action = btn.dataset.action;
            let subjects = getSubjects();

            switch (action) {
                case 'attend':
                    subjects[idx].attended++;
                    break;
                case 'extra':
                    subjects[idx].extraclasses++;
                    break;
                case 'undo':
                    if (subjects[idx].attended > 0) subjects[idx].attended--;
                    if (subjects[idx].extraclasses > 0) subjects[idx].extraclasses--;
                    if (subjects[idx].extraclasses < 0) subjects[idx].extraclasses++;
                    break;
                case 'free':
                    subjects[idx].extraclasses--;
                    break;
                case 'delete':
                    subjects.splice(idx, 1);
                    break;
                case 'twoclass':
                    subjects[idx].extraclasses++;
                    subjects[idx].attended++;
                    break;
            }
            saveSubjects(subjects);
            renderSubjects();
        });
    }












    // calendar page
    const calendar = document.getElementById('calendar');

    if (calendar && typeof tui !== 'undefined') {
        calendar.style.height = 'calc(100vh - 100px)'; // Adjust height to fit the viewport
        calendar.style.backgroundColor = '#fbaa07'; // Set a light background color for better visibility
        // Initialize TUI calendar only on calendar page
        var tuicalendar = new tui.Calendar('#calendar', {
            defaultView: 'month',
            taskView: true,
            scheduleView: true,

        });
    }













    //timetable page
    let timetableData = {
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
        Saturday: [],
        Sunday: []
    };
    function getTimetableData() {
        const data = localStorage.getItem('timetable');
        if (data) {
            return JSON.parse(data);
        }
        return {
            Monday: [],
            Tuesday: [],
            Wednesday: [],
            Thursday: [],
            Friday: [],
            Saturday: [],
            Sunday: []
        }
    }
    function saveTimetableData(data) {
        localStorage.setItem('timetable', JSON.stringify(data));
    }
    function renderTimetable() {
        const timetable = getTimetableData();
        const tbody = document.getElementById('timetable-body');
        if (!tbody) return;

        tbody.innerHTML = ''; // Clear previous timetable rows

        const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        const maxSlots = Math.max(...days.map(day => timetable[day]?.length || 0));

        for (let slot = 0; slot < maxSlots; slot++) {
            const tr = document.createElement('tr');
            days.forEach(day => {
                const td = document.createElement('td');
                td.classList.add('text-center', 'align-middle');
                td.style.height = "80px"

                // Get subject for the slot or empty string if none
                const subject = timetable[day] && timetable[day][slot] ? timetable[day][slot] : '';

                td.textContent = subject;
                tr.appendChild(td);
            });
            tbody.appendChild(tr);
        }

        // If no slots, show a row of empty cells with placeholder
        if (maxSlots === 0) {
            const tr = document.createElement('tr');
            days.forEach(() => {
                const td = document.createElement('td');
                td.classList.add('text-center', 'align-middle');
                td.textContent = '-';
                tr.appendChild(td);
            });
            tbody.appendChild(tr);
        }
    }

    function renderchecklist() {
        const subjectListContainer = document.querySelector('#checkboxlist');
        if (!subjectListContainer) return;
        const subjects = getSubjects();
        if (subjects.length === 0) {
            subjectListContainer.innerHTML = '<p class="text-center">No subjects added yet!</p>';
            return;
        }     // Clear existing content
        subjectListContainer.innerHTML = '';
        subjects.forEach((sub, idx) => {
            const checkboxId = `subject-checkbox-${idx}`;

            const wrapper = document.createElement('div');
            wrapper.classList.add('form-check');

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'form-check-input';
            checkbox.id = checkboxId;
            checkbox.value = sub.name;

            const label = document.createElement('label');
            label.className = 'form-check-label';
            label.setAttribute('for', checkboxId);
            label.textContent = sub.name;

            wrapper.appendChild(checkbox);
            wrapper.appendChild(label);

            subjectListContainer.appendChild(wrapper);
        });
    }
    const timetableModalEl = document.getElementById('addtimetablemodal');
    if (timetableModalEl) {
        timetableModalEl.addEventListener('show.bs.modal', function () {
            renderchecklist();
        });
    }
    const timetableform = document.querySelector('#add-timetable-form');
    if (timetableform) {
        timetableform.addEventListener('submit', function (event) {
            event.preventDefault();
            const selectedday = document.querySelector('#day-select').value;
            const subjectCheckboxes = document.querySelectorAll('#checkboxlist input[type="checkbox"]:checked');
            if (!selectedday) {
                alert('Please select a day.');
                return;
            }
            const subjects = Array.from(subjectCheckboxes).map(checkbox => checkbox.value);
            let timetable = getTimetableData();
            if (!timetable[selectedday]) {
                timetable[selectedday] = [];
            }
            timetable[selectedday] = subjects;
            saveTimetableData(timetable);
            let modalInstance = bootstrap.Modal.getInstance(timetableModalEl);
            if (!modalInstance) {
                modalInstance = new bootstrap.Modal(timetableModalEl);
            }
            modalInstance.hide();
            timetableform.reset();
            renderTimetable();
        });
        renderTimetable();
    }






    //home page
    const timetable = getTimetableData();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDay = currentDate.getDay();
    const homepagegrid = document.querySelector('#home-grid');
    if (homepagegrid) {
        if (timetable[days[currentDay]].length > 0) {
            document.querySelector('#noclasstoday').classList.add('hidden');
            document.querySelector('#classtoday').classList.remove('hidden');
            function renderhomepage() {
                homepagegrid.innerHTML = '';




                const subject = getSubjects();
                for (subj of timetable[days[currentDay]]) {
                    const sub = subject.find(s => s.name === subj);// Find the subject object by name
                    const idx = subject.indexOf(sub);

                    if (sub) {
                        let totalclasses = sub.getTotalClasses() + sub.extraclasses;
                        let percent = (totalclasses > 0) ? ((sub.attended / totalclasses) * 100).toFixed(2) : '0.00';
                        let [stringleft, colorstring] = sub.leftbunks();
                        const card = document.createElement('div');
                        card.classList.add('col', 'mb-4');
                        card.innerHTML = `
            <div class="card shadow h-100 rounded-3 bg-transparent">
            <div style="height: 100 px;">
    <img src="assets/header1.jpeg" class="w-100 h-100 object-fit-cover" style="border-radius:8px 8px 0px 0px" alt="header">
  </div>
                <div class="card-body">
                <div class="d-flex justify-content-between align-items-center mb-5">
                    <h5 class="card-title">${sub.name}</h5>
                    <div>   
                    <button class="btn btn-info btn-sm" data-idx="${idx}" data-action="undo"><img src="assets/undo.svg" alt="undo"></button>
                    </div>
                </div>
                <div class="flex-col mt-5 mb-4">
                    <p class="card-text merriweather-font">Attendance: ${percent}% / 75.00%</p>
                    <p class="card-text merriweather-font" style="font-size: 0.8rem;">Attended: ${sub.attended} | Total: ${totalclasses}</p>
                    <p class="card-text playwrite-au-qld-LOGO" style="color:${colorstring}">${stringleft}</p>
                </div>
                <div class="mt-5">
                    <button class="btn btn-success btn-sm" data-idx="${idx}" data-action="attend">Attended</button>
                    <button class="btn btn-primary btn-sm" data-idx="${idx}" data-action="extra">Extra class</button>
                    <button class="btn btn-secondary btn-sm" data-idx="${idx}" data-action="free">No class</button>
                    <button class="btn btn-warning btn-sm" data-idx="${idx}" data-action="twoclass">Double class</button>
                </div>
                </div>
            </div>
            `;
                        homepagegrid.appendChild(card);
                    }
                }

            }
            renderhomepage();
        }

        homepagegrid.addEventListener('click', function (e) {
            const btn = e.target.closest('button[data-action]');
            if (!btn) return;
            const idx = parseInt(btn.dataset.idx, 10);
            const action = btn.dataset.action;
            let subjects = getSubjects();

            switch (action) {
                case 'attend':
                    subjects[idx].attended++;
                    break;
                case 'extra':
                    subjects[idx].extraclasses++;
                    break;
                case 'undo':
                    if (subjects[idx].attended > 0) subjects[idx].attended--;
                    if (subjects[idx].extraclasses > 0) subjects[idx].extraclasses--;
                    if (subjects[idx].extraclasses < 0) subjects[idx].extraclasses++;
                    break;
                case 'free':
                    subjects[idx].extraclasses--;
                    break;
                case 'twoclass':
                    subjects[idx].extraclasses++;
                    subjects[idx].attended++;
                    break;
            }
            saveSubjects(subjects);
            renderhomepage();
        });

    }

});
