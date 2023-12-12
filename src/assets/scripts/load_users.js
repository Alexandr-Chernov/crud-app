const alertBox = require("./common/alertBox");
const { eventDo, eventRemove, getEvents, getRemoveEvent, eventRemoveBack } = require("./common/event");
const { displayUser, getUsers, getIndexUserById } = require("./common/other");


const load_users = () => {
    if (!getEvents().length) {
        document.getElementById("back_btn").disabled = true;
    }
    if (!getRemoveEvent().length) {
        document.getElementById("remove_back_btn").disabled = true;
    }
    console.log("load users...");
    const users = getUsers();
    const ul = document.querySelector('ul');
    users.forEach((user) => {
        const li = displayUser(user);
        ul.appendChild(li);
        li.childNodes[2].addEventListener("click", () => {
            const alert_div = alertBox();
            document.getElementById('alert_block').appendChild(alert_div);
            document.getElementById('alert_block').style.padding = "10px 0";
            const remove_alert = () => {
                alert_div.remove();
                document.getElementById('alert_block').style.padding = "0";
            }
            alert_div.childNodes[1].addEventListener("click", () => {
                users.splice(getIndexUserById(user.id), 1);
                eventDo("delete user", {
                    id: user.id,
                    name: user.name
                });
                localStorage.setItem("users", JSON.stringify(users));
                ul.removeChild(li);
                remove_alert();
            });
            alert_div.childNodes[2].addEventListener("click", () => {
                remove_alert();
            });
        });
    });
}

load_users();

document.getElementById("back_btn").addEventListener("click", () => {
    if (getEvents().length && getEvents()) {
        eventRemove();
    }
    if (!getEvents().length) {
        document.getElementById("back_btn").disabled = true;
        localStorage.removeItem("users");
    }
    document.getElementById("remove_back_btn").disabled = false;
});
document.getElementById("remove_back_btn").addEventListener("click", () => {
    if (getRemoveEvent()) {
        eventRemoveBack();
    }
    if (!getRemoveEvent().length) {
        document.getElementById("remove_back_btn").disabled = true;
    }
});