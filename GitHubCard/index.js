/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/

const cards = document.querySelector('.cards');

function createSearchbar() {
  const form = document.createElement('form');
  form.classList.add('form');
  form.style.width = '100%';
  form.style.marginBottom = '30px';
  form.style.textAlign = 'center';

  const input = document.createElement('input');
  input.type = 'text';
  input.name = 'inputHandle';
  input.id = 'inputHandle';
  input.placeholder = 'Enter a GitHub handle to search for followers';
  input.style.width = '50%';
  input.style.padding = '5px';

  const button = document.createElement('input');
  button.type = 'submit';
  button.value = 'Search';
  button.style.padding = '5px';
  button.name = 'search';
  button.id = 'search';

  form.append(input);
  form.append(button);

  const container = document.querySelector('.container');
  const cards = document.querySelector('.cards');
  container.insertBefore(form, cards);

  return form;
}

function clickSearch() {
  const search = document.querySelector('#search');

  search.addEventListener('click', event => {
    event.preventDefault();
    searchFunc();
  });
}

function searchFunc() {
  const handle = document.querySelector('#inputHandle').value;

  clearCards();

  axios
    .get('https://api.github.com/users/' + handle)
    .then(response => {
      cards.append(createCard(response.data));
      getFollowersB(response.data.followers_url);
    })
    .catch(err => console.log(err));

  function getFollowersA(url) {
    axios.get(url).then(response => {
      for (let follower of response.data) {
        cards.append(createCard(follower));
      }
    });
  }

  function getFollowersB(url) {
    axios.get(url).then(response => {
      response.data
        .map(el => el.login)
        .forEach(handle =>
          axios
            .get('https://api.github.com/users/' + handle)
            .then(response => cards.append(createCard(response.data)))
            .catch(err => console.log(err)),
        );
    });
  }
}

function clearCards() {
  const cards = document.querySelector('.cards');
  while (cards.firstChild) {
    cards.removeChild(cards.firstChild);
  }
}

createSearchbar();
clickSearch();

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

// const followersArray = [
//   'brandonharris177',
//   'DanielWallen87',
//   'juarezfrench',
//   'mchrupcala',
//   'Krishan-Nattar',
//   'tetondan',
//   'dustinmyers',
//   'justsml',
//   'bigknell',
// ];

// followersArray.forEach(handle =>
//   axios
//     .get('https://api.github.com/users/' + handle)
//     .then(response => cards.append(createCard(response.data)))
//     .catch(err => console.log(err)),
// );

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/
function createCard(obj) {
  const card = document.createElement('div');
  card.classList.add('card');

  const img = document.createElement('img');
  img.src = obj.avatar_url;

  const cardInfo = document.createElement('div');
  cardInfo.classList.add('card-info');

  const name = document.createElement('h3');
  name.classList.add('name');
  name.textContent = obj.name;

  const username = document.createElement('p');
  username.classList.add('username');
  username.textContent = obj.login;

  const location = document.createElement('p');
  location.textContent = `Location: ${obj.location}`;

  const profile = document.createElement('p');
  profile.textContent = `Profile: `;

  const profileLink = document.createElement('a');
  profileLink.href = obj.html_url;
  profileLink.textContent = obj.html_url;

  const followers = document.createElement('p');
  followers.textContent = `Followers: ${obj.followers}`;

  const following = document.createElement('p');
  following.textContent = `Following: ${obj.following}`;

  const bio = document.createElement('p');
  bio.textContent = `Bio: ${obj.bio}`;

  card.append(img);
  card.append(cardInfo);
  cardInfo.append(name);
  cardInfo.append(username);
  cardInfo.append(location);
  cardInfo.append(profile);
  profile.append(profileLink);
  cardInfo.append(followers);
  cardInfo.append(following);
  cardInfo.append(bio);

  // const cal = document.createElement('div');
  // cal.classList.add('calendar');
  // cal.style.maxWidth = '100%';
  // const calScript = document.createElement('script');
  // calScript.textContent = `new GitHubCalendar(".calendar", "${obj.login}")`;

  // card.append(cal);
  // card.append(calScript);

  return card;
}

/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/
