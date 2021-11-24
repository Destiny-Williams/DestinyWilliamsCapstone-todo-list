let personName = '';

const getAllBots = () => {
    axios.get('/api/robots')
        .then(({data}) => {
            allBotsDiv.innerHTML = ''
        
            data.forEach(bot => {
                let botHtml = makeRobotDisplayCard(bot)
                allBotsDiv.innerHTML += botHtml
            })
        })
}

const showList = () => {

personName = document.getElementById('nameInput').value;

if (personName)
{
    personName = personName.trim();

    document.getElementById('listDiv').style.display = 'block';

    document.getElementById('nameEntry').style.display = 'none';

    document.getElementById('helloText').innerHTML = `Hi ${personName}`
}
else {
    alert("Please enter your name")
}

}


document.getElementById('getStartedBtn').addEventListener('click', showList);


document.getElementById('listDiv').style.display = 'none';


