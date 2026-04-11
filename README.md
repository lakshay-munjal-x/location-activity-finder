#  Weatherwise- Travel Finder

## Project Overview

Smart Travel Finder is a web application that helps users explore nearby places such as hotels, parks, restaurants, and cafes based on a selected city.
It also shows real-time weather data and suggests places accordingly.

---

## Objective

The goal of this project is to demonstrate:

* JavaScript concepts
* API integration using `fetch`
* Dynamic UI updates
* Use of Array Higher Order Functions (HOFs)

---

## 🔗 APIs Used

1. **Open-Meteo API**
   Used to fetch real-time weather data (temperature, weather conditions).

2. **Overpass API (OpenStreetMap)**
   Used to fetch nearby places like:

   * Hotels
   * Parks
   * Restaurants
   * Cafes

3. **Nominate API**
   Used to convert city names into latitude and longitude.

---

## Features

### 🔍 Search

* Users can search places by name using a search bar.

### Filter

* Filter places by category:

  * Hotels
  * Parks
  * Restaurants
  * Cafes

### Sort

* Sort places alphabetically (A-Z / Z-A)

### ❤️ Favorites

* Users can mark places as favorite.

### 🌙 Dark Mode

* Toggle between light and dark themes.

### 🌦 Weather-Based Suggestions

* Suggests places based on weather:

  * Sunny → Restaurants
  * Rain → Cafes & Hotels

### ⏳ Loading Indicators

* Shows spinner while fetching data.

### ⚠️ Error Handling

* Handles:

  * API failures
  * Empty results
  * Invalid city input

---

## Technologies Used

* HTML
* CSS
* JavaScript (Vanilla JS)
* Fetch API

---

## Concepts Used

* Array Higher Order Functions:

  * `filter()`
  * `sort()`
* DOM Manipulation
* Event Handling
* API Integration
* Conditional Rendering

---

## Responsiveness

* Fully responsive design
* Works on:

  * Mobile
  * Tablet
  * Desktop

---

## 🚀 How to Run the Project

1. Clone the repository:

```bash
git clone https://github.com/your-username/smart-travel-finder.git
```

2. Open the project folder

3. Run the project:

* Open `index.html` in your browser

---

## 📦 Project Structure

```
📁 Smart Travel Finder
 ├── index.html
 ├── style.css
 ├── script.js
 └── README.md
```

---

## 📅 Milestones Covered

* ✅ Milestone 1: Project Setup
* ✅ Milestone 2: API Integration
* ✅ Milestone 3: Core Features
* ✅ Milestone 4: Final Submission

---

## 💡 Future Improvements

* Save favorites using Local Storage
* Add debounce to search
* Improve UI with animations
* Add pagination or infinite scroll

---

## 👨‍💻 Author

**Lakshay Munjal**

---

## Final Note

This project demonstrates practical implementation of JavaScript concepts and API integration. It provides a clean and interactive user experience while exploring real-world data.

---
