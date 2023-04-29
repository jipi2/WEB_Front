// navbar.js

// create navbar HTML elements
const header = document.querySelector('header');
const nav = document.createElement('nav');
nav.className = 'nav-bar';

const logo = document.createElement('div');
logo.className = 'logo';
logo.textContent = "Jipi's Movies";
nav.appendChild(logo);

const hamburger = document.createElement('div');
hamburger.className = 'hamburger';
for (let i = 0; i < 3; i++) {
  const line = document.createElement('div');
  line.className = 'line';
  hamburger.appendChild(line);
}
nav.appendChild(hamburger);

const ul = document.createElement('ul');
const home = document.createElement('li');
const homeLink = document.createElement('a');
homeLink.href = '';
homeLink.textContent = 'Home';
home.appendChild(homeLink);
ul.appendChild(home);

const features = document.createElement('li');
const featuresLink = document.createElement('a');
featuresLink.href = '';
featuresLink.textContent = 'Features';
features.appendChild(featuresLink);
ul.appendChild(features);

const text1 = document.createElement('li');
const text1Link = document.createElement('a');
text1Link.href = '';
text1Link.textContent = 'Text';
text1.appendChild(text1Link);
ul.appendChild(text1);

const text2 = document.createElement('li');
const text2Link = document.createElement('a');
text2Link.href = '';
text2Link.textContent = 'Text';
text2.appendChild(text2Link);
ul.appendChild(text2);

const signIn = document.createElement('li');
const signInLink = document.createElement('a');
signInLink.href = '';
signInLink.textContent = 'Sign in';
signIn.appendChild(signInLink);
ul.appendChild(signIn);

const signUp = document.createElement('li');
const signUpLink = document.createElement('a');
signUpLink.href = '';
signUpLink.textContent = 'Sign up';
signUp.appendChild(signUpLink);
ul.appendChild(signUp);

nav.appendChild(ul);

// insert navbar HTML elements into the DOM
header.appendChild(nav);
