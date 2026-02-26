export interface Product {
    id: number;
    name: string;
    category: string;
    desc: string;
    price: string;
    image: string;
    tag?: string;
}

export const categories = [
    "All",
    "Roti Manis",
    "Roti Asin",
    "Roti Goreng",
    "Roti Tawar",
    "Bundle",
    "Gorengan & Snack",
    "Kue Basah",
    "Cake"
];

export const products: Product[] = [
    // BEST SELLERS
    { id: 5, name: "Jadul Meises", category: "Roti Manis", tag: "Best Seller", price: "Rp 12.000", image: "/images/roti/jadulmeses.jpg", desc: "Roti klasik taburan meises coklat (best before 3 hari)." },
    { id: 10, name: "Keju Manis", category: "Roti Manis", tag: "Best Seller", price: "Rp 12.000", image: "/images/roti/kejumanis.jpg", desc: "Isian keju manis lumer di mulut (best before 3 hari)." },
    { id: 19, name: "Pisang Coklat Keju", category: "Roti Manis", tag: "Best Seller", price: "Rp 12.000", image: "/images/roti/piscokju.jpg", desc: "Kombinasi pisang manis, coklat, dan keju (best before 3 hari)." },
    { id: 20, name: "Polo Nanas", category: "Roti Manis", tag: "Best Seller", price: "Rp 14.000", image: "/images/roti/polonanas.jpg", desc: "Roti polo klasik dengan selai nanas (best before 3 hari)." },
    { id: 28, name: "Bakso Ayam", category: "Roti Asin", tag: "Best Seller", price: "Rp 14.000", image: "/images/roti/baksoayam.jpg", desc: "Roti empuk isian bakso ayam lezat (best before 2 hari)." },
    { id: 29, name: "Bakso Sapi", category: "Roti Asin", tag: "Best Seller", price: "Rp 15.000", image: "/images/roti/daginsapi.jpg", desc: "Roti empuk isian daging cincang sapi (best before 2 hari)." },
    { id: 35, name: "Smoked Beef and Cheese", category: "Roti Asin", tag: "Best Seller", price: "Rp 14.000", image: "/images/roti/smokebeef.jpg", desc: "Irisan smoked beef dan lapisan keju (best before 2 hari)." },
    { id: 37, name: "Sosis Ayam", category: "Roti Asin", tag: "Best Seller", price: "Rp 12.000", image: "/images/roti/sosisayam.jpg", desc: "Roti dengan isian sosis ayam utuh gurih (best before 2 hari)." },
    { id: 38, name: "Roti Goreng Ayam", category: "Roti Goreng", tag: "Best Seller", price: "Rp 13.000", image: "/images/roti/gorengayam.jpg", desc: "Roti goreng renyah dengan isian ayam (best before 2 hari)." },

    // ROTI MANIS
    { id: 1, name: "Cinnamon", category: "Roti Manis", tag: "Roti Manis", price: "Rp 12.000", image: "/images/roti/kayumanis.jpg", desc: "Roti lembut dengan aroma kayu manis pilihan (best before 3 hari)." },
    { id: 2, name: "Coklat Custard", category: "Roti Manis", tag: "Roti Manis", price: "Rp 12.000", image: "/images/roti/coklatcustard.jpg", desc: "Isian coklat dan siraman custard lumer (best before 3 hari)." },
    { id: 3, name: "Coklat Keju", category: "Roti Manis", tag: "Roti Manis", price: "Rp 12.000", image: "/images/roti/coklatkeju.jpg", desc: "Kombinasi klasik coklat manis dan keju gurih (best before 3 hari)." },
    { id: 4, name: "Jadul Keju", category: "Roti Manis", tag: "Roti Manis", price: "Rp 12.000", image: "/images/roti/jadulkeju.jpg", desc: "Roti klasik taburan keju melimpah (best before 3 hari)." },
    { id: 6, name: "Jagung Manis", category: "Roti Manis", tag: "Roti Manis", price: "Rp 13.000", image: "/images/roti/jagungmanis.jpg", desc: "Rasa jagung manis yang khas dan lezat." },
    { id: 7, name: "Kacang Merah", category: "Roti Manis", tag: "Roti Manis", price: "Rp 12.000", image: "/images/roti/kacangmerah.jpg", desc: "Isian pasta kacang merah asli (best before 3 hari)." },
    { id: 8, name: "Kacang Tanah", category: "Roti Manis", tag: "Roti Manis", price: "Rp 12.000", image: "/images/roti/kacangtanah.jpg", desc: "Isian selai kacang tanah gurih manis (best before 3 hari)." },
    { id: 9, name: "Keju Asin", category: "Roti Manis", tag: "Roti Manis", price: "Rp 12.000", image: "/images/roti/kejuasin.jpg", desc: "Roti dengan isian keju asin premium (best before 3 hari)." },
    { id: 11, name: "Kelapa Kismis", category: "Roti Manis", tag: "Roti Manis", price: "Rp 12.000", image: "/images/roti/kelapakismis.jpg", desc: "Paduan unti kelapa manis dan kismis segar (best before 3 hari)." },
    { id: 12, name: "Kismis", category: "Roti Manis", tag: "Roti Manis", price: "Rp 12.000", image: "/images/roti/kismis.jpg", desc: "Roti bertabur kismis pilihan (best before 3 hari)." },
    { id: 13, name: "Kopi Butter", category: "Roti Manis", tag: "Roti Manis", price: "Rp 13.000", image: "/images/roti/kopibutter.jpg", desc: "Harumnya kopi dengan isian butter gurih (best before 3 hari)." },
    { id: 14, name: "Kosong", category: "Roti Manis", tag: "Roti Manis", price: "Rp 10.000", image: "/images/roti/kosongmanis.jpg", desc: "Roti manis polos lembut tanpa isian (best before 3 hari)." },
    { id: 15, name: "Mocha Cream", category: "Roti Manis", tag: "Roti Manis", price: "Rp 11.000", image: "/images/roti/mochacream.jpg", desc: "Krim moka lembut membalut roti empuk (best before 3 hari)." },
    { id: 16, name: "Mocha Meises", category: "Roti Manis", tag: "Roti Manis", price: "Rp 12.000", image: "/images/roti/mochameses.jpg", desc: "Krim moka dengan taburan meises (best before 3 hari)." },
    { id: 17, name: "Pia Kacang Merah", category: "Roti Manis", tag: "Roti Manis", price: "Rp 11.000", image: "/images/roti/piakacanmerah.jpg", desc: "Roti pia dengan isian kacang merah (best before 3 hari)." },
    { id: 18, name: "Pia Kacang Tanah", category: "Roti Manis", tag: "Roti Manis", price: "Rp 11.000", image: "/images/roti/piakacangtanah.jpg", desc: "Roti pia dengan isian kacang tanah gurih (best before 3 hari)." },
    { id: 21, name: "Roti Martabak Manis", category: "Roti Manis", tag: "Roti Manis", price: "Rp 12.000", image: "/images/roti/martabakmanis.jpg", desc: "Sensasi rasa martabak dalam roti empuk (best before 3 hari)." },
    { id: 22, name: "Srikaya", category: "Roti Manis", tag: "Roti Manis", price: "Rp 13.000", image: "/images/roti/srikaya.jpg", desc: "Isian selai srikaya legit dan otentik (best before 3 hari)." },
    { id: 23, name: "Susu Lumer", category: "Roti Manis", tag: "Roti Manis", price: "Rp 12.000", image: "/images/roti/sulum.jpg", desc: "Pecah di mulut! Isian krim susu yang lumer (best before 3 hari)." },
    { id: 24, name: "Butter Sugar", category: "Roti Manis", tag: "Roti Manis", price: "Rp 12.000", image: "/images/roti/buttersugar.jpg", desc: "Paduan butter dan taburan gula renyah (best before 3 hari)." },
    { id: 25, name: "Cranberry Cream Cheese", category: "Roti Manis", tag: "Roti Manis", price: "Rp 15.000", image: "/images/roti/cranberry.jpg", desc: "Roti mewah dengan cranberry dan cream cheese (best before 3 hari)." },

    // ROTI ASIN
    { id: 26, name: "Abon Sapi Manis", category: "Roti Asin", tag: "Roti Asin", price: "Rp 15.000", image: "/images/roti/abonsapimanis.jpg", desc: "Taburan abon sapi manis melimpah (best before 2 hari)." },
    { id: 27, name: "Abon Sapi Pedas", category: "Roti Asin", tag: "Roti Asin", price: "Rp 15.000", image: "/images/roti/abonsapipedas.jpg", desc: "Sensasi pedas gurih abon sapi (best before 2 hari)." },
    { id: 30, name: "Butter Rolls", category: "Roti Asin", tag: "Roti Asin", price: "Rp 14.000", image: "/images/roti/butterrols.jpg", desc: "Roll mentega yang gurih dan wangi (best before 2 hari)." },
    { id: 31, name: "Kari Puff", category: "Roti Asin", tag: "Roti Asin", price: "Rp 14.000", image: "/images/roti/karipuf.jpg", desc: "Pastry dengan isian bumbu kari kuat (best before 2 hari)." },
    { id: 32, name: "Korean Garlic", category: "Roti Asin", tag: "Roti Asin", price: "Rp 20.000", image: "/images/roti/koreangarlic.jpg", desc: "Roti hits Korea dengan cream cheese dan saus bawang (best before 2 hari)." },
    { id: 33, name: "Pizza Ayam", category: "Roti Asin", tag: "Roti Asin", price: "Rp 16.000", image: "/images/roti/pizzaayam.jpg", desc: "Roti ala pizza dengan topping ayam dan saus (best before 2 hari)." },
    { id: 34, name: "Pizza Sapi", category: "Roti Asin", tag: "Roti Asin", price: "Rp 16.000", image: "/images/roti/pizzasapi.jpg", desc: "Roti ala pizza dengan topping olahan sapi (best before 2 hari)." },
    { id: 36, name: "Sosis Ayam Asam Manis", category: "Roti Asin", tag: "Roti Asin", price: "Rp 13.000", image: "/images/roti/sosisayammanis.jpg", desc: "Sosis ayam dengan saus pedas asam manis (best before 2 hari)." },

    // ROTI TAWAR
    { id: 48, name: "Roti Tawar Biasa", category: "Roti Tawar", tag: "Roti Tawar", price: "Rp 26.000", image: "/images/roti/tawarbiasakulit.jpg", desc: "Roti tawar lembut tanpa pinggiran pinggir (best before 4 hari)." },
    { id: 49, name: "Roti Tawar Biasa Kupas", category: "Roti Tawar", tag: "Roti Tawar", price: "Rp 25.000", image: "/images/roti/tawarbiasa.jpg", desc: "Teman sempurna sarapan keluarga (best before 4 hari)." },
    { id: 50, name: "Roti Tawar Gandum", category: "Roti Tawar", tag: "Roti Tawar", price: "Rp 26.000", image: "/images/roti/tawargandumkulit.jpg", desc: "Pilihan kaya serat gandum berkualitas (best before 4 hari)." },
    { id: 51, name: "Roti Tawar Gandum Kupas", category: "Roti Tawar", tag: "Roti Tawar", price: "Rp 27.000", image: "/images/roti/tawarkupasgandum.jpg", desc: "Gandum sehat dan lembut tanpa pinggiran (best before 4 hari)." },

    // ROTI GORENG
    { id: 39, name: "Roti Goreng Kari", category: "Roti Goreng", tag: "Roti Goreng", price: "Rp 13.000", image: "/images/roti/gorengkari.jpg", desc: "Roti goreng dengan bumbu kari ayam otentik (best before 2 hari)." },

    // BUNDLE
    { id: 40, name: "Wassant Coklat", category: "Bundle", tag: "Bundle", price: "Rp 32.000", image: "/images/roti/wassantcokelat.jpg", desc: "Roti lapis premium isi coklat tebal untuk sharing (best before 3 hari)." },
    { id: 41, name: "Wassant Susu", category: "Bundle", tag: "Bundle", price: "Rp 32.000", image: "/images/roti/wassantsusu.jpg", desc: "Roti lapis premium dengan lapisan susu lezat (best before 2 hari)." },

    // GORENGAN
    { id: 42, name: "Makaroni Goreng", category: "Gorengan & Snack", tag: "Gorengan", price: "Rp 10.000", image: "/images/roti/makaronigoreng.jpg", desc: "Olahan makaroni dan sayuran yang digoreng garing (best before 1 hari)." },
    { id: 43, name: "Richmayo - Risol Mayo", category: "Gorengan & Snack", tag: "Gorengan", price: "Rp 10.000", image: "/images/roti/richmayo.jpg", desc: "Risoles renyah dengan isian smoked beef & mayo utuh (best before 1 hari)." },

    // KUE BASAH
    { id: 44, name: "Putu Ayu", category: "Kue Basah", tag: "Kue Basah", price: "Rp 11.000", image: "/images/roti/putuayu.jpg", desc: "Kue basah tradisional isi 3 pcs (Hanya ada di Sen, Rab, Sab, Min)." },

    // CAKE
    { id: 45, name: "Lapis Surabaya", category: "Cake", tag: "Cake", price: "Rp 25.000 / Slice", image: "/images/roti/lapsur.jpg", desc: "Kue lapis premium yang super lembut (best before 1 hari)." },
    { id: 46, name: "Lapis Legit", category: "Cake", tag: "Cake", price: "Rp 18.000 / Slice", image: "/images/roti/lapislegit.jpg", desc: "Lapis legit dengan aroma butter dan rempah khas (best before 1 hari)." },
    { id: 47, name: "Original Bolu Pisang", category: "Cake", tag: "Cake", price: "Rp 12.000 / Slice", image: "/images/roti/bolpis.jpg", desc: "Bolu pisang kampung panggang asli (best before 1 hari)." },

    // SNACK
    { id: 52, name: "Bagelen", category: "Gorengan & Snack", tag: "Snack", price: "Rp 10.000", image: "/images/roti/bagelen.jpg", desc: "Roti kering panggang manis dan renyah (best before 7 hari)." }
];
