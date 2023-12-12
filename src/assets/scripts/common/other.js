const createUser = (name, id = 9999) => {
    let users = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];
    let new_id;
    if (id === 9999) {
        console.log(1)
        new_id = users.length ? users[users.length - 1].id + 1 : 1;
    } else {
        new_id = id;
    }
    users.push({ id: new_id, name: name });
    localStorage.setItem("users", JSON.stringify(users));

    return new_id;
}

const displayUser = (user) => {
    const li = document.createElement('li');
    li.textContent = `| id: ${user.id} | name: ${user.name} |`;
    const to_change_user_btn = document.createElement("button");
    to_change_user_btn.textContent = "change";
    const form = document.createElement("form");
    form.action = "./change_user.html";
    const input1 = document.createElement("input");
    input1.type = "hidden";
    input1.name = "change_user_type";
    input1.value = "change";
    const input2 = document.createElement("input");
    input2.type = "hidden";
    input2.name = "user_id";
    input2.value = user.id;

    const delete_btn = document.createElement("button");
    delete_btn.textContent = "delete";

    form.appendChild(input1);
    form.appendChild(input2);
    form.appendChild(to_change_user_btn);
    li.appendChild(form);
    li.appendChild(delete_btn);

    return li;
}

const changeUserName = (index, name) => {
    const users = getUsers();
    let change_user = users[index];
    change_user.name = name;
    users[index] = change_user;
    saveUsers(users);
}

const getIndexUserById = (id) => {
    const users = getUsers();
    return users.indexOf(...users.filter((user) => { return user.id == id }));
}

const getUsers = () => {
    if (localStorage.getItem('users')) {
        if (JSON.parse(localStorage.getItem('users')).length) {
            return JSON.parse(localStorage.getItem('users'));
        }
        return [JSON.parse(localStorage.getItem('users'))]
    }
    return [];
}
const saveUsers = (users) => {
    localStorage.setItem('users', JSON.stringify(users));
}

module.exports = {
    createUser,
    displayUser,
    getUsers,
    saveUsers,
    changeUserName,
    getIndexUserById
}
