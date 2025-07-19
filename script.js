let surahs = [];

fetch('https://api.alquran.cloud/v1/quran/ar.alafasy')
  .then(response => response.json())
  .then(data => {
    surahs = data.data.surahs;
    const list = document.getElementById('surah-list');
    list.innerHTML = '';
    surahs.forEach((s, i) => {
      const li = document.createElement('li');
      li.textContent = s.name;
      li.onclick = () => showSurah(i);
      list.appendChild(li);
    });
  });

function showSurah(index) {
  const surah = surahs[index];
  document.getElementById('surah-title').textContent = `سورة ${surah.name}`;
  const container = document.getElementById('ayahs-container');
  container.innerHTML = '';
  surah.ayahs.forEach(a => {
    const p = document.createElement('p');
    p.innerHTML = `<span class="ayah">${a.text}</span> <span class="number">﴿${a.numberInSurah}﴾</span>`;
    container.appendChild(p);
  });
}

document.getElementById('search').addEventListener('input', function () {
  const value = this.value.trim();
  const list = document.getElementById('surah-list');
  list.innerHTML = '';
  surahs.forEach((s, i) => {
    if (s.name.includes(value)) {
      const li = document.createElement('li');
      li.textContent = s.name;
      li.onclick = () => showSurah(i);
      list.appendChild(li);
    }
  });
});
