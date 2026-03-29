const BASE_URL = "https://campus-pa0n.onrender.com";

// ✅ REGISTER
function register() {
fetch(`${BASE_URL}/auth/register`, {
method: "POST",
headers: {"Content-Type": "application/json"},
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
alert("✅ Registered Successfully");
window.location = "login.html";
})
.catch(err => alert("❌ " + err.message));
}

// ✅ LOGIN WITH ROLE CHECK
function login() {
const selectedRole = document.getElementById("role").value;

```
fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
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
        alert("❌ Wrong role selected!");
        return;
    }

    localStorage.setItem("user", JSON.stringify(user));

    alert("✅ Login successful");

    if(user.role === "ADMIN") {
        window.location = "admin.html";
    } else {
        window.location = "student.html";
    }
})
.catch(err => alert(err.message));
```

}

// ✅ LOAD USER COMPLAINTS
function loadComplaints() {
const user = JSON.parse(localStorage.getItem("user"));

```
fetch(`${BASE_URL}/complaints/user/${user.id}`)
.then(res => res.json())
.then(data => {
    document.getElementById("complaints").innerHTML =
        data.map(c => {
            const statusClass = c.status
                .toLowerCase()
                .replace(/\s+/g, "-");

            return `
                <div class="complaint-card">
                    <h4>${c.title}</h4>
                    <p>${c.description}</p>
                    <span class="badge ${statusClass}">${c.status}</span>
                </div>
            `;
        }).join("");
});
```

}

// ✅ LOAD ALL COMPLAINTS (ADMIN)
function loadAllComplaints() {
fetch(`${BASE_URL}/complaints`)
.then(res => res.json())
.then(data => {

```
    const category = document.getElementById("filterCategory").value;
    const status = document.getElementById("filterStatus").value;

    let filtered = data;

    if(category) {
        filtered = filtered.filter(c => c.category === category);
    }

    if(status) {
        filtered = filtered.filter(c => c.status === status);
    }

    document.getElementById("allComplaints").innerHTML =
        filtered.map(c => `
            <div class="complaint-card">
                <h4>${c.title}</h4>
                <p>${c.description}</p>
                <p><b>Category:</b> ${c.category}</p>

                <select onchange="updateStatus(${c.id}, this.value)">
                    <option ${c.status==="Pending"?"selected":""}>Pending</option>
                    <option ${c.status==="In Progress"?"selected":""}>In Progress</option>
                    <option ${c.status==="Resolved"?"selected":""}>Resolved</option>
                </select>
            </div>
        `).join("");
});
```

}

// ✅ UPDATE STATUS
function updateStatus(id, status) {
fetch(`${BASE_URL}/complaints/${id}?status=${status}`, {
method: "PUT"
}).then(() => {
alert("✅ Status Updated");
loadAllComplaints();
});
}

// ✅ TOGGLE ADMIN CODE FIELD
function toggleAdminCode() {
const role = document.getElementById("role").value;
const adminCodeField = document.getElementById("adminCode");

```
if (role === "ADMIN") {
    adminCodeField.style.display = "block";
} else {
    adminCodeField.style.display = "none";
}
```

}

// ✅ SUBMIT COMPLAINT
function submitComplaint() {
const user = JSON.parse(localStorage.getItem("user"));

```
if (!user) {
    alert("❌ Please login first");
    window.location = "login.html";
    return;
}

const title = document.getElementById("title").value;
const desc = document.getElementById("desc").value;
const category = document.getElementById("category").value;

if (!title || !desc) {
    alert("❌ Please fill all fields");
    return;
}

fetch(`${BASE_URL}/complaints?userId=${user.id}`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
        title: title,
        description: desc,
        category: category
    })
})
.then(res => {
    if (!res.ok) throw new Error("Failed to submit complaint");
    return res.json();
})
.then(() => {
    alert("✅ Complaint Submitted Successfully");

    document.getElementById("title").value = "";
    document.getElementById("desc").value = "";

    loadComplaints();
})
.catch(err => {
    console.error(err);
    alert("❌ " + err.message);
});
```

}
