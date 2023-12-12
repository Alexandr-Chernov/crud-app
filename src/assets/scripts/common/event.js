const alertBox = require("./alertBox");
const { createUser, displayUser, saveUsers, getUsers, changeUserName, getIndexUserById } = require("./other");


const eventDo = (eventName, data) => {
    const events = getEvents();
    events.push(JSON.stringify({ eventName: eventName, data: data }));
    saveEvents(events);
}

const eventRemove = () => {
    const events = getEvents();
    const last_event = JSON.parse(events.pop());

    switch (last_event.eventName) {
        case "create user":
            saveEvents(events);
            const users1 = getUsers();
            users1.splice(getIndexUserById(last_event.data.id), 1);
            saveUsers(users1);
            document.querySelector('ul').removeChild(document.querySelector('ul').lastChild);
            break;
        case "delete user":
            saveEvents(events);
            createUser(last_event.data.name, last_event.data.id);
            const users2 = getUsers();
            document.querySelector('ul').appendChild(displayUser(users2[users2.length - 1]));
            break;
        case "change user":
            saveEvents(events);
            const old_name = last_event.data.old_name;
            changeUserName(getIndexUserById(last_event.data.id), old_name);
            document.querySelector('ul').childNodes[getIndexUserById(last_event.data.id)].childNodes[0].textContent = `| id: ${last_event.data.id} | name: ${old_name} |`;
            break;
        default:
            break;
    }
    setRemoveEvent(last_event);
}

const eventRemoveBack = () => {
    const remove_event = getRemoveEvent();
    localStorage.removeItem("remove_event");
    const events = getEvents();
    events.push(JSON.stringify(remove_event));
    saveEvents(events);

    switch (remove_event.eventName) {
        case "create user":
            const new_id = createUser(remove_event.data.name, remove_event.data.id);
            const users1 = getUsers();
            const user1 = users1[getIndexUserById(new_id)];
            const ul = document.querySelector('ul');
            const li = displayUser(users1[users1.length - 1]);
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
                    users1.splice(users1.indexOf(JSON.stringify(user1)), 1);
                    eventDo("delete user", {
                        id: user1.id,
                        name: user1.name
                    });
                    localStorage.setItem("users", JSON.stringify(users1));
                    ul.removeChild(li);
                    remove_alert();
                });
                alert_div.childNodes[2].addEventListener("click", () => {
                    remove_alert();
                });
            });
            break;
        case "delete user":
            const users2 = getUsers();
            users2.splice(getIndexUserById(remove_event.data.id), 1);
            saveUsers(users2);
            document.querySelector('ul').removeChild(document.querySelector('ul').lastChild);
            break;
        case "change user":
            const new_name = remove_event.data.new_name;
            changeUserName(getIndexUserById(remove_event.data.id), new_name);
            document.querySelector('ul').childNodes[getIndexUserById(remove_event.data.id)].childNodes[0].textContent = `| id: ${remove_event.data.id} | name: ${new_name} |`;
            break;
        default:
            break;
    }
}

const getEvents = () => {
    return localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];
}
const saveEvents = (events) => {
    localStorage.setItem('events', JSON.stringify(events));
}
const getRemoveEvent = () => {
    return localStorage.getItem('remove_event') ? JSON.parse(localStorage.getItem('remove_event')) : [];
}
const setRemoveEvent = (remove_event) => {
    localStorage.setItem('remove_event', JSON.stringify(remove_event));
}

module.exports = {
    eventDo,
    eventRemove,
    getEvents,
    getRemoveEvent,
    eventRemoveBack
}
