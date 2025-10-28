const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
res.send(`
<!DOCTYPE html>
<html>
<head>
<title>Mikasa Volleyball Club Registration</title>
<style>
  body {
    font-family: Arial, sans-serif;
    background-color: #fef6e4;
    color: #001858;
    padding: 40px;
  }
  .form-container {
    background-color: #f3d2c1;
    padding: 20px;
    border-radius: 8px;
    max-width: 450px;
    margin: auto;
  }
  h2 {
    text-align: center;
    color: #001858;
  }
  label {
    display: block;
    margin-top: 12px;
    font-weight: normal;
  }
  input[type="text"],
  input[type="email"],
  select {
    width: 100%;
    padding: 7px;
    margin-top: 5px;
    border: 1px solid #ccc;
    border-radius: 3px;
  }
  .radio-group {
    margin-top: 5px;
  }
  .radio-group label {
    font-weight: normal;
    margin-right: 15px;
  }
  input[type="submit"] {
    background-color: #8bd3dd;
    color: #001858;
    padding: 10px;
    margin-top: 18px;
    width: 100%;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: normal;
  }
  input[type="submit"]:hover {
    background-color: #a1cbe6;
  }
</style>
</head>
<body>
  <div class="form-container">
    <h2>Mikasa Volleyball Club Registration</h2>
    <form action="/submit" method="POST">
      <label for="name">Full Name:</label>
      <input type="text" id="name" name="name" required>

      <label for="email">Email Address:</label>
      <input type="email" id="email" name="email" required>

      <label for="course">Course / Department:</label>
      <input type="text" id="course" name="course" required>

      <label for="year">Academic Year:</label>
      <input type="text" id="year" name="year" required>

      <label for="position">Preferred Position:</label>
      <select id="position" name="position" required>
        <option value="">--Select Position--</option>
        <option value="Setter">Setter</option>
        <option value="Libero">Libero</option>
        <option value="Outside Hitter">Outside Hitter</option>
        <option value="Middle Blocker">Middle Blocker</option>
        <option value="Opposite">Opposite</option>
      </select>
      <label>Experience Level:</label>
      <div class="radio-group">
        <label><input type="radio" name="experience" value="Beginner" required> Beginner</label>
        <label><input type="radio" name="experience" value="Intermediate"> Intermediate</label>
        <label><input type="radio" name="experience" value="Advanced"> Advanced</label>
      </div>
      <input type="submit" value="Join Mikasa Club">
    </form>
  </div>
</body>
</html>
`);
});

app.post('/submit', (req, res) => {
const { name, email, course, year, position, experience } = req.body;
processStudentData(name, email, course, year, position, experience, (err, result) => {
if (err) {
  return res.status(500).send('An error occurred. Please try again.');
}
res.send(`
<!DOCTYPE html>
<html>
<head>
<title>Registration Successful</title>
<style>
  body {
    font-family: Arial, sans-serif;
    background-color: #fef6e4;
    color: #001858;
    padding: 40px;
  }
  .response-container {
    background-color: #f3d2c1;
    padding: 20px;
    border-radius: 8px;
    max-width: 450px;
    margin: auto;
    text-align: center;
  }
  ul {
    list-style-type: none;
    padding: 0;
    text-align: left;
  }
  li {
    margin-bottom: 8px;
  }
</style>
</head>
<body>
  <div class="response-container">
    <h2>Welcome, ${result.name}!</h2>
    <p>Your registration for Mikasa Volleyball Club has been received.</p>
    <ul>
      <li>Email: ${result.email}</li>
      <li>Course: ${result.course}</li>
      <li>Year: ${result.year}</li>
      <li>Position: ${result.position}</li>
      <li>Experience Level: ${result.experience}</li>
    </ul>
  </div>
</body>
</html>
`);
});
});

function processStudentData(name, email, course, year, position, experience, callback) {
console.log("Processing student data...");
setTimeout(() => {
if (!name || !email || !course || !year || !position || !experience) {
callback(new Error('Invalid form data'));
} else {
callback(null, { name, email, course, year, position, experience });
}
}, 2000);
}

const PORT = 3000;
app.listen(PORT, () => {
console.log(`Mikasa Volleyball Club Server running at http://localhost:${PORT}`);
});
