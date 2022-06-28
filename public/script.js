
const socket = io('http://localhost:8000');
let nsSocket = '';
// listen to nsList
socket.on('nsList', nsData => {
    
    let namespacesDiv = document.querySelector('.namespaces');
    namespacesDiv.innerHTML = '';
    nsData.forEach(ns => {
        namespacesDiv.innerHTML += `<img src=${ns.img} ns=${ns.endpoint} class="namespace__avatar">`
    })
    // Add a click listener
    Array.from(document.getElementsByClassName('namespace__avatar')).forEach(elem => {
        elem.addEventListener('click', e => {
            const nsEndpoint = elem.getAttribute('ns');
            console.log(`${nsEndpoint} I should go to now`);
        })
    })
    joinNs('/google')
})

