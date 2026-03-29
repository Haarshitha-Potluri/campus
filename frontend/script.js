// ✅ BASE BACKEND URL (Render)
const BASE_URL = "https://campus-pa0n.onrender.com";

// ================= REGISTER =================
function register() {
const name = document.getElementById("name").value;
const email = document.getElementById("email").value;
const password = document.getElementById("password").value;
const role = document.getElementById("role").value;

```
if (!name || !email || !password) {
    alert("Please fill all fields");
    return;
}

fetch(BASE_URL + "/auth/register", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        name: name,
        email: email,
        password: password,
        role: role
    })
})
.then(response => {
    if (!response.ok) {
        throw new Error("Registration failed");
    }
    return response.json();
})
.then(data => {
    alert("✅ Registered Successfully");
    window.location.href = "login.html";
})
.catch(error => {
    console.error(error);
    alert("❌ " + error.message);
});
```

}

// ================= LOGIN =================
function login() {
const email = document.getElementById("email").value;
const password = document.getElementById("password").value;
const selectedRole = document.getElementById("role").value;

```
if (!email || !password) {
    alert("Please fill all fields");
    return;
}

fetch(BASE_URL + "/auth/login", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        email: email,
        password: password
    })
})
.then(response => {
    if (!response.ok) {
        throw new Error("Invalid credentials");
    }
    return response.json();
})
.then(user => {

    // if (user.role !== selectedRole) {
    //     alert("❌ Wrong role selected!");
    //     return;
    // }

    localStorage.setItem("user", JSON.stringify(user));

    alert("✅ Login successful");

    if (user.role === "ADMIN") {
        window.location.href = "admin.html";
    } else {
        window.location.href = "student.html";
    }
})
.catch(error => {
    console.error(error);
    alert("❌ " + error.message);
});
```

}

// ================= LOAD USER COMPLAINTS =================
function loadComplaints() {
const user = JSON.parse(localStorage.getItem("user"));

```
if (!user) return;

fetch(BASE_URL + "/complaints/user/" + user.id)
.then(response => response.json())
.then(data => {
    document.getElementById("complaints").innerHTML =
        data.map(c => {
            return `
            <div class="complaint-card">
                <h4>${c.title}</h4>
                <p>${c.description}</p>
                <span>${c.status}</span>
            </div>`;
        }).join("");
})
.catch(err => console.error(err));
```

}

// ================= LOAD ALL COMPLAINTS (ADMIN) =================
function loadAllComplaints() {
fetch(BASE_URL + "/complaints")
.then(response => response.json())
.then(data => {

```
    document.getElementById("allComplaints").innerHTML =
        data.map(c => `
            <div class="complaint-card">
                <h4>${c.title}</h4>
                <p>${c.description}</p>
                <p><b>Category:</b> ${c.category}</p>

                <select onchange="updateStatus(${c.id}, this.value)">
                    <option ${c.status === "Pending" ? "selected" : ""}>Pending</option>
                    <option ${c.status === "In Progress" ? "selected" : ""}>In Progress</option>
                    <option ${c.status === "Resolved" ? "selected" : ""}>Resolved</option>
                </select>
            </div>
        `).join("");
})
.catch(err => console.error(err));
```

}

// ================= UPDATE STATUS =================
function updateStatus(id, status) {
fetch(BASE_URL + "/complaints/" + id + "?status=" + status, {
method: "PUT"
})
.then(() => {
alert("✅ Status Updated");
loadAllComplaints();
})
.catch(err => console.error(err));
}

// ================= SUBMIT COMPLAINT =================
function submitComplaint() {
const user = JSON.parse(localStorage.getItem("user"));

```
if (!user) {
    alert("Please login first");
    window.location.href = "login.html";
    return;
}

const title = document.getElementById("title").value;
const desc = document.getElementById("desc").value;
const category = document.getElementById("category").value;

if (!title || !desc) {
    alert("Please fill all fields");
    return;
}

fetch(BASE_URL + "/complaints?userId=" + user.id, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        title: title,
        description: desc,
        category: category
    })
})
.then(response => {
    if (!response.ok) throw new Error("Failed to submit");
    return response.json();
})
.then(() => {
    alert("✅ Complaint Submitted");
    document.getElementById("title").value = "";
    document.getElementById("desc").value = "";
    loadComplaints();
})
.catch(err => {
    console.error(err);
    alert("❌ Error submitting complaint");
});
```

}

// ================= TOGGLE ADMIN CODE =================
function toggleAdminCode() {
const role = document.getElementById("role").value;
const field = document.getElementById("adminCode");

```
if (field) {
    field.style.display = role === "ADMIN" ? "block" : "none";
}
```

}
