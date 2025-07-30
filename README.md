Bunk Calci
Bunk Calci is a student-friendly web app designed to help keep track of attendance, manage timetables, and organize schedules effectively. It’s lightweight, responsive, and stores your data locally for quick access and persistence across sessions and pages.

🌐 Live Demo:
Visit the running site here:
Try It Out!
👉 Open Bunk Calci on GitHub Pages

Features
Attendance Tracker
Track your attendance per subject with dynamic calculation of total classes based on timetable and start date. Mark classes as attended, missed, or free, and see your attendance percentage.

Subjects Management
Add, edit, and delete subjects easily. Store subject start date and track attendance specifically per subject.

Timetable Calendar
Maintain a weekly timetable grid (Monday to Sunday) to visualize your subject schedule. Add subjects to specific days using a modal dialog with a checklist.

Interactive Calendar View
Integrated with the TUI Calendar library to view schedules, tasks, and events in a month or week view with creation popup enabled.

Dark/Light Mode Toggle
Switch between dark and light themes, with your preference saved in localStorage.

Persistent Local Storage
All user data (subjects, attendance, timetable, theme preferences) is stored in the browser's localStorage to maintain state across sessions and pages without a backend.


Technologies Used
HTML5, CSS3, Bootstrap 5

Vanilla JavaScript

TUI Calendar for rich calendar UI

LocalStorage API for data persistence

Project Structure
index.html - Home page with welcome message and navigation

subjects.html - Manage subjects and track attendance

timetable.html - View and edit weekly timetable with modal editor

calendar.html - Interactive calendar integrated with TUI Calendar

assets/ - Contains images, icons, and other static files

styles.css - Custom CSS styles

script.js - Shared JavaScript handling all pages with guarded execution blocks

Usage
Add your subjects on the Subjects page, specifying the name and start date.

Track your attendance by marking classes as attended, missed, or free. The percentage and counts automatically update.

Define your weekly timetable on the Timetable page by adding subjects using the modal form, selecting days as per your schedule.

View your calendar on the Calendar page with an overview of events and schedules.

Switch themes anytime using the toggle button available in the navbar.

All data is saved locally and loaded whenever you revisit the site.

How It Works
The Subject class represents each subject with attendance and start date.

getTotalClasses() dynamically calculates total classes based on weeks elapsed since start date and your weekly timetable data.

Timetable data is represented as a JavaScript object with days as keys and arrays of subjects as values. It is saved/loaded from localStorage.

User interactions (adding subjects, marking attendance, editing timetable) update the localStorage and the UI in real-time.

The theme toggle stores preference locally and modifies the Bootstrap data attribute accordingly.

Considerations
The app currently uses localStorage, so data is saved per-browser and per-domain — clearing browser data will reset all information.


 
