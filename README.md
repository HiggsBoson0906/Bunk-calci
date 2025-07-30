 # Bunk Calci

**Bunk Calci** is a student-friendly web app designed to help keep track of attendance, manage timetables, and organize schedules effectively. It’s lightweight, responsive, and stores your data locally for quick access and persistence across sessions and pages.

## 🚀 Try It Out!

👉 **Open Bunk Calci on GitHub Pages**:  
[https://higgsboson0906.github.io/Bunk-calci/](https://higgsboson0906.github.io/Bunk-calci/)

## ✨ Features

- **Attendance Tracker**
  - Track attendance per subject with dynamic calculation based on timetable and start date.
  - Mark classes as attended, missed, or free, and see your attendance percentage.
  <img width="1919" height="985" alt="image" src="https://github.com/user-attachments/assets/c753527d-722b-4d1d-9641-923f58d8decb" />

- **Subjects Management**
  - Add, edit, and delete subjects easily.
  - Store subject start date and track attendance for each subject.
   <img width="1885" height="995" alt="image" src="https://github.com/user-attachments/assets/2d7cf601-213f-4243-a2fd-c103f406274d" />


- **Timetable Calendar**
  - Maintain a weekly timetable grid (Monday to Sunday) to visualize your subject schedule.
  - Add subjects to specific days using a modal dialog with a checklist.

- **Interactive Calendar View**
  - Integrated with the TUI Calendar library to view schedules, tasks, and events in a month or week view.
  - Supports popup creation for events.

- **Dark/Light Mode Toggle**
  - Switch instantly between dark and light themes.
  - Theme preference is saved in localStorage.

- **Persistent Local Storage**
  - All user data (subjects, attendance, timetable, theme preferences) is stored in the browser’s localStorage.
  - Data persists across sessions and pages—no backend needed.

## 🛠 Technologies Used

- **HTML5 & CSS3** (with Bootstrap 5 for responsive layout)
- **Vanilla JavaScript**
- **TUI Calendar** (for calendar UI)
- **LocalStorage API** (for data persistence)

## 📁 Project Structure

```
index.html         # Home page with welcome message and navigation
subjects.html      # Manage subjects and track attendance
timetable.html     # View and edit weekly timetable with modal editor
calendar.html      # Interactive calendar integrated with TUI Calendar
assets/            # Images, icons, and static files
styles.css         # Custom CSS styles
script.js          # Shared JavaScript (guarded, per-page logic)
```

## 🧑💻 Usage

1. **Add your subjects** on the Subjects page (with name and start date).
2. **Track your attendance** by marking classes as attended, missed, or free; attendance percentage and counts update automatically.
3. **Define your weekly timetable** on the Timetable page by adding subjects with the modal form; select days per your schedule.
4. **View your calendar** on the Calendar page with an overview of events and schedules.
5. **Switch themes** any time using the navbar toggle.
6. **All data is saved locally** and loads whenever you revisit the site.

## ⚙️ How It Works

- The `Subject` class represents each subject, with attendance and start date.
- `getTotalClasses()` dynamically calculates total classes using timetable configuration and elapsed weeks from the start date.
- The timetable is a JavaScript object (`{Monday: [...], Tuesday: [...], ...}`), saved/loaded via localStorage.
- All user interactions (add/edit subjects, mark attendance, update timetable) modify localStorage and update the UI live.
- Theme toggling updates a Bootstrap attribute and stores the choice locally.

## 📝 Considerations

- The app uses localStorage only, so data is saved **per-browser and per-domain**.
- If the browser’s site data is cleared, all information will be lost.
