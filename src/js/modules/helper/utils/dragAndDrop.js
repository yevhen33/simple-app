function drop(e) {
    const fileInput = e.target;
    if(fileInput.name === 'foto') {
        ['dragenter', 'dragleave', 'dragover', 'drop'].forEach(eventName => {
            fileInput.addEventListener(eventName, prevetnDefaults, false);
        });
    
        ['dragenter', 'dragover'].forEach(eventName => {
            fileInput.addEventListener(eventName, () => highlight(fileInput), false);
        });
        ['dragleave', 'drop'].forEach(eventName => {
            fileInput.addEventListener(eventName, () => unhighlight(fileInput), false);
        });
    
        fileInput.addEventListener('drop', (e) => {
            fileInput.files = e.dataTransfer.files;
            let dots;
            const arr = fileInput.files[0].name.split('.');
    
            arr[0].length > 8 ? dots = "..." : dots = ".";
            const name = arr[0].substring(0, 8) + dots + arr[1];
            fileInput.nextElementSibling.textContent = `You uploaded file ${name}`;

            // adding preview photo

            const reader = new FileReader();

            reader.onload = event => {

                fileInput.previousElementSibling.querySelector('img').src = event.target.result;
            };

            reader.readAsDataURL(fileInput.files[0]);
            
        });

        fileInput.addEventListener('change', () => {
            fileInput.nextElementSibling.textContent = "File uploaded successfully";

            const reader = new FileReader();
            reader.onload = event => {
                fileInput.previousElementSibling.querySelector('img').src = event.target.result;
            };
            reader.readAsDataURL(fileInput.files[0]);
        });
    }
}

function prevetnDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

function highlight(item) {
    item.previousElementSibling.style.border = "2px solid #848484d5";
    item.previousElementSibling.style.backgroundColor = "rgba(0,0,0, .2)";
}
function unhighlight(item) {
    item.previousElementSibling.style.border = "2px solid #222222";
    item.previousElementSibling.style.backgroundColor = "#f6ffff";
}

export default drop;