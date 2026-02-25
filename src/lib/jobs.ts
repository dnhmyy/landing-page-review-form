export interface JobPosition {
    slug: string;
    title: string;
    type: string;
    shortDesc: string;
    description: string;
    responsibilities: string[];
    requirements: string[];
}

export const positions: JobPosition[] = [
    {
        slug: "baker",
        title: "Baker",
        type: "Full Time",
        shortDesc: "Mempersiapkan dan memanggang berbagai jenis roti artisan setiap hari dengan standar kualitas tinggi.",
        description: "Kami mencari Baker berdedikasi yang memiliki passion dalam membuat roti berkualitas tinggi. Anda akan bertanggung jawab atas seluruh proses pembuatan roti mulai dari persiapan bahan hingga produk siap jual.",
        responsibilities: [
            "Mempersiapkan adonan roti sesuai resep standar",
            "Memanggang berbagai jenis roti artisan setiap hari",
            "Menjaga konsistensi kualitas dan rasa produk",
            "Memastikan kebersihan area kerja dan peralatan",
            "Mengontrol stok bahan baku harian",
            "Berkoordinasi dengan tim untuk jadwal produksi",
        ],
        requirements: [
            "Pengalaman minimal 1 tahun sebagai Baker atau posisi serupa",
            "Memahami teknik dasar pembuatan roti dan pastry",
            "Mampu bekerja di lingkungan dapur yang cepat",
            "Bersedia bekerja shift pagi (mulai jam 04:00)",
            "Teliti, disiplin, dan menjaga kebersihan",
            "Pendidikan minimal SMA/SMK sederajat",
        ],
    },
    {
        slug: "cashier",
        title: "Cashier",
        type: "Full Time",
        shortDesc: "Melayani transaksi pelanggan dengan ramah dan memastikan keakuratan pembayaran harian.",
        description: "Kami mencari Cashier yang ramah dan cekatan untuk menjadi wajah terdepan toko kami. Anda akan berinteraksi langsung dengan pelanggan dan memastikan pengalaman belanja yang menyenangkan.",
        responsibilities: [
            "Melayani transaksi pembayaran pelanggan dengan akurat",
            "Memberikan informasi produk dan rekomendasi kepada pelanggan",
            "Mengelola kas register dan melakukan rekonsiliasi harian",
            "Menjaga kebersihan dan kerapihan area kasir",
            "Menangani komplain pelanggan dengan sopan dan solutif",
            "Membantu penataan display produk di etalase",
        ],
        requirements: [
            "Pengalaman minimal 6 bulan di bidang kasir/retail",
            "Ramah, komunikatif, dan berorientasi pada pelanggan",
            "Jujur dan teliti dalam mengelola uang",
            "Mampu mengoperasikan mesin kasir / POS system",
            "Berpenampilan rapi dan bersih",
            "Pendidikan minimal SMA/SMK sederajat",
        ],
    },
    {
        slug: "store-supervisor",
        title: "Store Supervisor",
        type: "Full Time",
        shortDesc: "Mengawasi operasional harian toko, mengelola tim, dan memastikan standar pelayanan terpenuhi.",
        description: "Kami mencari Store Supervisor berpengalaman untuk memimpin operasional harian salah satu cabang kami. Anda akan bertanggung jawab atas kinerja tim, kepuasan pelanggan, dan pencapaian target toko.",
        responsibilities: [
            "Mengawasi dan mengelola operasional harian toko",
            "Memimpin, melatih, dan mengevaluasi kinerja tim",
            "Memastikan standar pelayanan pelanggan terpenuhi",
            "Mengelola jadwal kerja dan pembagian tugas staf",
            "Membuat laporan harian penjualan dan stok",
            "Berkoordinasi dengan manajemen pusat untuk pengadaan barang",
        ],
        requirements: [
            "Pengalaman minimal 2 tahun sebagai Supervisor di bidang F&B atau retail",
            "Memiliki kemampuan leadership dan manajemen tim",
            "Mampu bekerja di bawah tekanan dan multitasking",
            "Memiliki kemampuan komunikasi yang baik",
            "Menguasai Microsoft Office dan sistem POS",
            "Pendidikan minimal D3/S1 segala jurusan",
        ],
    },
    {
        slug: "kitchen-staff",
        title: "Kitchen Staff",
        type: "Full Time",
        shortDesc: "Membantu proses persiapan bahan, menjaga kebersihan area dapur, dan mendukung tim baker.",
        description: "Kami mencari Kitchen Staff yang rajin dan bertanggung jawab untuk mendukung operasional dapur. Posisi ini cocok bagi Anda yang ingin belajar dan berkembang di industri bakery.",
        responsibilities: [
            "Membantu persiapan bahan baku untuk produksi roti",
            "Menjaga kebersihan seluruh area dapur dan peralatan",
            "Membantu proses pengemasan produk jadi",
            "Melakukan pencucian peralatan dapur",
            "Membantu penerimaan dan penyimpanan bahan baku",
            "Mendukung tim baker dalam proses produksi",
        ],
        requirements: [
            "Tidak memerlukan pengalaman (akan dilatih)",
            "Rajin, disiplin, dan bertanggung jawab",
            "Mampu bekerja dalam tim",
            "Bersedia bekerja shift dan di akhir pekan",
            "Sehat jasmani dan rohani",
            "Pendidikan minimal SMP sederajat",
        ],
    },
];
