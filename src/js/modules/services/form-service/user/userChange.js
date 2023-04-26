import {DataService} from "../../dataService";

export async function changeUser($form) {
    const user = $form.querySelector('.form-title span').textContent,
          file = $form.querySelector('[name="foto"]').files[0],
          inputs = $form.querySelectorAll('input[id]'),
          currentUser = DataService.getCurrent(),
          userID = await DataService.findUserID(user);

    let userData = {};
    inputs.forEach(item => {
        if(item.id != "confirm") {
            userData[item.id] = item.value;
        }
    });
    
    if (!!file) {
        userData.foto = await DataService.uploadUserImg(file);
        userID.foto = userData.foto;
    }
    
    if(user === currentUser._id) {
        for (let key in userData) {
            if(currentUser[key]) {
                currentUser[key] = userData[key];
            }
            if(userID[key]) {
                userID[key] = userData[key];
            }
        }
        DataService.installCurrentUser(currentUser);

        await DataService.upDataUser(userID);

        window.location.hash = "#current";
    } else {
        for (let key in userData) {
            if(userID[key]) {
                userID[key] = userData[key];
            }
        }
        await DataService.upDataUser(userID);
        window.location.hash = "#all";
    }
}