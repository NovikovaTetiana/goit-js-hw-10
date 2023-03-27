import debounce from 'lodash.debounce';
import './css/styles.css';
import  {fetchCountries}  from './fetchCountries'
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('#search-box');
const ulEl = document.querySelector('.country-list');
const divEl = document.querySelector('.country-info');

inputEl.addEventListener('input', debounce(handleInput, DEBOUNCE_DELAY));

function handleInput(e) {
  const nameCountry = e.target.value.trim();

  if (nameCountry) {
    return fetchCountries(nameCountry)
      .then(data => {
        choseMarkup(data);
      })
      .catch(error => {
        Notify.failure('Oops, there is no country with that name');
      });
  }

  ulEl.innerHTML = '';
  divEl.innerHTML = '';
}

function choseMarkup(countries) {
  if (countries.length === 1) {
    ulEl.innerHTML = '';
    return markupCountry(countries);
  }
  if (countries.length >= 2 && countries.length <= 10) {
    divEl.innerHTML = '';
    return markupList(countries);
  }

  return Notify.info(
    'Too many matches found. Please enter a more specific name.'
  );
}

function markupList(data) {
  const markup = data
    .map(el => {
      return `<li class="country-item">
            <img src="${el.flags.svg}" alt="${el.name.official}" width="40" height="20" /> 
            <p>${el.name.official}</p>
            </li>`;
    })
    .join('');

    ulEl.innerHTML = markup;
}

function markupCountry(data) {
  const markup = data
    .map(el => {
      return `<h1>
       <img src="${el.flags.svg}" alt="${
        el.name.official
      }" width="40" height="20" /> 
            
        ${el.name.official}
      </h1>
      <ul class="country-info_list">
        <li class="country-info_item">
          <h2>Capital:</h2>
          <p>${el.capital}</p>
        </li>
        <li class="country-info_item">
          <h2>Population:</h2>
          <p>${el.population}</p>
        </li>
        <li class="country-info_item">
          <h2>Languages:</h2>
          <p>${Object.values(el.languages).join(', ')}</p>
        </li>
      </ul>`;
    })
    .join('');

    divEl.innerHTML = markup;
}