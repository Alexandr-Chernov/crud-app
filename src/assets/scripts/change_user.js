const { createUser, changeUserName, getIndexUserById } = require("./common/other");
const { eventDo } = require("./common/event");

const change_user = () => {
    const strReq = window.location.search.replace('?', '').split('&').reduce(
        function (p, e) {
            var a = e.split('=');
            p[decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
            return p;
        },
        {}
    );

    switch (strReq["change_user_type"]) {
        case "create":
            let input1 = document.createElement("input");
            input1.placeholder = "name";
            let submit = document.createElement("button");
            submit.textContent = "create";

            document.getElementById("contentblock").appendChild(input1);
            document.getElementById("contentblock").appendChild(submit);

            submit.addEventListener("click", () => {
                const new_id = createUser(input1.value);
                eventDo("create user", {
                    id: new_id,
                    name: input1.value
                });
                window.location.replace("/");
            });
            
            break;
        case "change":
            let input2 = document.createElement("input");
            input2.placeholder = "name";
            let users = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];
            const index = getIndexUserById(strReq["user_id"], input2.value);
            input2.value = users[index].name;
            let button1 = document.createElement("button");
            button1.textContent = "Change";

            document.getElementById("contentblock").appendChild(input2);
            document.getElementById("contentblock").appendChild(button1);

            button1.addEventListener("click", () => {
                let change_user = users[index];
                const old_name = change_user.name;
                changeUserName(index, input2.value);
                eventDo("change user", {
                    id: change_user.id,
                    new_name: input2.value,
                    old_name: old_name
                });
                window.location.replace("/");
            });
            break;
        default:
            console.log("nothing done");
            break;
    }

}

change_user();
