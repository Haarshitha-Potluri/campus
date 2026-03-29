const BASE_URL = "https://campus-pa0n.onrender.com";

function register() {
fetch(BASE_URL + "/auth/register", {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({
name: document.getElementById("name").value,
email: document.getElementById("email").value,
password: document.getElementById("password").value,
role: document.getElementById("role").value
})
})
.then(res => {
if (!res.ok) throw new Error("Registration failed");
return res.json();
})
.then(() => {
alert("Registered Successfully");
window.location = "login.html";
})
.catch(err => alert(err.message));
}

function login() {
const selectedRole = document.getElementById("role").value;

```
fetch(BASE_URL + "/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
    })
})
.then(res => {
    if (!res.ok) throw new Error("Invalid credentials");
    return res.json();
})
.then(user => {
    if (user.role !== selectedRole) {
        alert("Wrong role selected!");
        return;
    }

    localStorage.setItem("user", JSON.stringify(user));

    if (user.role === "ADMIN") {
        window.location = "admin.html";
    } else {
        window.location = "student.html";
    }
})
.catch(err => alert(err.message));
```

}
