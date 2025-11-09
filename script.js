// Menunggu sampai seluruh halaman HTML selesai dimuat
document.addEventListener("DOMContentLoaded", function() {

    // --- BAGIAN 1: PEMILIHAN ELEMEN ---
    const form = document.getElementById('add-task-form');
    const taskList = document.getElementById('task-list-container');
    
    // Input di dalam form
    const titleInput = document.getElementById('task-title');
    const descInput = document.getElementById('task-desc');
    const categoryInput = document.getElementById('task-category');

    // Filter radio buttons
    const filterRadios = document.querySelectorAll('.filter-nav input[name="filter"]');

    
    // --- BAGIAN 2: FUNGSI UNTUK FILTER ---
    
    function filterTasks() {
        // Dapatkan nilai filter yang sedang dicek (e.g., "all", "work", "personal")
        const currentFilter = document.querySelector('.filter-nav input[name="filter"]:checked').value;
        
        // Dapatkan SEMUA item tugas yang ada di daftar
        const allTasks = taskList.querySelectorAll('.task-item');

        // Loop (ulangi) untuk setiap item tugas
        allTasks.forEach(item => {
            const itemCategory = item.getAttribute('data-category');

            // Cek apakah item harus ditampilkan
            if (currentFilter === 'all' || itemCategory === currentFilter) {
                item.style.display = 'block'; // Tampilkan
            } else {
                item.style.display = 'none'; // Sembunyikan
            }
        });
    }

    
    // --- BAGIAN 3: EVENT LISTENER UNTUK FILTER ---
    
    // Tambahkan 'event listener' ke SETIAP radio button filter
    // 'change' berarti event ini jalan saat pilihannya berubah
    filterRadios.forEach(radio => {
        radio.addEventListener('change', filterTasks);
    });

    
    // --- BAGIAN 4: EVENT LISTENER UNTUK FORM (DENGAN PERBAIKAN) ---
    
    form.addEventListener('submit', function(event) {
        
        // Mencegah form me-refresh halaman
        event.preventDefault(); 

        // Mengambil nilai (value) dari setiap input
        const title = titleInput.value;
        const description = descInput.value;
        const categoryValue = categoryInput.value;
        
        // Mengambil teks yang tampil dari kategori (Contoh: "Pekerjaan")
        const categoryName = categoryInput.options[categoryInput.selectedIndex].text;

        // Membuat elemen HTML baru untuk kegiatan
        const taskItem = document.createElement('div');
        taskItem.classList.add('task-item'); 
        taskItem.setAttribute('data-category', categoryValue); 

        // Mengisi elemen baru dengan HTML
        taskItem.innerHTML = `
            <h3>${title}</h3>
            <p>${description}</p>
            <span class="tag">${categoryName}</span>
        `;

        // Menambahkan elemen kegiatan baru ke dalam daftar (di paling atas)
        taskList.prepend(taskItem);

        // Mengosongkan form
        form.reset();

        // **PERBAIKAN PENTING ADA DI SINI**
        // Setelah menambah item, kita jalankan ulang fungsi filter.
        // Ini agar item baru langsung disembunyikan jika tidak cocok
        // dengan filter yang sedang aktif.
        filterTasks();
    });
    
    // Menjalankan filter saat halaman pertama kali dimuat (opsional tapi bagus)
    filterTasks(); 
});

