// day4.js
const students = [
    { name: 'Andi Saputra', class: 'Full Stack A', score: 85 },
    { name: 'Budi Santoso', class: 'Full Stack A', score: 78 },
    { name: 'Citra Lestari', class: 'Full Stack B', score: 92 },
    { name: 'Dewi Anggraini', class: 'Backend Core', score: 88 },
    { name: 'Eko Prasetyo', class: 'Backend Core', score: 75 },
    { name: 'Fina Amelia', class: 'Full Stack A', score: 95 },
    { name: 'Gilang Ramadhan', class: 'Full Stack B', score: 80 },
    { name: 'Hani Fitriani', class: 'Backend Core', score: 89 },
    { name: 'Irfan Hakim', class: 'Full Stack B', score: 70 },
    { name: 'Joko Susilo', class: 'Backend Core', score: 82 }
];

const tbody = document.getElementById('studentTableBody');
const searchInput = document.getElementById('searchInput');
const averageDisplay = document.getElementById('averageDisplay');
const resultCount = document.getElementById('resultCount');

function renderTable(data) {
    tbody.innerHTML = data.map((student, index) => {
        return `<tr>
            <td>${index + 1}</td>
            <td>${student.name}</td>
            <td>${student.class}</td>
            <td>${student.score}</td>
        </tr>`;
    }).join('');

    const total = data.reduce((sum, s) => sum + s.score, 0);
    const avg = data.length ? (total / data.length) : 0;
    averageDisplay.textContent = avg.toFixed(1);

    resultCount.textContent = data.length === students.length ? '' : `${data.length} siswa ditemukan`;
}

function filterStudents(keyword) {
    const filtered = students.filter(s => 
        s.name.toLowerCase().includes(keyword.toLowerCase())
    );
    renderTable(filtered);
}

searchInput.addEventListener('input', function() {
    filterStudents(this.value);
});

renderTable(students);