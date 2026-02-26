export interface JobPosition {
    slug: string;
    title: string;
    type: string;
    shortDesc: string;
    description: string;
    responsibilities: string[];
    requirements: string[];
    contactEmail?: string;
    contactWa?: string;
}

export const positions: JobPosition[] = [
    {
        slug: "senior-finance-accounting-spv",
        title: "Senior Finance & Accounting SPV",
        type: "Full Time",
        shortDesc: "Mengelola laporan keuangan, jurnal, rekonsiliasi bank, dan perpajakan dengan standar profesional.",
        description: "Kami mencari Senior Finance & Accounting SPV yang teliti dan berintegritas tinggi untuk memimpin tim keuangan kami. Anda akan bertanggung jawab atas akurasi pelaporan keuangan, pengelolaan jurnal, dan kepatuhan pajak perusahaan.",
        responsibilities: [
            "Penyusunan laporan keuangan (Neraca, Laba Rugi, Arus Kas)",
            "Mengelola jurnal umum & penyesuaian",
            "Rekonsiliasi bank secara rutin",
            "Menangani urusan perpajakan perusahaan",
            "Memimpin dan mengarahkan tim Finance & Accounting",
            "Mengontrol penggunaan budget perusahaan",
        ],
        requirements: [
            "Pendidikan minimal S1 Akuntansi / Finance / bidang terkait",
            "Pengalaman kerja 3-5 tahun (termasuk posisi supervisor)",
            "Mahir mengoperasikan software akuntansi dan Ms. Excel (Pivot, Vlookcup, dll)",
            "Memiliki jiwa leadership dan mampu memimpin tim",
            "Teliti, detail-oriented, tegas, dan berintegritas tinggi",
            "Memahami regulasi perpajakan yang berlaku",
        ],
        contactEmail: "hrd@rotikebanggaan.com",
        contactWa: "6282123182273",
    },
    {
        slug: "spv-outlet",
        title: "SPV OUTLET",
        type: "Full Time",
        shortDesc: "Memimpin operasional outlet, mengelola tim, dan memastikan kualitas layanan pelanggan yang optimal.",
        description: "Kami mencari SPV Outlet yang berpengalaman untuk mengelola operasional harian outlet kami. Anda akan bertanggung jawab atas manajemen tim, inventaris, dan memastikan kepuasan pelanggan tetap prima.",
        responsibilities: [
            "Memimpin, mengelola tim, dan menjaga kualitas layanan pelanggan",
            "Mengelola operasional outlet, inventaris, dan jadwal kerja",
            "Bekerja dengan tenggat waktu dan mengelola prioritas tim",
            "Berkomunikasi efektif dengan seluruh staf dan pelanggan",
            "Mengoperasikan sistem POS (Point of Sale) dan aplikasi outlet",
            "Memastikan kebersihan dan standar display outlet",
        ],
        requirements: [
            "Pendidikan minimal D3 (Manajemen, Pemasaran, atau Bisnis diutamakan)",
            "Pengalaman kerja minimal 2 tahun sebagai Supervisor (Retail/F&B)",
            "Keterampilan kepemimpinan dan manajemen tim yang baik",
            "Familiar dengan sistem POS dan aplikasi terkait outlet",
            "Memiliki orientasi pada hasil dan kepuasan pelanggan",
            "Mampu bekerja secara efektif dengan tim",
        ],
        contactEmail: "hrd@rotikebanggaan.com",
        contactWa: "6282118828878",
    },
];
